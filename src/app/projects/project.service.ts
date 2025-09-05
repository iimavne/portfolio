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
  methodes?: string[];
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
      description: "Un site moderne et responsive pour présenter tous mes projets. J’y ai intégré mes compétences en Angular, Bootstrap et TypeScript pour un rendu professionnel et girly.",
      siteUrl: "https://github.com/imane/portfolio",
      technologies: ["Angular", "Bootstrap", "TypeScript"],
      methodes: ["Méthode agile (Scrum)", "Développement itératif"],
      duration: "2 semaines",
      context: "Projet personnel"
    },
    {
      id: 2,
      title: "Book'N'Go",
      thumbnail: "assets/img/video-app-thumb.jpg",
      shortDescription: "Application web de gestion de voyage. (Pas déployée).",
      description: "Lors de ma deuxième année, mon équipe et moi avons développé une application web responsive autour du voyage. Elle permet de mettre en relation guides et voyageurs avec des espaces personnels et des fonctionnalités complètes. Le projet a été géré de manière agile en suivant les méthodes Scrum.",
      videoUrl: "https://www.youtube.com/embed/WDhvXvNtsNY",
      technologies: ["HTML", "CSS", "JavaScript"],
      methodes: ["Méthode agile (Scrum)", "Modèle MVC (Modèle, Vue, Contrôleur)"],
      duration: "5 mois",
      context: "Projet universitaire"
    },
    {
      id: 3,
      title: "Application Vidéo Demo",
      thumbnail: "assets/img/video-demo-thumb.jpg",
      shortDescription: "Test d'intégration vidéo responsive et interactive.",
      description: "Projet académique pour tester l’intégration de vidéos responsives dans une application web moderne, avec présentation dynamique et design épuré.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      methodes: ["Prototype rapide", "Responsive Design"],
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
