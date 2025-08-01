import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-navbar',
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  menuOpen = false;
   
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  constructor(private languageService: LanguageService) {}

  langMenuOpen = false;
  currentLang = 'fr';

  translations = {
    contact: 'Contact'
  };

  toggleLangMenu() {
    this.langMenuOpen = !this.langMenuOpen;
  }

  switchLang(lang: 'fr' | 'en') {
    this.languageService.setLang(lang);
    this.langMenuOpen = false;
  }

  onContactClick() {
    // Exemple : scroll vers une section
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  }
}
