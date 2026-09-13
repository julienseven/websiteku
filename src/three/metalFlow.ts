import * as THREE from "three";
import { createRenderLoop, type RenderLoop } from "../lib/motion/renderLoop";

/**
 * Kinetic Metal Flow — a molten-chrome / illuminated liquid-metal shader.
 * Fullscreen quad, alpha-friendly, retina-scaled, with clean disposal.
 * Rendered behind content (pointer-events handled by the wrapper).
 */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAspect;
  uniform float uIntensity;
  varying vec2 vUv;

  float hash21(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 34.12);
    return fract(p.x * p.y);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 4; i++) {
      v += a * vnoise(p);
      p = rot * p * 2.0 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= uAspect;
    vec2 p = uv * 2.0;
    float t = uTime * 0.1;

    // Domain warping -> flowing liquid-metal ripples
    vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t * 0.5));
    vec2 r = vec2(
      fbm(p + 2.2 * q + vec2(1.7, 9.2) + t * 0.4),
      fbm(p + 2.2 * q + vec2(8.3, 2.8) - t * 0.3)
    );
    float f = fbm(p + 2.5 * r);

    // Secondary field drives the hot specular highlights
    float s = fbm(p + 3.0 * r + t * 1.1);

    // Chrome ramp: deep charcoal -> steel -> silver -> bright white
    vec3 dark   = vec3(0.03, 0.04, 0.06);
    vec3 deep   = vec3(0.10, 0.12, 0.16);
    vec3 mid    = vec3(0.32, 0.36, 0.44);
    vec3 silver = vec3(0.62, 0.66, 0.72);
    vec3 bright = vec3(0.94, 0.96, 1.00);

    vec3 col = mix(dark, deep, smoothstep(0.15, 0.45, f));
    col = mix(col, mid, smoothstep(0.45, 0.62, f));
    col = mix(col, silver, smoothstep(0.62, 0.78, f));
    col = mix(col, bright, smoothstep(0.78, 0.95, s));

    // Molten specular bloom
    float spec = pow(max(0.0, s - 0.55), 2.0);
    col += bright * spec * 0.9 * uIntensity;

    // Subtle warm tint to tie into the brand accent
    col *= vec3(1.03, 0.98, 0.92);

    // Gentle vignette
    vec2 cc = (vUv - 0.5) * vec2(uAspect, 1.0);
    float vig = 1.0 - smoothstep(0.32, 0.9, length(cc));
    col *= mix(0.55, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export type MetalFlowHandle = {
  destroy: () => void;
  resize: () => void;
};

export function createMetalFlow(
  container: HTMLElement,
  opts?: { intensity?: number }
): MetalFlowHandle {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, depth: false, stencil: false });
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uIntensity: { value: opts?.intensity ?? 1.0 },
    },
    vertexShader: VERT,
    fragmentShader: FRAG,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  container.appendChild(renderer.domElement);
  renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
  let loop: RenderLoop | undefined;
  let lost = false;

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;
    const budget = w < 768 ? 450_000 : 1_000_000;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(budget / (w * h))));
    renderer.setSize(w, h, false);
    material.uniforms.uAspect.value = w / h;
    loop?.invalidate();
  }

  const observer =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => resize())
      : null;
  observer?.observe(container);

  resize();
  loop = createRenderLoop(container, (time) => {
    if (lost) return;
    material.uniforms.uTime.value = time;
    renderer.render(scene, camera);
  });
  const onLost = (event: Event) => { event.preventDefault(); lost = true; loop?.setPaused(true); };
  const onRestored = () => { lost = false; resize(); loop?.setPaused(false); };
  renderer.domElement.addEventListener("webglcontextlost", onLost);
  renderer.domElement.addEventListener("webglcontextrestored", onRestored);
  window.addEventListener("resize", resize, { passive: true });

  return {
    resize,
    destroy() {
      loop?.destroy();
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      renderer.domElement.removeEventListener("webglcontextlost", onLost);
      renderer.domElement.removeEventListener("webglcontextrestored", onRestored);
      geometry.dispose();
      material.dispose();
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    },
  };
}
