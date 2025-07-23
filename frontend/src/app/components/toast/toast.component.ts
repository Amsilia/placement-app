import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class ToastComponent implements OnInit {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';
  @Input() isVisible = false;
  @Input() loading = false;
  progress = 100;
  timer : any ;
  ngOnInit(): void {
    this.showToast();
  }

  showToast() {
    this.isVisible = true;
    this.progress = 100;
    this.timer = setInterval(() => {
      this.progress -= 45;
      if (this.progress <= 0) {
        this.hideToast();
      }
    }, 1000); 
  }

  hideToast() {
    this.isVisible = false;
  }
}
