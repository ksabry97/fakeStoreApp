import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/interfaces/product';
import { FakeStoreService } from 'src/app/core/services/fake-store.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fakeStoreServ: FakeStoreService,
    private readonly location: Location
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((value) => {
      this.getProduct(value['id']);
    });
  }

  // get product
  getProduct(id: string) {
    this.fakeStoreServ.getProduct(id).subscribe({
      next: (result: Product | any) => {
        this.product = result;
      },
      error: () => {
        console.log('error');
      },
      complete: () => {},
    });
  }

  // go back

  goBack() {
    this.location.back();
  }
}
