import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@frontend/products';
import { MessageService } from 'primeng/api';
import { timer, lastValueFrom } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId: string;
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private categoriesService: CategoriesService,
    private location: Location,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff'],
    });

    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return console.log('please fill required fields');
    }
    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value,
    };
    if (this.editMode) {
      this._updateCategry(category);
    } else {
      this._addCategory(category);
    }

    // console.log(this.categoryForm.name.value);
    // console.log(this.categoryForm.icon.value);
  }
  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe({
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category ${category.name} is added`,
        });
        const source$ = timer(2000);
        lastValueFrom(source$).then((done) => {
          this.location.back();
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Categery is not added',
        });
      },
    });
  }
  private _updateCategry(category: Category) {
    this.categoriesService.updateCategory(category).subscribe({
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category ${category.name}  is updated successfully`,
        });
        const source$ = timer(2000);
        lastValueFrom(source$).then((done) => {
          this.location.back();
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Categery is not updated',
        });
      },
    });
  }

  get categoryForm() {
    return this.form.controls;
  }

  private _checkEditMode() {
    this.router.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentCategoryId = params.id;
        this.categoriesService.getCategory(params.id).subscribe((category) => {
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.icon.setValue(category.icon);
          this.categoryForm.color.setValue(category.color);
        });
      }
    });
  }
}
