import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../app.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  @Input() products: Product[] = [];

  @Output() productAdded = new EventEmitter<string>();

  onBuy(productName: string): void {
    this.productAdded.emit(productName);
  }
}
