import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService} from '@frontend/products'
import { ConfirmationService, MessageService } from 'primeng/api';
import { pipe, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-products-list',
  templateUrl: './product-list.component.html',
  styles: []
})
export class ProductsListComponent implements OnInit,OnDestroy {
  products = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }
  ngOnDestroy() {
    console.log('product destroyed')
    this.endsubs$.next(this.endsubs$);
    this.endsubs$.complete();
  }
  private _getProducts() {
    this.productsService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe((products) => {
      this.products = products;
    });
  }

  updateProduct(productid: string) {
    this.router.navigateByUrl(`products/form/${productid}`);
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe({
          complete: () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is deleted!'
            });
          },
          error:() => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted!'
            });
          }
      }
      );
      }
    });
  }
}
