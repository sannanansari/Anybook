import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  search = '';
  book!: any;
  isLoading = true;
  results: any;
  constructor(private fetch: FetchService, private adb: AngularFirestore) {}

  ngOnInit() {
    this.fetch.getHome().subscribe((data: any) => {
      this.book = data;
      console.log(this.book, data);
    });
  }

  searchBook(event: any) {
    console.log(this.search);
    if (this.search !== '')
      this.fetch.getSearchByName(this.search).subscribe((data: any) => {
        this.isLoading = false;
        this.book = data;
      });
    else this.ngOnInit();
  }
}
