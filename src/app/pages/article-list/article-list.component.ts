import { Component, OnInit, inject } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ArticleList } from '../../models/article.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  standalone: true,
  imports: [ CommonModule ],
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  private articleService = inject(ArticleService);
  private router = inject(Router);
  articles: ArticleList = [];
  loading = true;

  ngOnInit() {
    this.articleService.getArticles().subscribe({
      next: (data) => {
        this.articles = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur de chargement des articles', err);
        this.loading = false;
      }
    });
  }

  openArticle(id: string) {
    this.router.navigate(['/blog', id]);
  }
}
