import { Component, OnInit, Renderer2 } from '@angular/core';
import { ThemeService } from '../theme.service';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private ribbonId = 'ribbon-home'; // ID unique pour le ruban de cette page

  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Ton animation Typed.js
    const options = {
      strings: ['Développeuse Full-Stack', 'Spécialisée en Angular', 'Passionnée par l\'IA', 'Créatrice de solutions web'],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    };
    new Typed('#typed-text', options);
  }

  // Fonction appelée au clic sur le ruban
  findHomeRibbon(event: MouseEvent): void {
    if (!this.themeService.hasBeenFound(this.ribbonId)) {
      this.themeService.findRibbon(this.ribbonId);
      this.createSparkles(event.clientX, event.clientY);
      const bowElement = (event.target as HTMLElement);
      this.renderer.setStyle(bowElement, 'display', 'none'); // Fait disparaître le ruban
    }
  }

  // Ta fonction pour créer les étincelles
  private createSparkles(x: number, y: number): void {
    const container = document.getElementById('sparkle-container');
    if (!container) return;
    for (let i = 0; i < 12; i++) {
      const sparkle = this.renderer.createElement('div');
      this.renderer.addClass(sparkle, 'sparkle');
      this.renderer.setStyle(sparkle, 'left', `${x}px`);
      this.renderer.setStyle(sparkle, 'top', `${y}px`);
      const randomX = (Math.random() - 0.5) * 200;
      const randomY = (Math.random() - 0.5) * 200;
      this.renderer.setStyle(sparkle, '--x', `${randomX}px`);
      this.renderer.setStyle(sparkle, '--y', `${randomY}px`);
      this.renderer.appendChild(container, sparkle);
      setTimeout(() => {
        this.renderer.removeChild(container, sparkle);
      }, 700);
    }
  }
}

