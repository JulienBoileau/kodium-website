import { RouterLink } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';
import { marked } from 'marked';
import { CommonModule } from '@angular/common';

// Désactiver l’async globalement
marked.use({ async: false });

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private articleService = inject(ArticleService);

  article?: Article;
  htmlContent = '';
  readingTimeMinutes?: number;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articleService.getArticleById(id).subscribe({
        next: (article) => {
          this.article = article;
          this.htmlContent = marked.parse(article.content) as string;

          const wordCount = article.content.split(/\s+/).length;
          this.readingTimeMinutes = Math.max(1, Math.round(wordCount / 200));
        },
        error: (err) => console.error(err),
      });
    }
  }
}
