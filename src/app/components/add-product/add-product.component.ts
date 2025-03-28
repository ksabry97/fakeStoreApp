import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FakeStoreService } from 'src/app/core/services/fake-store.service';
import { Product } from 'src/app/core/interfaces/product';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnChanges {
  previewUrl: string | ArrayBuffer | null = null;
  imageUploaded: boolean = false;
  ProductForm!: FormGroup;
  loading: boolean = false;

  @Input() editMode: boolean = false;
  @Input() productId!: number;
  @ViewChild('inputField') inputField!: ElementRef;
  @Output() isOpened = new EventEmitter<boolean>();
  @Output() productEmitted = new EventEmitter<Product>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly fakeStoreServ: FakeStoreService
  ) {
    this.ProductForm = this.fb.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.minLength(0)]],
      description: [''],
      category: [''],
      image: [''],
    });
  }

  //  open upload image
  openUpload() {
    this.inputField.nativeElement.click();
  }

  // upload image
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imageUploaded = true;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        // this.ProductForm.patchValue({ image: this.previewUrl }); add image to the product submit form
      };
      reader.readAsDataURL(file);
    }
  }

  // add product
  submitForm() {
    this.loading = true;
    if (!this.editMode) {
      this.fakeStoreServ.addProduct(this.ProductForm.value).subscribe({
        next: (result: any) => {
          this.productEmitted.emit(result);
          this.closePopup();
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        },
        complete: () => {},
      });
    } else {
      this.fakeStoreServ
        .updateProduct(this.productId.toString(), this.ProductForm.value)
        .subscribe({
          next: (result: any) => {
            this.productEmitted.emit(result);
            this.closePopup();
            this.loading = false;
          },
          error: (err) => {
            this.loading = false;
          },
          complete: () => {},
        });
    }
  }

  // remove Image
  removeImage() {
    this.imageUploaded = false;
    this.previewUrl = '';
    this.ProductForm.patchValue({ image: this.previewUrl });
  }
  // close popup
  closePopup() {
    this.isOpened.emit(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editMode'] && this.editMode) {
      this.fakeStoreServ.getProduct(this.productId.toString()).subscribe({
        next: (result: Product | any) => {
          this.ProductForm.patchValue(result);
          this.ProductForm.markAllAsTouched();
          if (result?.image) {
            this.imageUploaded = true;
            this.previewUrl = result.image;
          }
        },
        error: () => {
          console.log('error');
        },
        complete: () => {},
      });
    }
  }
}
