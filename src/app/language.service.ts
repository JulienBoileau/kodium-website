import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private langSubject = new BehaviorSubject<'fr' | 'en'>('fr');
  lang$ = this.langSubject.asObservable();

  setLang(lang: 'fr' | 'en') {
    this.langSubject.next(lang);
  }

  get currentLang(): 'fr' | 'en' {
    return this.langSubject.value;
  }
}