
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionRoutingModule } from './production-routing.module';
import { ProductionComponent } from './production.component';
import { CategorieComponent } from './categorie/categorie.component';
import { CategorieService } from '../shared/services/categorie.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductionComponent,
    CategorieComponent
  ],
  imports: [
    CommonModule,
    ProductionRoutingModule,
    FormsModule
   // HttpClientModule
  ],
  providers: [
    CategorieService
  ]
})
export class ProductionModule {
}
