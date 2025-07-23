import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-price',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-price.component.html',
  styleUrl: './add-price.component.scss',
})
export class AddPriceComponent {
  @Output() priceAdded = new EventEmitter<{
    batch_id: string;
    name: string;
    amount: number;
    special_condition?: string;
  }>();
  @Output() modalClosed = new EventEmitter<void>();
  isVisible = false;
  batch_id: string = '';
  name: string = '';
  amount: any = '';
  // special_condition: string | null = null;
  special_condition: string = '';
  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(e: Event) {
    e.preventDefault();
    // console.log('data');
    const b_id = this.batch_id;
    // console.log({ b_id });
    const name = this.name;
    // console.log({ name });
    const amount = this.amount;
    const special_condition = this.special_condition;
    // console.log({ special_condition });
    if (name && amount && special_condition) {
      // console.log('pass');
      this.priceAdded.emit({
        batch_id: '',
        name: this.name,
        amount: this.amount,
        special_condition: this.special_condition,
      });
      this.closeModal();
    } else {
      this.priceAdded.emit({
        batch_id: '',
        name: this.name,
        amount: this.amount,
      });
      this.closeModal();
    }
  }
}
