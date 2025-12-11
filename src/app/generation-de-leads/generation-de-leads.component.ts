import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-generation-de-leads',
  imports: [ RouterLink],
  templateUrl: './generation-de-leads.component.html',
  styleUrl: './generation-de-leads.component.css'
})

export class GenerationDeLeadsComponent implements OnInit, OnDestroy {

  constructor(private languageService: LanguageService) {}

  currentLang: 'fr' | 'en' = 'fr';
  langSub!: Subscription;

  translations = {
    fr: {
      subtitle: 'Intelligence artificielle -',
      title: 'CREATION DE CONTENU VISUEL PAR L\'IA GÉNÉRATIVE.',
      description: `Génération de contenu visuel unique et personnalisé : Photos, illustrations, designs, et vidéos. Idéal pour vos projets marketing, publicitié ou communication.`,
      button: 'Je suis interessé',
      info1: 'Génération de photos et vidéos ',
      info2: 'Formats adaptatifs : Publicité, réseaux sociaux, site web..',
      info3: 'Personnalisation du contenu visuel'
    },
    en: {
      subtitle: 'Artificial Intelligence -',
      title: 'VISUAL CONTENT CREATION WITH GENERATIVE AI.',
      description: `Unique and personalized visual content creation: photos, illustrations, designs, and videos. Perfect for your marketing, advertising, or communication projects.`,
      button: 'Contact Us',
      info1: 'Photo and video generation',
      info2: 'Adaptive formats: advertising, social media, website, etc.',
      info3: 'Personalized visual content'   
    }
  };

  ngOnInit(): void {
    this.langSub = this.languageService.lang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }
}
