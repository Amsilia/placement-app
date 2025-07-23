import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BlogComponent } from '../../blog/blog.component';
import { FooterComponent } from '../../footer/footer.component';
import { ArticleService } from '../../../services/artikel/article.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [DatePipe, BlogComponent, FooterComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent implements OnInit {
  @Input() slug: string | null = null;
  article: any = null;

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

  articleDate: Date = new Date(2018, 11, 2);
}
