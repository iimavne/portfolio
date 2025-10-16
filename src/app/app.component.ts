import { Component, OnInit, Renderer2 } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // On s'abonne à l'état "jeu terminé"
    this.themeService.isGameComplete$.subscribe((isComplete: boolean) => {
      if (isComplete) {
        this.renderer.addClass(document.body, 'girly-cursor');
      } else {
        this.renderer.removeClass(document.body, 'girly-cursor');
      }
    });
  }
}

