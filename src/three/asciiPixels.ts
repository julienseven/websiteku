import * as THREE from "three";
import { createRenderLoop, type RenderLoop } from "../lib/motion/renderLoop";

export type AsciiVariant = "work" | "services" | "pricing" | "about" | "start";
export type AsciiPixelsHandle = { setPaused: (value: boolean) => void; destroy: () => void };

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uAtlas;
  uniform vec2 uGrid;
  uniform vec2 uPointer;
  uniform float uPresence;
  uniform float uTime;
  uniform float uAspect;
  uniform float uVariant;
  uniform float uDark;

  void main() {
    vec2 cell = floor(vUv * uGrid);
    vec2 sampleUv = (cell + 0.5) / uGrid;
    vec2 localUv = fract(vUv * uGrid);
    vec2 p = (sampleUv - vec2(0.76, 0.49)) * vec2(uAspect, 1.0);
    float time = uTime * 0.24;
    vec2 pointerDelta = (sampleUv - uPointer) * vec2(uAspect, 1.0);
    float influence = exp(-dot(pointerDelta, pointerDelta) * 9.0) * uPresence;
    p += pointerDelta * influence * 0.16;

    // Analytic moving luminance, quantized like an ASCII video without a video decode.
    float angle = atan(p.y, p.x);
    float radius = length(p);
    float fold = sin(p.x * 3.6 + time) * 0.16 + cos(p.y * 5.0 - time * 0.7) * 0.08;
    float band = sin((radius + fold) * 22.0 - time * 1.25 + sin(angle * 2.0) * 1.4);
    if (uVariant > 0.5 && uVariant < 1.5) {
      band = sin(p.x * 15.0 + sin(p.y * 4.2 + time) * 4.0 - time);
    } else if (uVariant > 1.5 && uVariant < 2.5) {
      band = sin(radius * 27.0 + cos(angle * 4.0 + time) * 1.6 - time);
    } else if (uVariant > 2.5 && uVariant < 3.5) {
      band = sin((p.y + fold) * 23.0 + sin(p.x * 3.0 + time) * 3.0);
    }
    float body = exp(-pow((radius - 0.39) * 2.8, 2.0));
    float light = pow(clamp(0.5 + band * 0.5, 0.0, 1.0), 1.55);
    float luminance = clamp((0.16 + light * 0.84) * body + influence * 0.28, 0.0, 0.999);
    float glyphIndex = floor(luminance * 9.0);
    float glyph = texture2D(uAtlas, vec2((glyphIndex + localUv.x) / 9.0, localUv.y)).a;
    vec2 pixel = abs(localUv - 0.5);
    float square = (1.0 - step(0.29, pixel.x)) * (1.0 - step(0.27, pixel.y));
    float mark = mix(glyph, square, step(0.89, luminance) * 0.55);

    vec3 ink = mix(vec3(0.37, 0.35, 0.32), vec3(0.84, 0.80, 0.72), uDark);
    vec3 orange = vec3(0.77, 0.33, 0.18);
    vec3 color = mix(ink, orange, clamp(light * 0.64 + influence, 0.0, 1.0));
    float textSafe = mix(0.035, 1.0, smoothstep(0.30, 0.69, sampleUv.x));
    float edge = smoothstep(0.02, 0.18, sampleUv.y) * (1.0 - smoothstep(0.87, 1.0, sampleUv.y));
    float opacity = mix(0.57, 0.68, uDark) * luminance * textSafe * edge;
    gl_FragColor = vec4(color, mark * opacity);
  }
`;

function makeAtlas() {
  const canvas = document.createElement("canvas");
  const size = 48;
  const glyphs = " .:-=+*#@";
  canvas.width = size * glyphs.length;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas unavailable");
  context.font = "500 35px monospace";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "white";
  [...glyphs].forEach((glyph, i) => context.fillText(glyph, size * (i + 0.5), size / 2));
  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

export function createAsciiPixels(
  container: HTMLElement,
  options: { variant: AsciiVariant; dark: boolean; paused: boolean },
): AsciiPixelsHandle {
  const atlas = makeAtlas();
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, depth: false, stencil: false });
  } catch (error) {
    atlas.dispose();
    throw error;
  }
  renderer.setClearColor(0x000000, 0);
  const geometry = new THREE.PlaneGeometry(2, 2);
  const variants: Record<AsciiVariant, number> = { work: 0, services: 1, pricing: 2, about: 3, start: 4 };
  const uniforms = {
    uAtlas: { value: atlas },
    uGrid: { value: new THREE.Vector2(120, 44) },
    uTime: { value: 2.4 },
    uAspect: { value: 2.5 },
    uVariant: { value: variants[options.variant] },
    uDark: { value: Number(options.dark) },
    uPointer: { value: new THREE.Vector2(0.76, 0.5) },
    uPresence: { value: 0 },
  };
  const material = new THREE.ShaderMaterial({
    uniforms, vertexShader, fragmentShader, transparent: true, depthWrite: false, depthTest: false,
  });
  const scene = new THREE.Scene();
  scene.add(new THREE.Mesh(geometry, material));
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  container.appendChild(canvas);

  let loop: RenderLoop | undefined;
  let destroyed = false;
  let contextLost = false;
  let paused = options.paused;
  let rect = container.getBoundingClientRect();
  let rectDirty = true;
  let targetPresence = 0;
  let quality = 1;
  let sampledFrames = 0;
  let sampledTime = 0;
  const targetPointer = new THREE.Vector2(0.76, 0.5);
  const surface = container.closest<HTMLElement>(".ascii-surface") ?? container.parentElement!;

  function resize(invalidate = true) {
    if (destroyed) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    const mobile = width < 768;
    const budget = mobile ? 650_000 : 1_650_000;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(budget * quality / (width * height))));
    renderer.setSize(width, height, false);
    uniforms.uAspect.value = width / height;
    uniforms.uGrid.value.set(Math.ceil(width / (mobile ? 12 : 10)), Math.ceil(height / (mobile ? 16 : 13)));
    rectDirty = true;
    if (invalidate) loop?.invalidate();
  }

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType === "touch" || paused) return;
    if (rectDirty) {
      rect = container.getBoundingClientRect();
      rectDirty = false;
    }
    targetPointer.set((event.clientX - rect.left) / rect.width, 1 - (event.clientY - rect.top) / rect.height);
    targetPresence = 1;
  };
  const onPointerLeave = () => { targetPresence = 0; };
  const onScroll = () => { rectDirty = true; targetPresence = 0; };
  const onLost = (event: Event) => {
    event.preventDefault();
    contextLost = true;
    loop?.setPaused(true);
    container.dataset.ready = "false";
  };
  const onRestored = () => {
    contextLost = false;
    resize();
    loop?.setPaused(paused);
  };

  resize();
  loop = createRenderLoop(container, (time, delta) => {
    if (contextLost || destroyed) return;
    const damping = 1 - Math.exp(-Math.max(delta, 0.016) * 5.5);
    uniforms.uTime.value = time;
    uniforms.uPointer.value.lerp(targetPointer, damping);
    uniforms.uPresence.value += (targetPresence - uniforms.uPresence.value) * damping;
    if (delta > 0) {
      sampledFrames++;
      sampledTime += delta;
      if (sampledFrames >= 90) {
        if (sampledTime / sampledFrames > 0.019 && quality > 0.55) {
          quality = Math.max(0.55, quality * 0.8);
          resize(false);
        }
        sampledFrames = 0;
        sampledTime = 0;
      }
    }
    renderer.render(scene, camera);
    if (container.dataset.ready !== "true") container.dataset.ready = "true";
  }, paused);

  const onResize = () => resize();
  const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
  observer?.observe(container);
  surface.addEventListener("pointermove", onPointerMove, { passive: true });
  surface.addEventListener("pointerleave", onPointerLeave, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);

  return {
    setPaused(value) {
      paused = value;
      loop?.setPaused(value || contextLost);
    },
    destroy() {
      destroyed = true;
      loop?.destroy();
      observer?.disconnect();
      surface.removeEventListener("pointermove", onPointerMove);
      surface.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      atlas.dispose();
      geometry.dispose();
      material.dispose();
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
      container.dataset.ready = "false";
    },
  };
}