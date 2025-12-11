import * as THREE from 'three';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fragmentShader } from '../animation-background/fragment-shader.glsl';
import { vertexShader } from '../animation-background/vertex-shader.glsl';

@Component({
  selector: 'app-background',
  standalone: true,
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
  
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
  
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  
    const getSize = () => {
      const width = window.innerWidth;
      const height = window.visualViewport?.height || window.innerHeight; // 👈 Fix mobile
  
      renderer.setSize(width, height, false);
      uniforms.resolution.value.set(width, height);
  
      return { width, height };
    };
  
    const uniforms = {
      resolution: { value: new THREE.Vector2() },
      time: { value: 0.0 },
      xScale: { value: 1.0 },
      yScale: { value: 0.5 },
      distortion: { value: 0.05 }
    };
  
    const geometry = new THREE.PlaneGeometry(2, 2);

    
  
    const material = new THREE.RawShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader
    });
  
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  
    // 📌 Appel initial
    getSize();
  
    // 📌 Resize dynamique
    window.addEventListener('resize', getSize);
    window.visualViewport?.addEventListener('resize', getSize);
  
    const animate = () => {
      uniforms.time.value += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
  
    animate();
  }
  
}