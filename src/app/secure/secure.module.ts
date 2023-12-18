import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecureRoutingModule } from './secure-routing.module';
import { SecureComponent } from './secure.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    SecureComponent
  ],
  imports: [
    CommonModule,
    SecureRoutingModule,
   // HttpClientModule
  ]
})
export class SecureModule { }
