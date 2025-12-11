import { Component, OnDestroy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LanguageService } from '../language.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnDestroy {

  currentLang: 'fr' | 'en' = 'fr';
  private langSub: Subscription;

  // Texte FR / EN
  translations = {
    fr: {
      title: 'Contact',
      subtitle: 'Dites-moi en plus sur votre projet web, je vous répondrai rapidement.',
      typeLabel: 'Vous êtes :',
      individual: 'Particulier',
      company: 'Entreprise',
      companyLabel: 'Entreprise',
      nameLabel: 'Prénom et Nom',
      emailLabel: 'Email',
      phoneLabel: 'Téléphone',
      messageLabel: 'Message',
      namePlaceholder: 'Votre nom complet',
      emailPlaceholder: 'exemple@domaine.com',
      phonePlaceholder: '06 12 34 56 78',
      messagePlaceholder: 'Parlez-moi de votre besoin, de votre projet, de votre activité...',
      send: 'Envoyer →',
      sending: 'Envoi en cours...',
      successMessage: 'Merci ! Votre message a bien été envoyé. Je reviens vers vous rapidement.',
      errorMessage: 'Une erreur est survenue lors de l’envoi. Merci de réessayer dans quelques instants.'
    },
    en: {
      title: 'Contact me',
      subtitle: 'Tell me more about your web project, I will get back to you shortly.',
      typeLabel: 'You are:',
      individual: 'Individual',
      company: 'Company',
      companyLabel: 'Company',
      nameLabel: 'First and Last Name',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      messageLabel: 'Message',
      namePlaceholder: 'Your full name',
      emailPlaceholder: 'example@domain.com',
      phonePlaceholder: '+33 6 12 34 56 78',
      messagePlaceholder: 'Tell me more about your needs, project, business...',
      send: 'Send →',
      sending: 'Sending...',
      successMessage: 'Thank you! Your message has been sent. I will get back to you soon.',
      errorMessage: 'An error occurred while sending. Please try again in a moment.'
    }
  };

  // Données du formulaire
  form = {
    type: '',
    company: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  // Honeypot anti-bot (captcha invisible)
  honeypot: string = '';

  loading = false;
  success = false;
  error = '';

  constructor(private http: HttpClient, private languageService: LanguageService) {
    this.langSub = this.languageService.lang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  get t() {
    return this.translations[this.currentLang];
  }

  async onSubmit(form: NgForm) {
    if (!form.valid) return;
  
    this.loading = true;
    this.success = false;
  
    const functionURL =
      "https://us-central1-kodium-website.cloudfunctions.net/addContactMessage";
  
    try {
      await this.http.post(functionURL, {
        type: this.form.type,
        company: this.form.company,
        name: this.form.name,
        email: this.form.email,
        phone: this.form.phone,
        message: this.form.message,
        lang: this.currentLang
      }).toPromise();
  
      this.success = true;
      this.error = '';
      
      form.resetForm();
      
      // scroll automatique
      setTimeout(() => this.scrollToSuccess(), 100);
  
    } catch (err) {
      console.error("Erreur lors de l’envoi :", err);
    } finally {
      this.loading = false;
    }
  }

  scrollToSuccess() {
    const el = document.getElementById("successBanner");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
  
  ngOnDestroy() {
    this.langSub.unsubscribe();
  }
}
