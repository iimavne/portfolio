import { Injectable } from '@angular/core';

export interface Project {
  id: number;
  title: string;
  thumbnail: string;
  shortDescription: string;
  description: string;
  videoUrl?: string;
  siteUrl?: string;
  technologies: string[];
  duration: string;
  context: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    {
      id: 1,
      title: "Portfolio Angular",
      thumbnail: "assets/img/portfolio-thumb.jpg",
      shortDescription: "Mon portfolio personnel développé en Angular.",
      description: "Un site moderne et responsive pour présenter mes projets.",
      siteUrl: "https://github.com/imane/portfolio",
      technologies: ["Angular", "Bootstrap", "TypeScript"],
      duration: "2 semaines",
      context: "Projet personnel"
    },
    {
      id: 2,
      title: "Application Vidéo",
      thumbnail: "assets/img/video-app-thumb.jpg",
      shortDescription: "Application démonstrative avec une vidéo intégrée.",
      description: "Un projet pour tester l’intégration vidéo responsive.",
      videoUrl: "https://www.youtube.com/watch?v=WDhvXvNtsNY&feature=youtu.be",
      technologies: ["HTML", "CSS", "JavaScript"],
      duration: "1 semaine",
      context: "Projet académique"
    }
  ];

  constructor() { }

  getProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: number): Project | undefined {
    return this.projects.find(p => p.id === id);
  }
}
