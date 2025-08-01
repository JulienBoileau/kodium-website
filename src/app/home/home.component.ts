import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import lottie from 'lottie-web';
import { NgFor } from '@angular/common';
import { LanguageService } from '../language.service';
import { Subscription } from 'rxjs';
import { ServicesComponent } from '../services/services.component';
import { AppsWebMobileComponent } from '../apps-web-mobile/apps-web-mobile.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, ServicesComponent, AppsWebMobileComponent ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // ❗️ <- "styleUrls" et non "styleUrl"
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  constructor(private languageService: LanguageService) {}

  langSub!: Subscription;
  currentLang: 'fr' | 'en' = 'fr';
  currentTime: string = '';
  private intervalId: any;

  translations = {
    fr: {
      h1: ['AGENCE', ' WEB & DIGITALE'],
      tagline: 'Transformez votre présence digitale',
      servicesTitle: 'Nos Services',
      services: ['Conception Web', 'UI/UX', 'Identité de Marque', 'Développement'],
      scrollDown: 'Faites défiler',
      booking: 'Prendre un RDV'
    },
    en: {
      h1: ['DIGITAL', '& WEB AGENCY'],
      tagline: 'Transforming your digital presence',
      servicesTitle: 'Our Services',
      services: ['Web Design', 'UI/UX', 'Brand Identity', 'Development'],
      scrollDown: 'Scroll-down',
      booking: 'Book a Free Call'
    }
  };

  ngAfterViewInit(): void {

    this.langSub = this.languageService.lang$.subscribe(lang => {
      this.currentLang = lang;
    });

    const anim = lottie.loadAnimation({
      container: document.getElementById('lottie-container')!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets5.lottiefiles.com/private_files/lf30_editor_ygdxwkqe.json'
    });
  
    anim.addEventListener('DOMLoaded', () => {
      console.log('✅ Lottie loaded correctly');
    });
  
    anim.addEventListener('data_failed', () => {
      console.error('❌ Failed to load Lottie JSON');
    });

        // Démarrer horloge
        this.updateTime();
        this.intervalId = setInterval(() => this.updateTime(), 1000);
      }
    
      ngOnDestroy(): void {
        clearInterval(this.intervalId);
        this.langSub.unsubscribe();
      }
    
      updateTime(): void {
        const now = new Date();
        this.currentTime = now.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Europe/Paris'
        });
      }

      switchLang(lang: 'fr' | 'en') {
        this.currentLang = lang;
      }
  }
