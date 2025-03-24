import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/interfaces/product';
import { FakeStoreService } from 'src/app/core/services/fake-store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private readonly fakeStoreServ: FakeStoreService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  // get all products

  getAllProducts() {
    this.fakeStoreServ.getAllProducts().subscribe({
      next: (result: Product[] | any) => {
        this.products = result;
      },
      error: () => {
        console.log('error');
      },
      complete: () => {},
    });
  }
}
