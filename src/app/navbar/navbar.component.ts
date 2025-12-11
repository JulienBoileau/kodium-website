import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { LanguageService } from '../language.service';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private languageService: LanguageService) {}

  menuOpen = false;
  langMenuOpen = false;
  currentLang: 'fr' | 'en' = 'fr';

  private langSub!: Subscription;

  translations = {
    fr: {
      contact: 'Contact',
      services: 'Services',
      tarifs: 'Tarifs',
      blog: 'Blog'
    },
    en: {
      contact: 'Contact',
      services: 'Services',
      tarifs: 'Pricing',
      blog: 'Blog'
    }
  };

  ngOnInit() {
    this.langSub = this.languageService.lang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  ngOnDestroy() {
    this.langSub.unsubscribe();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleLangMenu() {
    this.langMenuOpen = !this.langMenuOpen;
  }

  switchLang(lang: 'fr' | 'en') {
    this.languageService.setLang(lang);
    this.langMenuOpen = false;
  }

  scrollToServices() {
    if (window.location.pathname !== '/') {
      window.location.href = '/#services';
      return;
    }

    const section = document.getElementById('services');
    section?.scrollIntoView({ behavior: 'smooth' });
  }
}
