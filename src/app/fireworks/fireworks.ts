import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
}

@Component({
  selector: 'app-fireworks',
  standalone: true,
  template: `<canvas #canvas class="fireworks-canvas"></canvas>`,
  styles: [
    `
      .fireworks-canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 0;
        pointer-events: none;
      }
    `,
  ],
})
export class FireworksComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private rockets: Rocket[] = [];
  private particles: Particle[] = [];
  private animationId = 0;
  private lastLaunch = 0;
  private width = 0;
  private height = 0;
  private isBrowser: boolean;

  private readonly colors = [
    '#ff4d4d',
    '#ffd24d',
    '#4dff88',
    '#4dc3ff',
    '#c24dff',
    '#ff4de1',
    '#ffffff',
  ];

  constructor(
    private zone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.resize();

    // Run the animation loop outside Angular to avoid change detection on every frame
    this.zone.runOutsideAngular(() => {
      this.animationId = requestAnimationFrame((t) => this.loop(t));
    });
  }

  ngOnDestroy(): void {
    if (this.isBrowser) cancelAnimationFrame(this.animationId);
  }

  @HostListener('window:resize')
  resize(): void {
    if (!this.isBrowser) return;
    const canvas = this.canvasRef.nativeElement;
    this.width = canvas.width = window.innerWidth;
    this.height = canvas.height = window.innerHeight;
  }

  private loop(time: number): void {
    // Fade the previous frame to create trails
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.globalCompositeOperation = 'lighter';

    // Launch a new rocket every 0.6 - 1.4 seconds
    if (time - this.lastLaunch > 600 + Math.random() * 800) {
      this.launchRocket();
      this.lastLaunch = time;
    }

    this.updateRockets();
    this.updateParticles();

    this.animationId = requestAnimationFrame((t) => this.loop(t));
  }

  private launchRocket(): void {
    this.rockets.push({
      x: Math.random() * this.width * 0.8 + this.width * 0.1,
      y: this.height,
      targetY: Math.random() * this.height * 0.4 + this.height * 0.1,
      vy: -(6 + Math.random() * 3),
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
    });
  }

  private updateRockets(): void {
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.y += r.vy;

      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
      this.ctx.fillStyle = r.color;
      this.ctx.fill();

      if (r.y <= r.targetY) {
        this.explode(r.x, r.y, r.color);
        this.rockets.splice(i, 1);
      }
    }
  }

  private explode(x: number, y: number, color: string): void {
    const count = 70 + Math.floor(Math.random() * 40);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 1 + Math.random() * 4;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: 0.01 + Math.random() * 0.015,
        color,
      });
    }
  }

  private updateParticles(): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.vx *= 0.98;
      p.vy = p.vy * 0.98 + 0.04; // gravity
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    }
  }
}
