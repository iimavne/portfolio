import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProjectService, Project } from './project.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  private ribbonId = 'ribbon-projects'; // ID unique pour ce ruban

  constructor(
    private projectService: ProjectService,
    private themeService: ThemeService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }

  // NOUVEAU : Fonction appelée au clic sur le ruban
  findProjectsRibbon(event: MouseEvent): void {
    this.themeService.findRibbon(this.ribbonId);
    this.createSparkles(event.clientX, event.clientY);
    // On cache le ruban après le clic
    const ribbonElement = (event.target as HTMLElement);
    this.renderer.setStyle(ribbonElement, 'display', 'none');
  }

  // NOUVEAU : Fonction pour décider si on doit afficher le ruban
  shouldShowRibbon(): boolean {
    return !this.themeService.hasBeenFound(this.ribbonId);
  }

  // NOUVEAU : Fonction pour l'animation d'étincelles
  private createSparkles(x: number, y: number): void {
    const container = document.getElementById('sparkle-container-projects');
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
