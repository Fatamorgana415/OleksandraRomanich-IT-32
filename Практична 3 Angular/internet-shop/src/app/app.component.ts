import { Component } from '@angular/core';

export interface Product {
  name: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  shopName = 'ТехноМаркет';

  products: Product[] = [
    {
      name: 'Ноутбук ASUS',
      price: 25000,
      description: 'Ноутбук для навчання та роботи.'
    },
    {
      name: 'Смартфон Samsung Galaxy',
      price: 18500,
      description: 'Потужний смартфон з відмінною камерою.'
    },
    {
      name: 'Навушники Sony WH-1000XM5',
      price: 12000,
      description: 'Бездротові навушники з шумозаглушенням.'
    }
  ];

  cartMessage = '';

  onProductAdded(productName: string): void {
    this.cartMessage = `Товар "${productName}" додано до кошика`;

    setTimeout(() => {
      this.cartMessage = '';
    }, 3000);
  }
}
