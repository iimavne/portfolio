import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public readonly totalRibbons = 3;
  private foundRibbons = new Set<string>();

  private foundCountSubject = new BehaviorSubject<number>(0);
  public foundCount$ = this.foundCountSubject.asObservable();

  private gameCompleteSubject = new BehaviorSubject<boolean>(false);
  public isGameComplete$ = this.gameCompleteSubject.asObservable();

  constructor() { }

  findRibbon(ribbonId: string): void {
    if (this.foundRibbons.has(ribbonId)) {
      return;
    }

    this.foundRibbons.add(ribbonId);
    this.foundCountSubject.next(this.foundRibbons.size);

    if (this.foundRibbons.size === this.totalRibbons) {
      this.gameCompleteSubject.next(true);
      console.log("Bravo, jeu terminé !");
    }
  }

  hasBeenFound(ribbonId: string): boolean {
    return this.foundRibbons.has(ribbonId);
  }
}

