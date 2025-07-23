import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../components/admin/sidebar/sidebar.component';
import { HeaderAdminComponent } from '../../../components/admin/header/header.component';
import { PaginationArticleComponent } from '../../../components/admin/setting-article/pagination-article/pagination-article.component';
import { ModalDeleteArticleComponent } from '../../../components/admin/setting-article/modal-delete-article/modal-delete-article.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ArticleService } from '../../../services/artikel/article.service';

interface Article {
  date: string;
  title: string;
  status: string; // Akan menjadi 'Publik' atau 'Privat'
  selected?: boolean; // Untuk checkbox di tabel
  id?: string; // ID adalah STRING UUID, penting untuk delete
  slug?: string; // Slug, untuk navigasi edit
}

@Component({
  selector: 'app-settingcms-article',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderAdminComponent,
    FormsModule,
    CommonModule,
    PaginationArticleComponent,
    ModalDeleteArticleComponent,
  ],
  templateUrl: './settingcms-article.component.html',
  styleUrls: ['./settingcms-article.component.scss'],
})
export class SettingcmsArticleComponent implements OnInit {
  isMinimized = false;
  searchQuery: string = '';
  sortOptionsVisible: boolean = false;
  filterOptionsVisible: boolean = false;
  selectedStatus: string | null = null;
  sortType: string = 'date_newest';

  paginatedArticles: Article[] = [];
  articles: Article[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalArticlesCount: number = 0;

  isModalVisible = false;
  deleteAll = false;
  selectedArticlesCount = 0;
  articleToDelete: Article | null = null;

  constructor(private router: Router, private articleService: ArticleService) {}

  ngOnInit() {
    this.loadArticles();
  }

  onSidebarToggle(minimized: boolean) {
    this.isMinimized = minimized;
  }

  loadArticles() {
    this.articleService
      .getAllArticles(this.currentPage, this.itemsPerPage, this.searchQuery)
      .subscribe(
        (response: any) => {
          console.log('DEBUG: API Response for article list:', response);
          this.paginatedArticles = response.data.map((article: any) => ({
            id: article.id,
            slug: article.slug,
            date: new Date(article.created_at).toLocaleDateString('id-ID', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }),
            title: article.title,
            status: article.is_published ? 'Publik' : 'Privat',
            selected: false,
          }));
          this.totalArticlesCount = response.total;
          console.log('DEBUG: Mapped paginatedArticles:', this.paginatedArticles);
          this.updateSelectedArticlesCount();
        },
        (error) => {
          console.error('ERROR: Error fetching articles:', error);
          // Tambahkan penanganan error di UI jika diperlukan
        }
      );
  }

  filterArticles() {
    this.currentPage = 1;
    this.loadArticles();
  }

  sortData(sortType: string) {
    this.sortType = sortType;
    let sortedArticles = [...this.paginatedArticles];
    const parseDate = (dateStr: string): number => {
      const parts = dateStr.split('/');
      return new Date(+parts[2], +parts[1] - 1, +parts[0]).getTime();
    };
    switch (sortType) {
      case 'title_asc':
        sortedArticles.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title_desc':
        sortedArticles.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'date_newest':
        sortedArticles.sort((a, b) => parseDate(b.date) - parseDate(a.date));
        break;
      case 'date_oldest':
        sortedArticles.sort((a, b) => parseDate(a.date) - parseDate(b.date));
        break;
    }
    this.paginatedArticles = sortedArticles;
    this.toggleSortOptions();
  }

  navigateToAddArticle() {
    this.router.navigate(['/admin/setting-article/add-articlepage']);
  }

  navigateToEditArticle(articleSlug: string | undefined) {
    console.log('DEBUG: navigateToEditArticle called with SLUG:', articleSlug);
    if (articleSlug) {
      console.log('DEBUG: Attempting to navigate to:', ['/admin/setting-article/edit-articlepage', articleSlug]);
      this.router.navigate(['/admin/setting-article/edit-articlepage', articleSlug]);
    } else {
      console.error('ERROR: Cannot navigate. articleSlug is undefined or null.');
      alert('Tidak dapat mengedit artikel: Slug tidak valid atau tidak ditemukan.');
    }
  }

  onFilterChange() {
    this.filterArticles();
  }

  toggleSortOptions() {
    this.sortOptionsVisible = !this.sortOptionsVisible;
  }

  toggleFilterOptions() {
    this.filterOptionsVisible = !this.filterOptionsVisible;
  }

  onPageChange(page: number) {
    if (page === this.currentPage) return;
    this.currentPage = page;
    this.loadArticles();
  }

  onItemsPerPageChange(itemsPerPage: number) {
    if (itemsPerPage === this.itemsPerPage) return;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.loadArticles();
  }

  onSingleSelect() {
    this.updateSelectedArticlesCount();
  }

  updateSelectedArticlesCount() {
    this.selectedArticlesCount = this.paginatedArticles.filter(
      (article) => article.selected
    ).length;
  }

  openDeleteModal(deleteAll: boolean, articleToDelete?: Article) {
    this.deleteAll = deleteAll;
    this.articleToDelete = deleteAll ? null : articleToDelete || null;
    this.isModalVisible = true;
  }

  closeDeleteModal() {
    this.isModalVisible = false;
    this.deleteAll = false;
    this.articleToDelete = null;
  }

  confirmDelete() {
    if (this.deleteAll) {
      const selectedArticleIds = this.paginatedArticles
        .filter((article) => article.selected)
        .map((article) => article.id)
        .filter(Boolean) as string[];

      if (selectedArticleIds.length > 0) {
        console.log('DEBUG: Menghapus artikel yang dipilih:', selectedArticleIds);
        this.articleService.deleteMultipleArticles(selectedArticleIds).subscribe(
          (response) => { // BLOK SUKSES UNTUK MULTIPLE DELETE
            console.log('DEBUG: Artikel-artikel berhasil dihapus:', response);
            alert('Artikel-artikel berhasil dihapus!');
            this.closeDeleteModal();
            this.loadArticles(); // Muat ulang data daftar artikel
          },
          (error) => { // BLOK ERROR UNTUK MULTIPLE DELETE
            console.error('ERROR: Gagal menghapus artikel-artikel:', error);
            // Ambil pesan error dari backend jika ada, jika tidak, gunakan pesan default
            alert(`Gagal menghapus artikel-artikel: ${error.error?.message || error.message || 'Terjadi kesalahan.'}`);
            this.closeDeleteModal();
          }
        );
      } else {
        alert('Tidak ada artikel yang dipilih untuk dihapus.');
        this.closeDeleteModal();
      }
    } else if (this.articleToDelete && this.articleToDelete.id) {
      console.log('DEBUG: Menghapus artikel:', this.articleToDelete.id);
      this.articleService.deleteArticle(this.articleToDelete.id).subscribe(
        (response) => { // BLOK SUKSES UNTUK SINGLE DELETE
          console.log('DEBUG: Artikel berhasil dihapus:', response);
          alert('Artikel berhasil dihapus!');
          this.closeDeleteModal();
          this.loadArticles(); // Muat ulang data daftar artikel
        },
        (error) => { // BLOK ERROR UNTUK SINGLE DELETE
          console.error('ERROR: Gagal menghapus artikel:', error);
          // Ambil pesan error dari backend jika ada, jika tidak, gunakan pesan default
          alert(`Gagal menghapus artikel: ${error.error?.message || error.message || 'Terjadi kesalahan.'}`);
          this.closeDeleteModal();
        }
      );
    } else {
      console.warn('DEBUG: confirmDelete dipanggil tanpa ID artikel atau artikel yang dipilih.');
      this.closeDeleteModal();
    }
  }
}