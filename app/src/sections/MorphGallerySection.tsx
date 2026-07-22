import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
uniform float uProgress;
uniform float uRand;
uniform float uXdir;
uniform float uYdir;

mat4 rotationMatrix(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;
  return mat4(
    oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
    0.0,                                 0.0,                                 0.0,                                 1.0
  );
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

float easeInOutCubic(float x) {
  return x < 0.5 ? 4. * x * x * x : 1. - pow(-2. * x + 2., 3.) / 2.;
}

float easeOutCubic(float x) {
  return 1. - pow(1. - x, 3.);
}

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 newposition = position;

  float offset = (dot(vec2(10.), position.xy) + 1.) / 2.;
  float localprogress = clamp((fract(uProgress * 5.0 * 0.01) - 0.01 * uRand) / (1. - 0.01), 0., 1.);
  localprogress = easeInOutCubic(localprogress) * 3.1415926;

  newposition = rotate(newposition, vec3(0., 0., 1.), localprogress);

  float start = 0. + uRand;
  float end = 1. - uRand;
  float zProgress = clamp((uProgress - start) / (end - start), 0., 1.);
  newposition.z += map(easeOutCubic(zProgress), 0., 1., -1., 1.);

  vec4 mvPosition = modelViewMatrix * vec4(newposition, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uProgress;
uniform float uRand;
uniform float uBrightness;

void main() {
  float progress = clamp((uProgress - 0.3 * uRand) / 0.7, 0.0, 1.0);
  vec4 tex1 = texture2D(uTexture1, vUv);
  vec4 tex2 = texture2D(uTexture2, vUv);
  vec4 color = mix(tex1, tex2, progress);
  color.rgb *= 1.0 + uBrightness;
  gl_FragColor = color;
}
`;

export default function MorphGallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = canvasContainerRef.current;
    const section = containerRef.current;
    if (!container || !section) return;

    // Three.js setup
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1A2E1A);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const tex1 = textureLoader.load('/images/echo-cosmic.jpg');
    const tex2 = textureLoader.load('/images/morph-dunes.jpg');

    // Create sliced meshes
    const planeGeometry = new THREE.PlaneGeometry(1, 1, 6, 1);
    const group = new THREE.Group();
    const slices: { mesh: THREE.Mesh; material: THREE.ShaderMaterial }[] = [];

    for (let i = 0; i < 6; i++) {
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture1: { value: tex1 },
          uTexture2: { value: tex2 },
          uProgress: { value: 0 },
          uRand: { value: Math.random() },
          uBrightness: { value: 0 },
          uXdir: { value: 0 },
          uYdir: { value: 0 },
        },
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(planeGeometry, material);
      mesh.position.x = i * 1 - 2.5;
      mesh.scale.x = 1.01; // Prevent subpixel seams
      group.add(mesh);
      slices.push({ mesh, material });
    }

    scene.add(group);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // GSAP ScrollTrigger timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 1.5,
      },
    });

    tl.to(camera.position, { z: 0, duration: 1, ease: 'power2.inOut' })
      .to(camera.position, { z: 5, duration: 1, ease: 'power2.inOut' })
      .to(
        slices.map((s) => s.material.uniforms.uProgress),
        { value: 1, duration: 1, ease: 'power2.inOut', stagger: { each: 0.04, from: 'center' } },
        '-=0.8'
      )
      .to(
        slices.map((s) => s.mesh.rotation),
        { z: (i: number) => (i - 2.5) * 0.4, duration: 1, ease: 'power2.inOut', stagger: { each: 0.03, from: 'center' } },
        '-=0.8'
      )
      .to(
        slices.map((s) => s.material.uniforms.uBrightness),
        { value: 1.5, duration: 0.4, ease: 'power2.in', yoyo: true, repeat: 1 },
        '-=0.6'
      );

    // Resize handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    cleanupRef.current = () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      tl.kill();
      renderer.dispose();
      planeGeometry.dispose();
      slices.forEach((s) => s.material.dispose());
      tex1.dispose();
      tex2.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };

    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Three.js Canvas Container */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0"
        style={{ zIndex: 1 }}
      />

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
          mixBlendMode: 'multiply',
        }}
      />
    </section>
  );
}
