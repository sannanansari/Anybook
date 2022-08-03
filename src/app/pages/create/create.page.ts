import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/global/global.service';
import { book } from 'src/app/interface/book.interface';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  book: book = {
    title: '',
    image_link: '',
    author: '',
    link: '',
    language: '',
    country: '',
    year: 0,
    pages: 0,
    favorites: false,
  };
  // book: book = {
  //   title: '',
  //   imageLink: '',
  //   author: '',
  //   link: '',
  //   language: '',
  //   country: '',
  //   year: '',
  //   pages: 0,
  //   Favorite: false,
  // };
  save = true;
  id!: any;
  constructor(
    private fetch: FetchService,
    private route: ActivatedRoute,
    private router: Router,
    private global: GlobalService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id', this.id);
    if (this.id == null) this.save = true;
    else {
      this.save = false;
      this.fetch.getBookById(this.id).subscribe((data: any) => {
        this.book = data;
        console.log(this.book);
      });
    }
  }

  saveIt(event: any) {
    console.log(event, this.book);
    this.fetch.postBook(this.book).subscribe((data: any) => {
      console.log(data);
    });
  }

  editIt(event: any) {
    var test = this.global.showAlert('Are You Sure', 'You want to edit', [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Cancel');
        },
      },
      {
        text: 'Ok',
        // role: 'cancel',
        handler: () => {
          console.log('Ok');
          this.fetch.putBookById(this.id, this.book).subscribe((data: any) => {
            console.log(data);
          });
        },
      },
    ]);
    console.log(test);

    // this.router.navigateByUrl('/pages/home');
  }
}
