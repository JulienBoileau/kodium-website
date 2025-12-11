import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
import { NavbarComponent } from './navbar/navbar.component';
import { BackgroundComponent } from './animation-background/background.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, BackgroundComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kodium-website';

  ngOnInit() {
    AOS.init({ duration: 1000, once: true });
  }
}
