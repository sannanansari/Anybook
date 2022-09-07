import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { book } from 'src/app/interface/book.interface';
import { FetchService } from 'src/app/services/fetch.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  home: Array<object> = [];
  isLoading = true;
  constructor(
    private fetch: FetchService,
    private global: GlobalService,
    private route: Router
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.fetch.getHome().then((data: any) => {
        this.home = data;
        // data.forEach((element) => {
        //   this.home = element;
        //   // console.log(this.home, data.l);
        //   // this.home.forEach((el: book) => {
        //   // this.fetch.postFavorites(element);
        //   // });
        // });
        this.isLoading = false;
        console.log(data);

        // this.home.forEach((element) => {
        //   // console.log(element);

        //   this.fetch.postBookToSpring(element).subscribe((data: any) => {
        //     console.log(data);

        //   });
        // });
      });
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
