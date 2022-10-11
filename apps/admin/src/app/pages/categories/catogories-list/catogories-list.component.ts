import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@frontend/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'admin-catogories-list',
  templateUrl: './catogories-list.component.html',
  styles: [],
})
export class CatogoriesListComponent implements OnInit,OnDestroy {
  categories: Category[] = [];
  endsubs$: Subject<any> = new Subject();
  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    console.log('categories destroyed')
    this.endsubs$.next(this.endsubs$);
    this.endsubs$.complete();

  }

  ngOnInit(): void {
    this._getCategoriess();

  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe({
          complete: () => {
            this._getCategoriess();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category  is deleted!',
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Categery is not deleted',
            });
          },
        });
      },
      reject: (type) => {},
    });
  }
  private _getCategoriess() {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((cats) => {
        this.categories = cats;
      });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }
}
