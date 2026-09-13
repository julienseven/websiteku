import * as THREE from "three";
import { createRenderLoop, type RenderLoop } from "../lib/motion/renderLoop";

/**
 * ASCII-flow — a dreamy, animated field of monospace glyphs rendered as a
 * single shader-driven plane. The glyph density, color and depth all drift
 * with layered sine fields so the result feels airy and calm rather than
 * "matrix-like". The plane is transparent; a CSS gradient lives behind it.
 */

const CHARS = " .:-+*#@";
const GLYPH_COUNT = CHARS.length;
const COLS = 112;
const ROWS = 49;
const PLANE_W = 20;
const PLANE_H = 8.75;

const MONO_FONT =
  '"Space Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

function makeGlyphTexture(): THREE.Texture {
  const cell = 96;
  const canvas = document.createElement("canvas");
  canvas.width = cell * GLYPH_COUNT;
  canvas.height = cell;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `500 ${Math.floor(cell * 0.62)}px ${MONO_FONT}`;

  for (let i = 0; i < GLYPH_COUNT; i++) {
    const x = i * cell + cell / 2;
    ctx.fillText(CHARS[i], x, cell / 2 + cell * 0.03);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  return tex;
}

const VERT = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec3 p = position;

    // Gentle flowing waves for subtle depth + motion.
    float z = sin(p.x * 0.55 + uTime * 0.45) * 0.11
            + cos(p.y * 0.85 + uTime * 0.38) * 0.09
            + sin((p.x * 0.35 + p.y * 0.45) + uTime * 0.28) * 0.06;

    p.z += z;
    p.x += sin(p.y * 0.55 + uTime * 0.32) * 0.06;

    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform sampler2D uMap;
  uniform vec2 uCells;
  uniform float uGlyphCount;
  uniform float uAspect;
  varying vec2 vUv;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  vec3 ramp(float t) {
    vec3 sky       = vec3(0.62, 0.83, 0.94); // sky blue
    vec3 cyan      = vec3(0.66, 0.89, 0.93); // cyan
    vec3 lavender  = vec3(0.81, 0.78, 0.95); // lavender
    vec3 periwinkle= vec3(0.74, 0.80, 0.98); // periwinkle
    vec3 white     = vec3(0.97, 0.99, 1.00); // white

    if (t < 0.25) return mix(sky, cyan, t / 0.25);
    if (t < 0.50) return mix(cyan, lavender, (t - 0.25) / 0.25);
    if (t < 0.75) return mix(lavender, periwinkle, (t - 0.50) / 0.25);
    return mix(periwinkle, white, (t - 0.75) / 0.25);
  }

  void main() {
    vec2 cell = floor(vUv * uCells);
    vec2 cuv = fract(vUv * uCells);

    // Flowing density field -> which glyph, how bright, how visible.
    float f = 0.0;
    f += sin(cell.x * 0.30 + uTime * 0.55) * 0.45;
    f += cos(cell.y * 0.42 - uTime * 0.40) * 0.45;
    f += sin((cell.x * 0.60 + cell.y * 0.50) + uTime * 0.25) * 0.35;
    f += hash21(cell) * 0.50 - 0.25;
    f = clamp(f * 0.5 + 0.5, 0.0, 1.0);

    float gi = floor(f * (uGlyphCount - 1.0) + 0.5);
    float alpha = texture2D(uMap, vec2((gi + cuv.x) / uGlyphCount, 1.0 - cuv.y)).a;

    vec3 col = ramp(f);

    // Soft, diffused lighting: a gentle center glow and an airy edge falloff.
    vec2 cc = vUv - 0.5;
    float d = length(cc * vec2(uAspect, 1.0));
    float vign = 1.0 - smoothstep(0.22, 0.58, d);
    float glow = 1.0 - smoothstep(0.0, 0.5, d);
    col = mix(col, vec3(1.0), glow * 0.45);

    float a = alpha * (0.10 + 0.30 * f) * vign;
    gl_FragColor = vec4(col, a);
  }
`;

export type AsciiFlowHandle = {
  destroy: () => void;
  resize: () => void;
};

export function createAsciiFlow(container: HTMLElement): AsciiFlowHandle {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 8);

  const geometry = new THREE.PlaneGeometry(PLANE_W, PLANE_H, COLS, ROWS);

  const uniforms = {
    uTime: { value: 1.2 },
    uMap: { value: makeGlyphTexture() },
    uCells: { value: new THREE.Vector2(COLS, ROWS) },
    uGlyphCount: { value: GLYPH_COUNT },
    uAspect: { value: 1 },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: VERT,
    fragmentShader: FRAG,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -0.14;
  scene.add(mesh);

  container.appendChild(renderer.domElement);
  renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
  let destroyed = false;
  let loop: RenderLoop | undefined;

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(1_000_000 / (w * h))));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    uniforms.uAspect.value = w / h;

    const vFov = (45 * Math.PI) / 180;
    const dist = 8;
    const visibleH = 2 * dist * Math.tan(vFov / 2);
    const visibleW = visibleH * (w / h);
    const scale = Math.max(visibleW / PLANE_W, visibleH / PLANE_H) * 1.06;
    mesh.scale.setScalar(scale);
    loop?.invalidate();
  }

  // Swap in the premium mono font once it finishes loading.
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      if (destroyed) return;
      uniforms.uMap.value.dispose();
      uniforms.uMap.value = makeGlyphTexture();
      loop?.invalidate();
    });
  }

  const observer =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => resize())
      : null;
  observer?.observe(container);

  resize();
  loop = createRenderLoop(container, (time) => {
    const t = time * 0.6;
    uniforms.uTime.value = t;
    // Subtle drifting sway for depth.
    mesh.rotation.y = Math.sin(t * 0.22) * 0.05 - 0.02;
    mesh.rotation.x = -0.14 + Math.sin(t * 0.18) * 0.03;
    renderer.render(scene, camera);
  });
  window.addEventListener("resize", resize, { passive: true });

  return {
    resize,
    destroy() {
      destroyed = true;
      loop?.destroy();
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      uniforms.uMap.value.dispose();
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
