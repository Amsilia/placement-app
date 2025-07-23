import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ArticleService } from '../../services/artikel/article.service';

interface Article {
  id: string;
  slug: string;
  updated_at: string;
  image: string;
  title: string;
  content: string;
  visitor: number;
  is_published: boolean;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  currentSlide = 0;
  articles: Article[] = [];
  page = 1;
  limit = 10;
  maxSlides: number;
  constructor(private articleService: ArticleService, private route : Router) {
    this.maxSlides = this.articles.length - 1;
  }

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles() {
    this.articleService
      .getPublicArticles(this.page, this.limit)
      .subscribe((response) => {
        this.articles = response.data;
        this.maxSlides = Math.ceil(this.articles.length / 4) - 1; // Update maxSlides berdasarkan jumlah artikel
        // console.log(this.articles, "Ini Artikel");
        let test = this.articles;
        console.table({ test });
      });
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  nextSlide() {
    if (this.currentSlide < this.maxSlides) {
      this.currentSlide++;
    }
  }

  goDetail(slug: string) {
    this.route.navigate(['/artikel/', this.articles[this.currentSlide].slug]);
  }
}
