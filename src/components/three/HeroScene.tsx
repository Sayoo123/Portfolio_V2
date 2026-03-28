"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // === PRIMARY OBJECT: Wireframe Torus Knot ===
    const torusKnotGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 16, 2, 3);
    const torusKnotMat = new THREE.MeshStandardMaterial({
      color: 0xc9a84c,
      roughness: 0.3,
      metalness: 0.8,
      wireframe: false,
    });
    const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
    scene.add(torusKnot);

    // Wireframe overlay
    const wireGeo = new THREE.TorusKnotGeometry(1.22, 0.36, 64, 8, 2, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xe4b84e,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireframe = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireframe);

    // === PARTICLE FIELD ===
    const particleCount = 80;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc9a84c,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // === OUTER RING ===
    const ringGeo = new THREE.TorusGeometry(2.2, 0.008, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc9a84c,
      transparent: true,
      opacity: 0.25,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    const ring2 = ring.clone();
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    (ring2.material as THREE.MeshBasicMaterial).opacity = 0.12;
    scene.add(ring2);

    // === LIGHTING ===
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xc9a84c, 8, 20);
    goldLight.position.set(3, 3, 3);
    scene.add(goldLight);

    const coolLight = new THREE.PointLight(0x516395, 4, 20);
    coolLight.position.set(-3, -2, 2);
    scene.add(coolLight);

    const rimLight = new THREE.DirectionalLight(0xe4b84e, 1.5);
    rimLight.position.set(0, 5, -3);
    scene.add(rimLight);

    // === MOUSE INTERACTION ===
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    mount.addEventListener("mousemove", onMouseMove);

    // === ANIMATION ===
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Main object rotation
      torusKnot.rotation.x = t * 0.18 + targetY * 0.4;
      torusKnot.rotation.y = t * 0.22 + targetX * 0.4;
      torusKnot.rotation.z = t * 0.08;

      wireframe.rotation.x = torusKnot.rotation.x;
      wireframe.rotation.y = torusKnot.rotation.y;
      wireframe.rotation.z = torusKnot.rotation.z;

      // Rings
      ring.rotation.z = t * 0.1;
      ring2.rotation.z = -t * 0.07;
      ring2.rotation.x = -Math.PI / 4 + Math.sin(t * 0.3) * 0.1;

      // Particles drift
      particles.rotation.y = t * 0.03;
      particles.rotation.x = t * 0.015;

      // Camera mouse parallax
      camera.position.x += (targetX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (targetY * 0.3 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Gold light orbit
      goldLight.position.x = Math.sin(t * 0.5) * 4;
      goldLight.position.y = Math.cos(t * 0.4) * 3;

      renderer.render(scene, camera);
    };
    animate();

    // === RESIZE ===
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      mount.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      torusKnotGeo.dispose();
      torusKnotMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ cursor: "none" }}
    />
  );
}
