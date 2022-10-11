import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor, UsersModule } from '@frontend/users';
import { AppComponent } from './app.component';
import { CatogoriesListComponent } from './pages/categories/catogories-list/catogories-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsFormComponent } from './pages/products/product-form/product-form.component';
import { ProductsListComponent } from './pages/products/product-list/product-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { CategoriesService } from '@frontend/products';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
const UX_MODULE = [
  CardModule,
  ToastModule,
  InputTextModule,
  TableModule,
  ToolbarModule,
  ButtonModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  DropdownModule,
  InputTextareaModule,
  InputSwitchModule,
  EditorModule,
  TagModule,
  InputMaskModule,
  FieldsetModule
];


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ShellComponent,
    DashboardComponent,
   CatogoriesListComponent,
    CategoriesFormComponent,
    ProductsListComponent,
    ProductsFormComponent,
    UsersListComponent ,
    UsersFormComponent,
  OrdersListComponent,
    OrdersDetailComponent
  ],
  imports: [
   BrowserModule,
   StoreModule.forRoot({}),
   EffectsModule.forRoot([]),
   BrowserAnimationsModule,
   HttpClientModule,
   FormsModule,
   ReactiveFormsModule,
  AppRoutingModule,
  UsersModule,
   UX_MODULE
  ],
  providers: [
    CategoriesService,
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'PHP' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
