import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import { useTheme } from '@/hooks/use-theme'
import { getGlitterPreset } from '@/lib/glitter-theme'
import { cn } from '@/lib/utils'

export type GlitterAnimationProps = {
  className?: string
  animationSpeed?: number
  dotSize?: number
  colors?: number[][]
  opacities?: number[]
  showGradient?: boolean
}

function expandShaderColors(colors: number[][]) {
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

  return colorsArray.map(
    (color) =>
      new THREE.Vector3(color[0] / 255, color[1] / 255, color[2] / 255),
  )
}

function CanvasRevealEffect({
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[255, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
  reverse = false,
  fadeFromClass = 'from-black',
}: {
  opacities?: number[]
  colors?: number[][]
  containerClassName?: string
  dotSize?: number
  showGradient?: boolean
  reverse?: boolean
  fadeFromClass?: string
}) {
  return (
    <div className={cn('relative h-full w-full', containerClassName)}>
      <div className="h-full w-full">
        <DotMatrix
          colors={colors}
          dotSize={dotSize ?? 3}
          opacities={opacities}
          reverse={reverse}
        />
      </div>
      {showGradient && (
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t to-transparent',
            fadeFromClass,
          )}
        />
      )}
    </div>
  )
}

interface DotMatrixProps {
  colors: number[][]
  opacities: number[]
  dotSize: number
  reverse: boolean
}

const FRAGMENT_SHADER = `
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
    st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));
    st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));

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
}
`

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

const DotMatrix: React.FC<DotMatrixProps> = ({
  colors,
  opacities,
  dotSize,
  reverse,
}) => (
  <Shader
    source={FRAGMENT_SHADER}
    colors={colors}
    opacities={opacities}
    totalSize={20}
    dotSize={dotSize}
    reverse={reverse}
  />
)

const ShaderMaterial = ({
  source,
  colors,
  opacities,
  totalSize,
  dotSize,
  reverse,
}: {
  source: string
  colors: number[][]
  opacities: number[]
  totalSize: number
  dotSize: number
  reverse: boolean
}) => {
  const { size } = useThree()
  const meshRef = useRef<THREE.Mesh>(null)
  const startTimeRef = useRef(performance.now())

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: source,
        uniforms: {
          u_time: { value: 0 },
          u_resolution: {
            value: new THREE.Vector2(size.width * 2, size.height * 2),
          },
          u_colors: { value: expandShaderColors(colors) },
          u_opacities: { value: opacities },
          u_total_size: { value: totalSize },
          u_dot_size: { value: dotSize },
          u_reverse: { value: reverse ? 1 : 0 },
        },
        glslVersion: THREE.GLSL3,
        blending: THREE.CustomBlending,
        blendSrc: THREE.SrcAlphaFactor,
        blendDst: THREE.OneFactor,
      }),
    [colors, dotSize, opacities, reverse, size.height, size.width, source, totalSize],
  )

  useEffect(() => {
    return () => {
      material.dispose()
    }
  }, [material])

  useEffect(() => {
    material.uniforms.u_colors.value = expandShaderColors(colors)
    material.uniforms.u_opacities.value = opacities
    material.uniforms.u_total_size.value = totalSize
    material.uniforms.u_dot_size.value = dotSize
    material.uniforms.u_reverse.value = reverse ? 1 : 0
    startTimeRef.current = performance.now()
  }, [colors, dotSize, material, opacities, reverse, totalSize])

  useFrame(() => {
    if (!meshRef.current) return
    material.uniforms.u_time.value =
      (performance.now() - startTimeRef.current) / 1000
    material.uniforms.u_resolution.value.set(size.width * 2, size.height * 2)
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

function WebGLContextHandler({
  onRestore,
}: {
  onRestore: () => void
}) {
  const { gl } = useThree()

  useEffect(() => {
    const canvas = gl.domElement

    const handleContextLost = (event: Event) => {
      event.preventDefault()
    }

    const handleContextRestored = () => {
      onRestore()
    }

    canvas.addEventListener('webglcontextlost', handleContextLost, false)
    canvas.addEventListener(
      'webglcontextrestored',
      handleContextRestored,
      false,
    )

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      canvas.removeEventListener(
        'webglcontextrestored',
        handleContextRestored,
      )
    }
  }, [gl, onRestore])

  return null
}

const Shader: React.FC<{
  source: string
  colors: number[][]
  opacities: number[]
  totalSize: number
  dotSize: number
  reverse: boolean
}> = ({ source, colors, opacities, totalSize, dotSize, reverse }) => {
  const [canvasKey, setCanvasKey] = React.useState(0)
  const handleRestore = useCallback(() => {
    setCanvasKey((key) => key + 1)
  }, [])

  return (
    <Canvas
      key={canvasKey}
      className="absolute inset-0 h-full w-full"
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <WebGLContextHandler onRestore={handleRestore} />
      <ShaderMaterial
        source={source}
        colors={colors}
        opacities={opacities}
        totalSize={totalSize}
        dotSize={dotSize}
        reverse={reverse}
      />
    </Canvas>
  )
}

export function GlitterAnimation({
  className,
  dotSize = 6,
  colors: colorsProp,
  opacities: opacitiesProp,
  showGradient = true,
}: GlitterAnimationProps) {
  const theme = useTheme()
  const preset = getGlitterPreset(theme)
  const colors = colorsProp ?? preset.colors.map((color) => [...color])
  const opacities = preset.opacities ?? opacitiesProp
  const resolvedOpacities =
    opacities ??
    [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]

  return (
    <div
      className={cn(
        'relative min-h-svh w-full',
        preset.backgroundClass,
        className,
      )}
      aria-hidden
    >
      <div className="absolute inset-0">
        <CanvasRevealEffect
          containerClassName={preset.backgroundClass}
          colors={colors}
          dotSize={dotSize}
          opacities={resolvedOpacities}
          reverse={false}
          showGradient={showGradient}
          fadeFromClass={preset.fadeFromClass}
        />
      </div>
      <div
        className={cn(
          'pointer-events-none absolute top-0 right-0 left-0 h-1/3 bg-gradient-to-b to-transparent',
          preset.fadeFromClass,
        )}
      />
    </div>
  )
}
