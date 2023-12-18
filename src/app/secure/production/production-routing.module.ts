import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductionComponent } from './production.component';
import { CategorieComponent } from './categorie/categorie.component';

const routes: Routes = [{ path: '', component: ProductionComponent,
   children:[
    {path: 'categorie',component:CategorieComponent}
   ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRoutingModule { }
