import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../language.service';
import { Subscription } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-actifs-digitaux',
  standalone: true,
  imports: [NgFor],
  templateUrl: './actifs-digitaux.component.html',
  styleUrls: ['./actifs-digitaux.component.css']
})
export class ActifsDigitauxComponent implements OnInit, OnDestroy {
  currentLang: 'fr' | 'en' = 'fr';
  langSub!: Subscription;

  translations = {
    fr: {
      title: 'Nos Actifs Digitaux',
      apps: [
        {
          name: 'Speech Lab',
          desc: 'Application de synthèse vocale',
          img: 'assets/speech_lab.jpg',
          link: 'https://apps.apple.com/us/app/speech-lab-voicemod-tts/id6464452140'
        },
        {
          name: 'AI Avatar',
          desc: 'Création et Animation d\'Avatars',
          img: 'assets/ai_avatar.png',
          link: 'https://apps.apple.com/us/app/ai-avatar-generator-animator/id6738083056'
        },
        {
          name: 'Hypernet',
          desc: 'Application VPN',
          img: 'assets/hypernet.webp',
          link: 'https://apps.apple.com/fr/app/vpn-hypernet-hotspot-mobile/id1514017857'
        }
      ]
    },
    en: {
      title: 'Our Digital Assets',
      apps: [
        {
          name: 'Speech Lab',
          desc: 'AI text-to-speech app',
          img: 'assets/aivoicer.webp',
          link: 'https://apps.apple.com/us/app/speech-lab-voicemod-tts/id6464452140'
        },
        {
          name: 'AI Avatar',
          desc: 'Avatar Generator & Animator',
          img: 'assets/ai_avatar.png',
          link: 'https://apps.apple.com/us/app/ai-avatar-generator-animator/id6738083056'
        },
        {
          name: 'Hypernet',
          desc: 'VPN app',
          img: 'assets/hypernet.webp',
          link: 'https://apps.apple.com/fr/app/vpn-hypernet-hotspot-mobile/id1514017857'
        }
      ]
    }
  };

  apps = this.translations[this.currentLang].apps;
  title = this.translations[this.currentLang].title;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.langSub = this.languageService.lang$.subscribe(lang => {
      this.currentLang = lang;
      this.apps = this.translations[this.currentLang].apps;
      this.title = this.translations[this.currentLang].title;
    });
  }

  ngOnDestroy() {
    this.langSub.unsubscribe();
  }
}