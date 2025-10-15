import { Injectable } from '@angular/core';

// L'interface Project est mise à jour pour utiliser un tableau d'images
export interface Project {
  id: number;
  title: string;
  images: string[]; // CHANGEMENT : 'thumbnail: string' devient 'images: string[]'
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
   /* {
      id: 1,
      title: "Portfolio Angular",
      // MISE À JOUR : Utilisation du tableau 'images'
      images: ["assets/img/portfolio-thumb.jpg"],
      shortDescription: "Portfolio personnel développé pour présenter mes compétences.",
      description: "Création d’un site moderne, responsive et esthétique afin de présenter mes projets et compétences. J’y ai mis en avant l’utilisation d’Angular, Bootstrap et TypeScript, pour un rendu professionnel et ergonomique.",
      siteUrl: "https://github.com/iimavne/portfolio", // J'ai corrigé le lien GitHub
      technologies: ["Angular", "TypeScript", "Bootstrap"],
      methodes: ["Méthode agile (Scrum)", "Développement itératif"],
      duration: "2 semaines",
      context: "Projet personnel"
    },*/
    {
      id: 2,
      title: "Book'N'Go",
      // MISE À JOUR : Utilisation du tableau 'images'
      images: ["assets/img/bookngo.jpeg"], // Nom de fichier corrigé pour la cohérence
      shortDescription: "Application web de gestion de voyages (projet universitaire).",
      description: "Développement d’une application web responsive permettant de mettre en relation des voyageurs et des guides. Le projet comprenait des espaces utilisateurs personnalisés, des fonctionnalités de gestion de voyages et une architecture pensée en MVC. Il a été mené en équipe avec une organisation agile (Scrum).",
      videoUrl: "https://www.youtube.com/embed/WDhvXvNtsNY",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP"],
      methodes: ["Méthode agile (Scrum)", "Modèle MVC (Modèle, Vue, Contrôleur)"],
      duration: "5 mois",
      context: "Projet universitaire"
    },
    {
      id: 3,
      title: "Tableau de bord",
      // MISE À JOUR : Tableau avec plusieurs images pour le carrousel
      images: [
        "assets/img/TBD-BI1.jpeg", // Image de couverture
        "assets/img/TBD-BI2.jpeg", // Image de couverture
      ],
      shortDescription: "Création d’un tableau de bord interactif (Power BI & Excel).",
      description: "Conception et réalisation d’un tableau de bord interactif en utilisant Power BI et Excel. Le travail a consisté à construire un datamart à partir de données existantes dans un entrepôt, puis à transformer et analyser ces données afin de produire des visualisations adaptées aux besoins des utilisateurs.",
      technologies: ["Power BI", "Excel"],
      methodes: ["Business Intelligence", "Analyse des besoins"],
      duration: "1 semaine",
      context: "Projet académique"
    },
    {
      id: 4,
      title: "Refonte du site Aditu",
      // MISE À JOUR : Utilisation du tableau 'images'
      images: ["assets/img/aditu.jpeg"],
      shortDescription: "Refonte d’un site web responsive pour une entreprise.",
      description: "Refonte complète du site web de l’entreprise Aditu. Le projet a consisté à moderniser l’interface, améliorer l’ergonomie et organiser le contenu de manière claire et professionnelle. Le site a été développé en conservant l’usage de WordPress afin de faciliter la prise en main par le client, tout en garantissant un design responsive et une meilleure expérience utilisateur.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "WordPress", "Bootstrap"],
      methodes: ["Agilité", "Analyse des besoins"],
      siteUrl: "https://aditu.fr",
      duration: "2 mois",
      context: "Projet professionnel"
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
