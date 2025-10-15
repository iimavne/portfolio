import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Carousel } from 'bootstrap';

import { ProjectService, Project } from '../project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, AfterViewInit {

  @ViewChild('projectCarousel') projectCarousel?: ElementRef;

  project?: Project;
  safeVideoUrl!: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.project = this.projectService.getProjectById(id);

      if (this.project) {
        if (this.project.videoUrl) {
          this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.project.videoUrl);
        }
      } else {
        this.router.navigate(['/projects']);
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.projectCarousel) {
      // MODIFIÉ : On passe un objet d'options pour activer le défilement
      const carousel = new Carousel(this.projectCarousel.nativeElement, {
        interval: 4000, // Change d'image toutes les 4 secondes
        ride: 'carousel', // Démarre le défilement au chargement
        pause: 'hover'    // Met en pause quand la souris est dessus (très pro !)
      });
    }
  }

  // TA LOGIQUE D'ORIGINE POUR LES LOGOS
  getTechLogo(tech: string): string {
    // La map contient maintenant le chemin COMPLET pour chaque logo.
    const logoMap: Record<string, string> = {
      // --- Logos depuis tes fichiers locaux ---
      'Power BI': 'assets/logos/powerbi.svg.png', // Assure-toi que ce chemin est correct
      'Excel': 'assets/logos/excel.svg.png',     // et que les fichiers existent

      // --- Logos depuis le CDN Devicon ---
      'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg',
      'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
      'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
      'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
      'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
      'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
      'PHP': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
      'WordPress': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg'
    };

    // Un logo de secours si la technologie n'est pas dans la map
    const fallbackLogo = 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png';

    // La logique est simple : on retourne le logo de la map ou le logo de secours.
    return logoMap[tech] || fallbackLogo;
  }
}
