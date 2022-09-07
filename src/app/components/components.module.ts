import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { AppComponent } from '../app.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule],
  exports: [ProductComponent],
  entryComponents: [ProductComponent],
})
export class ComponentsModule {}
