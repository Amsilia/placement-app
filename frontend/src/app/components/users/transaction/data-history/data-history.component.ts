import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CanceledModalComponent } from '../modal/canceled-modal/canceled-modal.component';
import { SuccessedModalComponent } from '../modal/successed-modal/successed-modal.component';
import { TransactionService } from '../../../../services/transaction/transaction.service';

@Component({
  selector: 'app-data-history',
  standalone: true,
  imports: [CommonModule, CanceledModalComponent, SuccessedModalComponent],
  templateUrl: './data-history.component.html',
  styleUrl: './data-history.component.scss',
})
export class DataHistoryComponent {
  @Input() history: any[] = [];

  selectedTransaction: { id: string; status: string } | null = null;

  constructor(private transactionService: TransactionService) {}

openModal(registrantId: string, status: string) {
  this.selectedTransaction = { id: registrantId, status };

  this.transactionService.getTransactionByRegistrantId(registrantId).subscribe(
    (data) => {
      const transaction = data?.data?.[0];
      if (transaction?.payment_url) {
        window.open(transaction.payment_url, '_blank');
      } else {
        const fallbackData = this.history.find(item => item.id === registrantId);
        if (fallbackData?.payment_url) {
          window.open(fallbackData.payment_url, '_blank');
        } else {
          console.error('Payment URL tidak ditemukan untuk ID:', registrantId);
        }
      }
    },
    (error) => {
      console.error('Gagal mengambil data transaksi:', error);
    }
  );
}


  closeModal() {
    this.selectedTransaction = null;
  }
}

