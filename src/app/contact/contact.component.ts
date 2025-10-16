import { Component, OnInit, Renderer2 } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  // Variable pour contrôler l'affichage du pop-up
  public showDossier = false;
  private ribbonId = 'ribbon-contact';

  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    // On écoute si le jeu est terminé
    this.themeService.isGameComplete$.subscribe(isComplete => {
      // On vérifie que le jeu VIENT de se terminer pour ne pas relancer la célébration
      // à chaque fois qu'on revient sur la page.
      if (isComplete && this.themeService.hasBeenFound(this.ribbonId)) {
        this.launchCelebration();
      }
    });
  }

  // Fonction appelée quand on clique sur le ruban
  findContactRibbon(event: MouseEvent): void {
    this.themeService.findRibbon(this.ribbonId);
    const ribbonElement = (event.target as HTMLElement);
    this.renderer.setStyle(ribbonElement, 'display', 'none'); // Fait disparaître le ruban
  }

  // Fonction pour savoir si on doit afficher le ruban ou non
  shouldShowRibbon(): boolean {
    return !this.themeService.hasBeenFound(this.ribbonId);
  }

  // Fonction qui lance les confettis ET affiche le pop-up
  private launchCelebration(): void {
    this.createConfetti();
    this.showDossier = true; // On affiche le pop-up !
  }

  // NOUVELLE FONCTION pour fermer le pop-up
  public closeDossier(): void {
    this.showDossier = false;
  }

  // La fonction pour créer les confettis (inchangée)
  private createConfetti(): void {
    const container = document.getElementById('confetti-container');
    if (!container) return;

    for (let i = 0; i < 100; i++) {
      const confetti = this.renderer.createElement('div');
      this.renderer.addClass(confetti, 'confetti');
      this.renderer.setStyle(confetti, 'left', `${Math.random() * 100}%`);
      this.renderer.setStyle(confetti, 'animation-delay', `${Math.random() * 2}s`);
      const colors = ['#d63384', '#ff7eb3', '#fdecf5'];
      this.renderer.setStyle(confetti, 'background-color', colors[Math.floor(Math.random() * colors.length)]);
      this.renderer.appendChild(container, confetti);
      setTimeout(() => {
        this.renderer.removeChild(container, confetti);
      }, 3000);
    }
  }
}

