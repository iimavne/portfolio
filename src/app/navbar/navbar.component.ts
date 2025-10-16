import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../theme.service'; // Assure-toi que le chemin est correct

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  // --- Propriétés pour le jeu de rubans ---
  foundCount$!: Observable<number>;
  totalRibbons!: number;

  // --- Propriétés pour l'indicateur magique ---
  @ViewChild('navLinks') navLinks!: ElementRef<HTMLUListElement>;
  @ViewChild('magicBow') magicBow!: ElementRef<HTMLDivElement>;

  // Le constructeur injecte les deux services dont on a besoin
  constructor(
    private renderer: Renderer2,
    private themeService: ThemeService
  ) {}

  // ngOnInit s'occupe de la logique du jeu
  ngOnInit(): void {
    this.foundCount$ = this.themeService.foundCount$;
    this.totalRibbons = this.themeService.totalRibbons;
  }

  // ngAfterViewInit s'occupe de la logique visuelle de l'indicateur
  ngAfterViewInit(): void {
    // On s'assure que les éléments existent avant de les manipuler
    if (!this.navLinks || !this.magicBow) return;

    const links = this.navLinks.nativeElement.querySelectorAll('.nav-link');

    setTimeout(() => {
      this.renderer.setStyle(this.magicBow.nativeElement, 'opacity', '1');
      this.positionBowUnderActiveLink(links);
    }, 100);

    links.forEach(link => {
      this.renderer.listen(link, 'mouseenter', () => {
        this.moveBowTo(link as HTMLElement);
      });
    });

    this.renderer.listen(this.navLinks.nativeElement, 'mouseleave', () => {
      this.positionBowUnderActiveLink(links);
    });
  }

  // --- Fonctions pour l'indicateur magique ---

  @HostListener('window:resize')
  onResize() {
    if (!this.navLinks) return;
    const links = this.navLinks.nativeElement.querySelectorAll('.nav-link');
    this.positionBowUnderActiveLink(links);
  }

  private moveBowTo(element: HTMLElement) {
    if (!this.navLinks || !this.magicBow) return;
    const elementRect = element.getBoundingClientRect();
    const navRect = this.navLinks.nativeElement.getBoundingClientRect();

    const newLeft = elementRect.left - navRect.left + (elementRect.width / 2);

    this.renderer.setStyle(this.magicBow.nativeElement, 'transform', `translateX(${newLeft}px) translateX(-50%)`);
  }

  private positionBowUnderActiveLink(links: NodeListOf<Element>) {
    const activeLink = Array.from(links).find(link => link.classList.contains('active'));
    if (activeLink) {
      this.moveBowTo(activeLink as HTMLElement);
    }
  }
}

