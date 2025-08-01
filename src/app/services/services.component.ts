import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-services',
  imports: [NgFor],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

  @Input() title: string = 'Nos Services';

  hoveredIndex: number | null = null;

  services = [
    {
      title: 'APPS WEB & MOBILE',
      icon: 'fa-solid fa-code',
      description: 'Conception et réalisation de sites web et apps mobile moderne, intuitive et responsive.',
    },
    {
      title: 'GÉNÉRATION DE LEADS',
      icon: 'fa-solid fa-chart-simple',
      description: 'Acquisition de leads pour vous permettre de développer votre marque',
    },
    {
      title: 'ACTIFS DIGITAUX',
      icon: 'fa-solid fa-mobile-screen-button',
      description: 'Nous possédons et gérons également nos propres applications mobiles sur iOS et Android',
    }
  ];

  scrollToAppsWebMobile() {
    document.getElementById('apps-web-mobile-section')?.scrollIntoView({ 
      behavior: 'smooth'
    });
  }
}
