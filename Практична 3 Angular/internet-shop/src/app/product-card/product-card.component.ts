import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() name!: string;
  @Input() price!: number;
  @Input() description!: string;

  @Output() buyClicked = new EventEmitter<string>();

  onClick(): void {
    this.buyClicked.emit(this.name);
  }
}
