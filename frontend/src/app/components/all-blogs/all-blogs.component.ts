import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticleService } from '../../services/artikel/article.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-all-blogs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './all-blogs.component.html',
  styleUrl: './all-blogs.component.scss'
})
export class AllBlogsComponent implements OnInit {
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 8 ;
  itemsPerPageOptions: number[] = [8, 16, 24, 32];
  totalArticles: number = 0;
  articles : any[]= [];
  filteredArticles: any[] = [];
  paginatedArticles: any[] = [];
  isGridView: boolean = true;

  private searchSubject = new Subject<string>();

  constructor(private articleService: ArticleService, private router : Router) {}

  ngOnInit(): void {
    this.loadArticles();
    this.setupSearchDebounce();
  }

  setupSearchDebounce() {
    this.searchSubject.pipe(
      debounceTime(300), // Wait for 500ms after typing stops
      distinctUntilChanged(), // Only trigger if query changes
      switchMap(query => {
        this.searchQuery = query;
        return this.articleService.getPublicArticles(this.currentPage, this.itemsPerPage, query);
      })
    ).subscribe(response => {
      this.paginatedArticles = response.data;
      this.totalArticles = response.total;
    });
  }

  // This method will be triggered whenever the search input changes
  onSearchInputChange(query: string): void {
    this.searchSubject.next(query); // Push the query to the subject
  }

  loadArticles() {
    this.articleService.getPublicArticles(this.currentPage, this.itemsPerPage, this.searchQuery).subscribe((response) => {
      this.paginatedArticles = response.data;
      this.totalArticles = response.total;
    });
  }
  
  toggleView(view: 'grid' | 'list') {
    this.isGridView = view === 'grid';
  }
  filterArticles() {
    const query = this.searchQuery.toLowerCase();
    this.filteredArticles = this.articles.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query)
    );
    this.currentPage = 1;
    this.loadArticles();
  }

  paginateArticles() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedArticles = this.articles.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadArticles();
    }
  }

  changeItemsPerPage(items: number) {
    this.itemsPerPage = items;
    this.currentPage = 1;
    this.loadArticles();
  }

  get totalPages(): number {
    return Math.ceil(this.totalArticles / this.itemsPerPage);
  }

  getDisplayedPages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxDisplayedPages = 5;

    if (this.totalPages <= maxDisplayedPages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        pages.push(1, 2, 3, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1, '...', this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        pages.push(1, '...', this.currentPage, '...', this.totalPages);
      }
    }

    return pages;
  }

  goToDetail(slug : string) : void {
      this.router.navigate([`artikel/`, slug])
  }
  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('id-ID', options);
  }
}
