import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleListComponent } from './pages/article-list/article-list.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { ContactComponent } from './contact/contact.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { TarifsComponent } from './tarifs/tarifs.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Kodium - Accueil'},
  { path: 'contact', component: ContactComponent },
  { path: 'blog', component: ArticleListComponent },
  { path: 'mentions-legales', component: MentionsLegalesComponent },
  { path: 'tarifs', component: TarifsComponent },
  { path: 'blog/:id', component: ArticleDetailComponent },
  { path: '**', redirectTo: ''},
];
