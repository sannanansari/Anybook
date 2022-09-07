import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { book } from '../../interface/book.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  name = '';
  details: book[] = [];
  bookName = '';
  imageName = '';
  star = '';
  detailsBook = '';
  @Input() title: string;
  @Input() value: string;
  constructor(
    private route: ActivatedRoute,
    private fetch: FetchService,
    private global: GlobalService
  ) {
    this.name = route.snapshot.paramMap.get('name');
    console.log(this.name);

    // this.fetch.getDetailBook(this.name).then((data: any) => {
    //   this.details = data;
    //   console.log(this.details);
    // });
  }

  ngOnInit() {
    console.log('Modal page', this.title, this.value);
    console.log(this.title);
    this.fetch.getDetailBook(this.value).then((data: any) => {
      this.details = data[0];
      console.log('details', this.details);
    });
  }

  closeModal() {
    this.global.modalDismiss();
  }
}
