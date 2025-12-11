import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgFor } from '@angular/common';
import { Subscription } from 'rxjs';
import { LanguageService } from '../language.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-apps-web-mobile',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './apps-web-mobile.component.html',
  styleUrls: ['./apps-web-mobile.component.css']
})
export class AppsWebMobileComponent implements OnInit, OnDestroy {
  currentLang: 'fr' | 'en' = 'fr';
  langSub!: Subscription;


  translations = {
    fr: {
      title: 'Nos réalisations Web',
      projects: [
        {
          title: 'Project 1',
          image: 'assets/emjy.png',
          tags: ['Site web', 'Production vidéo'],
          link: 'https://emjyproduction.fr/accueil'
        },
        {
          title: 'Project 2',
          image: 'assets/elies.png',
          tags: ['Newsletter', 'Humoriste'],
          link: 'https://newsletter-elies.web.app/'
        },
        {
          title: 'Project 3',
          image: 'assets/aiavatar-website.png',
          tags: ['Website', 'App mobile'],
          link: 'https://aiavatarapp.net'
        },
        {
          title: 'Project 4',
          image: 'assets/kodium-website.png',
          tags: ['Site web', 'Agence digitale'],
          link: 'https://kodium.fr'
        },
        {
          title: 'Project 5',
          image: 'assets/adorpro19.png',
          tags: ['Site web', 'Services'],
          link: 'https://adorpro19.com'
        },
        {
          title: 'Project 6',
          image: 'assets/singeenhiver.png',
          tags: ['Site web', 'Bar'],
          link: 'https://unsingeenhiver.fr/'
        }

      ]
    },
    en: {
      title: 'Our Web Projects',
      projects: [
        {
          title: 'Project 1',
          image: 'assets/emjy.png',
          tags: ['Website', 'Video Production'],
          link: 'https://site-du-projet1.com'
        },
        {
          title: 'Project 2',
          image: 'assets/elies.png',
          tags: ['Newsletter', 'Humorist'],
          link: 'https://site-du-projet2.com'
        },
        {
          title: 'Project 3',
          image: 'assets/aiavatar-website.png',
          tags: ['Website', 'Mobile app'],
          link: 'https://aiavatarapp.net'
        },
        {
          title: 'Project 4',
          image: 'assets/kodium-website.png',
          tags: ['Website', 'Digital agency'],
          link: 'https://kodium.fr'
        },
        {
          title: 'Project 5',
          image: 'assets/adorpro19.png',
          tags: ['Website', 'Services'],
          link: 'https://adorpro19.com'
        },
        {
          title: 'Project 6',
          image: 'assets/singeenhiver.png',
          tags: ['Website', 'Bar'],
          link: 'https://site-du-projet3.com'
        }
      ]
    }
  };

  title = this.translations[this.currentLang].title;
  projects = this.translations[this.currentLang].projects;

  activeIndex: number | null = null;

  // 🔥 indique si on peut revenir en arrière (affichage flèche gauche)
  canScrollLeft = false;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.langSub = this.languageService.lang$.subscribe(lang => {
      this.currentLang = lang;
      this.title = this.translations[lang].title;
      this.projects = this.translations[lang].projects;
    });
  }

  ngOnDestroy() {
    this.langSub.unsubscribe();
  }

  selectProject(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  @ViewChild('carousel', { static: true }) carouselRef!: ElementRef<HTMLElement>;

  scrollNext() {
    const carousel = this.carouselRef.nativeElement;
  
    carousel.scrollBy({ left: 380, behavior: 'smooth' });
  
    // Vérifie après le scroll
    setTimeout(() => {
      this.canScrollLeft = carousel.scrollLeft > 5;
    }, 200);
  }
  
  scrollPrev() {
    const carousel = this.carouselRef.nativeElement;
  
    carousel.scrollBy({ left: -380, behavior: 'smooth' });
  
    setTimeout(() => {
      this.canScrollLeft = carousel.scrollLeft > 5;
    }, 200);
  }
  
  onCarouselScroll() {
    const carousel = this.carouselRef.nativeElement;
    this.canScrollLeft = carousel.scrollLeft > 5;
  }
  
  
}
