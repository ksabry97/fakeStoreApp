import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AddProductComponent } from 'src/app/components/add-product/add-product.component';
import { Product } from 'src/app/core/interfaces/product';
import { FakeStoreService } from 'src/app/core/services/fake-store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, AddProductComponent],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  productPopupOpened: boolean = false;
  editMode: boolean = false;
  productId!: number;
  editedproductIndex: number | null = null;
  constructor(
    private readonly fakeStoreServ: FakeStoreService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  // get all products

  getAllProducts() {
    this.fakeStoreServ.getAllProducts().subscribe({
      next: (result: Product[] | any) => {
        this.products = result;
        this.filteredProducts = [...this.products];
      },
      error: () => {
        console.log('error');
      },
      complete: () => {},
    });
  }

  // navigate to product details

  navigate(id: number) {
    this.router.navigate(['dashboard/product-details', id]);
  }

  // search in products
  search() {
    if (this.searchQuery.trim()) {
      this.products = this.filteredProducts.filter((value) => {
        return value.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    } else {
      this.products = [...this.filteredProducts];
    }
  }

  // track by function
  trackProduct(index: number, product: Product) {
    return product.id;
  }
  // open add product
  openAddProduct() {
    this.editMode = false;
    this.productPopupOpened = true;
  }
  // edit product
  openEditProduct(id: number, i: number) {
    this.editMode = true;
    this.productPopupOpened = true;
    this.productId = id;
    this.editedproductIndex = i;
  }
  // update list after adding or editing product
  updateProductList(product: Product) {
    if (!this.editMode) {
      this.products.unshift(product);
    } else {
      if (this.editedproductIndex !== null) {
        this.products.splice(this.editedproductIndex, 1, product);
      }
    }
  }

  // delete product
  deleteProduct(id: number, i: number) {
    this.fakeStoreServ.deleteProduct(id.toString()).subscribe({
      next: () => {
        this.products.splice(i, 1);
      },
      error: () => {},
      complete: () => {},
    });
  }
}
