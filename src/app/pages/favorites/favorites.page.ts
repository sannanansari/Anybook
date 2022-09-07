import { Component, OnInit } from '@angular/core';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { book } from 'src/app/interface/book.interface';
import { FetchService } from 'src/app/services/fetch.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  book: book;
  isLoading = true;
  loadData: book;
  constructor(private fetch: FetchService, private global: GlobalService) {}

  ngOnInit() {
    let datas;
    this.fetch.getFavorites().then((data: any) => {
      this.loadData = data;
      console.log(data);
    });

    setTimeout(() => {
      this.book = this.loadData;
      this.isLoading = false;
    }, 2000);
  }

  async openModal(title: string) {
    const options = {
      component: DetailsComponent,
      swipeToClose: true,
      componentProps: { value: title },
    };
    const showDetails = await this.global.showModal(options);
  }
}
