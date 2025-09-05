import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService, Project } from '../project.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project!: Project;
  safeVideoUrl!: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    const found = this.projectService.getProjectById(id);
    if (found) {
      this.project = found;
      // Sanitize video URL
      if (this.project.videoUrl) {
        this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.project.videoUrl);
      }
    } else {
      console.warn('Projet non trouvé');
    }
  }

  getTechLogo(tech: string): string {
    const map: any = {
      Angular: 'angularjs',
      Bootstrap: 'bootstrap',
      TypeScript: 'typescript',
      HTML: 'html5',
      CSS: 'css3',
      JavaScript: 'javascript'
    };
    const name = map[tech] || tech.toLowerCase();
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;
  }
}
