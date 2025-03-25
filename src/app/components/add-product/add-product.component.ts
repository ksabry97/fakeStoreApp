import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
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

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  previewUrl: string | ArrayBuffer | null = null;
  imageUploaded: boolean = false;
  ProductForm!: FormGroup;
  @Input() editMode: boolean = false;
  @ViewChild('inputField') inputField!: ElementRef;
  @Output() isOpened = new EventEmitter<boolean>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly fakeStoreServ: FakeStoreService
  ) {
    this.ProductForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
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
        this.ProductForm.patchValue({ image: this.previewUrl });
      };
      reader.readAsDataURL(file);
    }
  }

  // add product
  submitForm() {
    this.fakeStoreServ.addProduct(this.ProductForm.value).subscribe({
      next: (result: any) => {
        console.log(result);
      },
      error: (err) => {},
      complete: () => {},
    });
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
}
