"use client"

import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"

import { useCanvasDpr } from "@/hooks/use-canvas-dpr"
import { cn } from "@/lib/utils"

type Uniforms = {
  [key: string]: {
    value: number[] | number[][] | number
    type: string
  }
}

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
`

function buildShaderUniforms(
  uniforms: Uniforms,
  width: number,
  height: number,
) {
  const prepared: Record<
    string,
    { value: THREE.Vector2 | THREE.Vector3 | number | THREE.Vector3[] | number[] }
  > = {}

  for (const uniformName in uniforms) {
    const uniform = uniforms[uniformName]

    switch (uniform.type) {
      case "uniform1f":
        prepared[uniformName] = { value: uniform.value as number }
        break
      case "uniform1i":
        prepared[uniformName] = { value: uniform.value as number }
        break
      case "uniform3f":
        prepared[uniformName] = {
          value: new THREE.Vector3().fromArray(uniform.value as number[]),
        }
        break
      case "uniform1fv":
        prepared[uniformName] = { value: uniform.value as number[] }
        break
      case "uniform3fv":
        prepared[uniformName] = {
          value: (uniform.value as number[][]).map((v) =>
            new THREE.Vector3().fromArray(v),
          ),
        }
        break
      case "uniform2f":
        prepared[uniformName] = {
          value: new THREE.Vector2().fromArray(uniform.value as number[]),
        }
        break
      default:
        break
    }
  }

  prepared.u_time = { value: 0 }
  prepared.u_resolution = {
    value: new THREE.Vector2(width * 2, height * 2),
  }

  return prepared
}

function DotMatrixShader({
  source,
  uniforms,
}: {
  source: string
  uniforms: Uniforms
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dpr = useCanvasDpr()
  const elapsedRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.className =
      "absolute inset-0 h-full w-full touch-none"
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    let material: THREE.ShaderMaterial | null = null
    let mesh: THREE.Mesh | null = null

    const resize = () => {
      const width = Math.max(container.clientWidth, 1)
      const height = Math.max(container.clientHeight, 1)
      renderer.setPixelRatio(dpr)
      renderer.setSize(width, height, false)

      if (material) {
        const prepared = buildShaderUniforms(uniforms, width, height)
        for (const key of Object.keys(prepared)) {
          if (material.uniforms[key]) {
            material.uniforms[key].value = prepared[key].value
          }
        }
      }
    }

    const width = Math.max(container.clientWidth, 1)
    const height = Math.max(container.clientHeight, 1)

    material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: source,
      uniforms: buildShaderUniforms(uniforms, width, height),
      glslVersion: THREE.GLSL3,
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneFactor,
    })

    mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(mesh)
    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    let frameId = 0
    let lastTime = performance.now()

    const animate = (now: number) => {
      frameId = requestAnimationFrame(animate)
      const delta = (now - lastTime) / 1000
      lastTime = now
      elapsedRef.current += delta
      if (material) {
        material.uniforms.u_time.value = elapsedRef.current
      }
      renderer.render(scene, camera)
    }

    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      mesh?.geometry.dispose()
      material?.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [source, uniforms, dpr])

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" />
}

export function CanvasRevealEffect({
  animationSpeed = 10,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
  reverse = false,
}: {
  animationSpeed?: number
  opacities?: number[]
  colors?: number[][]
  containerClassName?: string
  dotSize?: number
  showGradient?: boolean
  reverse?: boolean
}) {
  return (
    <div className={cn("relative h-full w-full", containerClassName)}>
      <div className="h-full w-full">
        <DotMatrix
          colors={colors ?? [[0, 255, 255]]}
          dotSize={dotSize ?? 3}
          opacities={
            opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]
          }
          shader={`
            ${reverse ? "u_reverse_active" : "false"}_;
            animation_speed_factor_${animationSpeed.toFixed(1)}_;
          `}
          center={["x", "y"]}
        />
      </div>
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      )}
    </div>
  )
}

interface DotMatrixProps {
  colors?: number[][]
  opacities?: number[]
  totalSize?: number
  dotSize?: number
  shader?: string
  center?: ("x" | "y")[]
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
    let colorsArray = [
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
    ]
    if (colors.length === 2) {
      colorsArray = [
        colors[0],
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[1],
      ]
    } else if (colors.length === 3) {
      colorsArray = [
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[2],
        colors[2],
      ]
    }
    return {
      u_colors: {
        value: colorsArray.map((color) => [
          color[0] / 255,
          color[1] / 255,
          color[2] / 255,
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
      u_reverse: {
        value: shader.includes("u_reverse_active") ? 1 : 0,
        type: "uniform1i",
      },
    }
  }, [colors, opacities, totalSize, dotSize, shader])

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
        uniform int u_reverse;

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
            float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency));
            opacity *= u_opacities[int(rand * 10.0)];
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

            vec3 color = u_colors[int(show_offset * 6.0)];

            float animation_speed_factor = 0.5;
            vec2 center_grid = u_resolution / 2.0 / u_total_size;
            float dist_from_center = distance(center_grid, st2);

            float timing_offset_intro = dist_from_center * 0.01 + (random(st2) * 0.15);

            float max_grid_dist = distance(center_grid, vec2(0.0, 0.0));
            float timing_offset_outro = (max_grid_dist - dist_from_center) * 0.02 + (random(st2 + 42.0) * 0.2);

            float current_timing_offset;
            if (u_reverse == 1) {
                current_timing_offset = timing_offset_outro;
                 opacity *= 1.0 - step(current_timing_offset, u_time * animation_speed_factor);
                 opacity *= clamp((step(current_timing_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            } else {
                current_timing_offset = timing_offset_intro;
                 opacity *= step(current_timing_offset, u_time * animation_speed_factor);
                 opacity *= clamp((1.0 - step(current_timing_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            }

            fragColor = vec4(color, opacity);
            fragColor.rgb *= fragColor.a;
        }`}
      uniforms={uniforms}
    />
  )
}
