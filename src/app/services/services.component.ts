import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LanguageService } from '../language.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

  constructor(private languageService: LanguageService) {}

  @Input() title: string = 'Nos Services';
  hoveredIndex: number | null = null;
  currentLang: 'fr' | 'en' = 'fr';
  langSub!: Subscription;

  translations = {
    fr: [
      {
        title: 'CRÉATION DE SITE WEB',
        icon: 'fa-solid fa-code',
        description: 'Conception et réalisation de sites web modernes, intuitifs et responsives.'
      },
      {
        title: 'CRÉATION IA',
        icon: 'fa-solid fa-brain',
        description: 'Création de contenu personnalisé visuel avec IA : Photo - Vidéo - Audio. Idéal pour les campagnes marketing.'
      },
      {
        title: 'ACTIFS DIGITAUX',
        icon: 'fa-solid fa-mobile-screen-button',
        description: 'Nous possédons et gérons également nos propres applications mobiles sur iOS et Android.'
      }
    ],
    en: [
      {
        title: 'WEB & MOBILE APPS',
        icon: 'fa-solid fa-code',
        description: 'Design and development of modern, intuitive, and responsive websites and mobile apps.'
      },
      {
        title: 'AI EXPERTISE',
        icon: 'fa-solid fa-brain',
        description: 'Support in prompt engineering and prompt optimization to maximize generative AI performance.'
      },
      {
        title: 'DIGITAL ASSETS',
        icon: 'fa-solid fa-mobile-screen-button',
        description: 'We also own and manage our own iOS and Android mobile applications.'
      }
    ]
  };

  services = this.translations[this.currentLang];

  ngOnInit() {
    this.langSub = this.languageService.lang$.subscribe(lang => {
      this.currentLang = lang;
      this.services = this.translations[this.currentLang];
    });
  }

  ngOnDestroy() {
    this.langSub.unsubscribe();
  }

  scrollToAppsWebMobile() {
    document.getElementById('apps-web-mobile-section')?.scrollIntoView({ 
      behavior: 'smooth'
    });
  }

  scrollToGenerationDeLeads() {
    document.getElementById('generation-de-leads-section')?.scrollIntoView({ 
      behavior: 'smooth'
    });
  }

  scrollToActifsDigitaux() {
    document.getElementById('actifs-digitaux-section')?.scrollIntoView({ 
      behavior: 'smooth'
    });
  }
}