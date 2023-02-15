import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { LoadingComponent } from './loading/loading.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterBookComponent } from './register-book/register-book.component';
import { RouterModule } from '@angular/router';
import { ListBookComponent } from './list-book/list-book.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AlertComponent,
    LoadingComponent,
    NavbarComponent,
    RegisterBookComponent,
    ListBookComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[
    LoadingComponent,
    NavbarComponent,
    RegisterBookComponent,
    ListBookComponent
  ],
})
export class ComponentsModule { }
