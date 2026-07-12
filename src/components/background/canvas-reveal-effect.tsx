"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { useCanvasDpr } from "@/hooks/use-canvas-dpr";
import { cn } from "@/lib/utils";

type Uniforms = {
  [key: string]: {
    value: number[] | number[][] | number;
    type: string;
  };
};

const VERTEX_SHADER = `
precision mediump float;
in vec2 coordinates;
uniform vec2 u_resolution;
out vec2 fragCoord;
void main(){
  float x = position.x;
  float y = position.y;
  gl_Position = vec4(x, y, 0.0, 1.0);
  fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
  fragCoord.y = u_resolution.y - fragCoord.y;
}
`;

function prepareUniforms(
  uniforms: Uniforms,
  width: number,
  height: number,
): Record<string, { value: unknown }> {
  const prepared: Record<string, { value: unknown }> = {};

  for (const uniformName in uniforms) {
    const uniform = uniforms[uniformName];
    if (!uniform) continue;

    switch (uniform.type) {
      case "uniform1f":
        prepared[uniformName] = { value: uniform.value };
        break;
      case "uniform3f":
        prepared[uniformName] = {
          value: new THREE.Vector3().fromArray(uniform.value as number[]),
        };
        break;
      case "uniform1fv":
        prepared[uniformName] = {
          value: Float32Array.from(uniform.value as number[]),
        };
        break;
      case "uniform3fv": {
        // Flat upload so all palette slots (red + white) bind reliably
        const triples = uniform.value as number[][];
        const flat = new Float32Array(triples.length * 3);
        for (let i = 0; i < triples.length; i++) {
          const c = triples[i] ?? [0, 0, 0];
          flat[i * 3] = c[0] ?? 0;
          flat[i * 3 + 1] = c[1] ?? 0;
          flat[i * 3 + 2] = c[2] ?? 0;
        }
        prepared[uniformName] = { value: flat };
        break;
      }
      case "uniform2f":
        prepared[uniformName] = {
          value: new THREE.Vector2().fromArray(uniform.value as number[]),
        };
        break;
      default:
        break;
    }
  }

  prepared.u_time = { value: 0 };
  prepared.u_resolution = {
    value: new THREE.Vector2(width * 2, height * 2),
  };

  return prepared;
}

function DotMatrixShader({
  source,
  uniforms,
}: {
  source: string;
  uniforms: Uniforms;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dpr = useCanvasDpr();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = "absolute inset-0 h-full w-full touch-none";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const timer = new THREE.Timer();

    let material: THREE.ShaderMaterial | null = null;
    let mesh: THREE.Mesh | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let frameId = 0;
    let cancelled = false;

    const syncSize = () => {
      if (!material) return;
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);

      const prepared = prepareUniforms(uniforms, width, height);
      for (const key of Object.keys(prepared)) {
        const next = prepared[key];
        if (material.uniforms[key] && next) {
          material.uniforms[key].value = next.value;
        }
      }
    };

    const animate = (timestamp: number) => {
      if (cancelled || !material) return;
      frameId = requestAnimationFrame(animate);
      timer.update(timestamp);
      if (material.uniforms.u_time) {
        material.uniforms.u_time.value = timer.getElapsed();
      }
      renderer.render(scene, camera);
    };

    const start = () => {
      if (cancelled || !containerRef.current) return;
      const el = containerRef.current;
      if (el.clientWidth < 2 || el.clientHeight < 2) {
        frameId = requestAnimationFrame(start);
        return;
      }

      const width = Math.max(el.clientWidth, 1);
      const height = Math.max(el.clientHeight, 1);

      material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: source,
        uniforms: prepareUniforms(uniforms, width, height),
        glslVersion: THREE.GLSL3,
        blending: THREE.CustomBlending,
        blendSrc: THREE.SrcAlphaFactor,
        blendDst: THREE.OneFactor,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      });

      mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(mesh);
      syncSize();

      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(el);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(start);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      timer.dispose();
      mesh?.geometry.dispose();
      material?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [source, uniforms, dpr]);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" />;
}

export function CanvasRevealEffect({
  animationSpeed = 0.5,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
}: {
  /** 0.1 slower · 1.0 faster */
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}) {
  return (
    <div className={cn("relative h-full w-full", containerClassName)}>
      <div className="absolute inset-0 h-full w-full">
        <DotMatrix
          colors={colors ?? [[0, 255, 255]]}
          dotSize={dotSize ?? 3}
          opacities={
            opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]
          }
          shader={`
            float animation_speed_factor = ${animationSpeed.toFixed(1)};
            float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
            opacity *= step(intro_offset, u_time * animation_speed_factor);
            opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
          `}
          center={["x", "y"]}
        />
      </div>
      {showGradient ? (
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      ) : null}
    </div>
  );
}

interface DotMatrixProps {
  colors?: number[][];
  opacities?: number[];
  totalSize?: number;
  dotSize?: number;
  shader?: string;
  center?: ("x" | "y")[];
}

function DotMatrix({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  totalSize = 20,
  dotSize = 2,
  shader = "",
  center = ["x", "y"],
}: DotMatrixProps) {
  const uniforms = useMemo(() => {
    let colorsArray: number[][] = [
      colors[0] ?? [0, 0, 0],
      colors[0] ?? [0, 0, 0],
      colors[0] ?? [0, 0, 0],
      colors[0] ?? [0, 0, 0],
      colors[0] ?? [0, 0, 0],
      colors[0] ?? [0, 0, 0],
    ];
    if (colors.length === 2) {
      colorsArray = [
        colors[0]!,
        colors[0]!,
        colors[0]!,
        colors[1]!,
        colors[1]!,
        colors[1]!,
      ];
    } else if (colors.length >= 3) {
      colorsArray = [
        colors[0]!,
        colors[0]!,
        colors[1]!,
        colors[1]!,
        colors[2]!,
        colors[2]!,
      ];
    }

    return {
      u_colors: {
        value: colorsArray.map((color) => [
          (color[0] ?? 0) / 255,
          (color[1] ?? 0) / 255,
          (color[2] ?? 0) / 255,
        ]),
        type: "uniform3fv",
      },
      u_opacities: {
        value: opacities,
        type: "uniform1fv",
      },
      u_total_size: {
        value: totalSize,
        type: "uniform1f",
      },
      u_dot_size: {
        value: dotSize,
        type: "uniform1f",
      },
    };
  }, [colors, opacities, totalSize, dotSize]);

  return (
    <DotMatrixShader
      source={`
        precision mediump float;
        in vec2 fragCoord;

        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        out vec4 fragColor;

        float PHI = 1.61803398874989484820459;
        float random(vec2 xy) {
            return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
        }

        void main() {
            vec2 st = fragCoord.xy;
            ${
              center.includes("x")
                ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));"
                : ""
            }
            ${
              center.includes("y")
                ? "st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));"
                : ""
            }

            float opacity = step(0.0, st.x);
            opacity *= step(0.0, st.y);

            vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

            float frequency = 5.0;
            float show_offset = random(st2);
            float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency) + 1.0);
            opacity *= u_opacities[int(rand * 10.0)];
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

            vec3 color = u_colors[int(show_offset * 6.0)];

            ${shader}

            fragColor = vec4(color, opacity);
            fragColor.rgb *= fragColor.a;
        }`}
      uniforms={uniforms}
    />
  );
}
