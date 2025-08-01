import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-apps-web-mobile',
  imports: [ NgFor, NgIf],
  templateUrl: './apps-web-mobile.component.html',
  styleUrl: './apps-web-mobile.component.css'
})
export class AppsWebMobileComponent {

  activeIndex: number | null = null;
  hoveredIndex: number | null = null;

  selectProject(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  projects = [
    {
      title: 'Project 1',
      image: 'assets/emjy.png',
      tags: ['Site web', 'Design'],
      link: 'https://site-du-projet1.com'
    },
    {
      title: 'Project 2',
      image: 'assets/elies.png',
      tags: ['Newsletter', 'Design'],
      link: 'https://site-du-projet1.com'
    },
    {
      title: 'Project 3',
      image: 'assets/singeenhiver.png',
      tags: ['Site web', 'Design'],
      link: 'https://site-du-projet1.com'
    }
  ];

  scrollNext(carousel: HTMLElement) {
    carousel.scrollBy({ left: 320, behavior: 'smooth' });
  }

}
