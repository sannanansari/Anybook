import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule],
  exports: [ProductComponent],
  entryComponents: [ProductComponent],
})
export class ComponentsModule {}
