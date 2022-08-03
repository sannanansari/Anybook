import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  book!: any;
  isLoading = true;
  constructor(private fetch: FetchService) {}

  ngOnInit() {
    this.fetch.getHome().subscribe((data: any) => {
      this.book = data;
    });
  }

  doRefresh(event: any) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.book = [];
      this.ngOnInit();
      event.target.complete();
      this.isLoading = false;
    }, 2000);
  }
}
