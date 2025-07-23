import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/artikel/article.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  // services : './'
})
export class HeaderComponent implements OnInit{
  @Input() slug: string | null = null;
  article : any = null;
 constructor(private articleService: ArticleService) {}
  ngOnInit(): void {
    if (this.slug) {
      this.fetchArticleDetails(this.slug);
      console.log(
        '%cArtikel Detail',
        'background: #222; color: #bada55; font-size: 20px'
      );
      console.log('Slug yang diterima:', this.slug);
    }
  }

  fetchArticleDetails(slug: string) {
    this.articleService.getArticleBySlug(slug).subscribe(
      (response) => {
        this.article = response.data;
        console.log({ thisArticle: response.data });
      },
      (error) => {
        console.error('Error fetching article:', error);
      }
    );
  }
}

