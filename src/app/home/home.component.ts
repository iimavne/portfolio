import { Component, AfterViewInit } from '@angular/core';
import Typed from 'typed.js'; // Assurez-vous d'importer Typed

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // styleUrls: ['./home.component.css'] // Si vous avez un fichier CSS spécifique
})
export class HomeComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    // Options pour l'animation de texte
    const options = {
      strings: [
        'Développeuse Full-Stack',
        'Spécialisée en Angular',
        'Passionnée par l\'IA',
        'Créatrice de solutions web'
      ],
      typeSpeed: 50,  // Vitesse de frappe
      backSpeed: 30,  // Vitesse de suppression
      loop: true,     // Répéter l'animation
      showCursor: true,
      cursorChar: '|',
    };

    // Initialisation de l'animation sur l'élément avec l'ID 'typed-text'
    new Typed('#typed-text', options);
  }
}
