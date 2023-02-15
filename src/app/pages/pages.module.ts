import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { BooksComponent } from './books/books.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentsModule } from '../components/components.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterNamePipe } from '../pipes/filter-name.pipe';
import { ClientsComponent } from './clients/clients.component';
import { SectionBookComponent } from './section-book/section-book.component';


@NgModule({
  declarations: [
    DashboardComponent,
    BooksComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundPageComponent,
    ClientsComponent,
    SectionBookComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    FilterNamePipe
  ]
})
export class PagesModule { }
