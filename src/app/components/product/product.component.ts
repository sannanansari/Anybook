import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actionSheetController } from '@ionic/core';
import { GlobalService } from 'src/app/global/global.service';
import { book } from 'src/app/interface/book.interface';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() book: any[];
  @Input() isLoading: boolean;
  constructor(
    private router: ActivatedRoute,
    private fetch: FetchService,
    private globalService: GlobalService
  ) {
    console.log(router.snapshot.data);
  }

  ngOnInit() {
    setTimeout(() => {
      console.log('book', this.book);
      this.isLoading = false;
    }, 2000);
  }

  expand(event: any, id: number, title: string, data: book) {
    this.globalService.expand(event, id, title, data);
  }

  // addToFavorites(id: number) {
  //   this.fetch.getBookById(id).subscribe((data: any) => {

  //   this.fetch.postFavorites(data[0]).subscribe((data: any) => {
  //     console.log("post",data);
  //   location.reload();

  //   })
  //   })
  // }
}
