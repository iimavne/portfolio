import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isGameComplete$!: Observable<boolean>;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // On s'abonne à l'état "jeu terminé"
    this.isGameComplete$ = this.themeService.isGameComplete$;
  }
}

