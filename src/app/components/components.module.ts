import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { AppComponent } from '../app.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [ProductComponent, DetailsComponent],
  imports: [CommonModule],
  exports: [ProductComponent, DetailsComponent],
  entryComponents: [ProductComponent, DetailsComponent],
})
export class ComponentsModule {}
