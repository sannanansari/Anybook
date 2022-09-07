import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { book } from '../interface/book.interface';
import { switchMap, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FetchService {
  constructor(private http: HttpClient, private adb: AngularFirestore) {}

  async getHome() {
    let userDoc = this.adb.firestore.collection(`books`);
    let allBooks = [];
    let count = 1;
    await userDoc.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // this.adb.collection("books").doc(doc.id).update({id:count})
        // count++;
        allBooks.push(doc.data());
        // doc.data().update({id:count})
        // console.log(doc.id, "=>", doc.data(),doc.data()['id'],count);
      });
    });
    // let id = this.adb.collection("collection_name").doc().get();
    // db.collection("collection_name").document(id).set(object);
    // const getData = await this.adb
    //   .collection('books')
    //   .get()
    //   .pipe(
    //     switchMap(async (data) => {
    //       let books = await data.docs.map((element) => {
    //         const item = element.data;
    //         console.log(item, element);
    //         return item;
    //       });
    //       return getData;
    //     })
    //   );
    // console.log(getData);

    return allBooks;
    // return this.http.get(`http://localhost:8080/getBooks`, {
    //   headers: { Authorization: localStorage.getItem('token') },
    // });
  }

  async getProfile(user: number) {
    // return this.http.get(`http://localhost:3000/profile?id=${user}`);
    const uid = localStorage.getItem('uid');
    const getData = await (
      await this.adb.collection('users').doc(uid).get().toPromise()
    ).data();
    return getData;
    // return this.http.get(`http://localhost:8080/profile/${user}`);
  }

  async postProfile(data) {
    const getData = await await this.adb
      .collection('users')
      .doc(data.uid)
      .update(data);
    // console.log(data.id, `http://localhost:8080/profile/${data.id}`);

    // return this.http.put(`http://localhost:8080/profile/${data.id}`, data);
  }

  getSearch() {
    return this.http.get(`http://localhost:3000/books`);
  }

  getSearchByName(name: string) {
    // Observable.c
    const searchBooks = this.adb
      .collection('books', (ref) => ref.orderBy('title').startAt(name))
      .valueChanges();
    console.log(searchBooks);
    searchBooks.subscribe((data) => console.log(data));
    return searchBooks;
    // return this.http.get(`http://localhost:3000/books?title_like=${name}`)
    // return this.http.get(`http://localhost:8080/getBookByTitle/${name}`);
  }

  async getBookById(id: any) {
    let results;
    id = parseInt(id);
    await this.adb
      .collection('books', (ref) => ref.where('id', '==', id))
      .get()
      .toPromise()
      .then(function (querySnapshot) {
        console.log('SnapShot', querySnapshot);

        querySnapshot.forEach(function (doc) {
          console.log(doc.id, ' => ', doc.data());
          // uid = doc.id;
          results = doc.data();
        });
      });
    return results;
    // return this.http.get(`http://localhost:8080/getBook/${id}`);
    // return this.http.get(`http://localhost:3000/books?id=${id}`);
  }

  async putBookById(id: any, data: book) {
    let uid;
    id = parseInt(id);
    await this.adb
      .collection('books', (ref) => ref.where('id', '==', id))
      .get()
      .toPromise()
      .then(function (querySnapshot) {
        console.log('SnapShot', querySnapshot);

        querySnapshot.forEach(function (doc) {
          console.log(doc.id, ' => ', doc.data());
          uid = doc.id;
          //  results = doc.data();
        });
      });
    const getData = await this.adb.collection('books').doc(uid).set(data);
    return getData;
    // return this.http.put(`http://localhost:8080/putBook/${id}`, data);
  }

  async getDetailBook(name: string) {
    let bookData;
    await this.adb
      .collection('books', (ref) => ref.where('title', '==', name))
      .get()
      .toPromise()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, ' => ', doc.data());
          bookData = doc.data();
        });
      });
    console.log('value', name, bookData);
    return bookData;
    return this.http.get(`http://localhost:3000/books?title_like=${name}`);
    // return this.http.get(`http://localhost:8080/getBookByTitle/${name}`);
  }

  async postBook(data: book) {
    const getData = await await this.adb.collection('books').doc().set(data);
    return getData;
    return this.http.post(`http://localhost:3000/books`, data);
    // return this.http.post(`http://localhost:8080/postBooks`, data);
  }

  async getFavorites() {
    let favoriteBooks = [];
    await this.adb
      .collection('books', (ref) =>
        ref.where('Favorite', 'array-contains', localStorage.getItem('uid'))
      )
      .get()
      .toPromise()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          favoriteBooks.push(doc.data());
          console.log(doc.id, ' => ', doc.data());
          // bookData = doc.data()
        });
      });
    return favoriteBooks;
    // return this.http.get(`http://localhost:8080/getFavorites`);
    // return this.http.get(`http://localhost:3000/Favorites`)
  }

  async postFavorites(data: book, u_id: string) {
    console.log(data, u_id);
    let uid;
    let bookData;
    await this.adb
      .collection('books', (ref) => ref.where('id', '==', data.id))
      .get()
      .toPromise()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, ' => ', doc.data());
          uid = doc.id;
          bookData = doc.data()['Favorite'];
        });
      });
    console.log(uid, bookData, bookData.indexOf(u_id));
    if (bookData.indexOf(u_id) == -1) {
      console.log('Present');
      bookData.push(u_id);
      await this.adb
        .collection('books')
        .doc(uid)
        .update({ Favorite: bookData });
    }
    // return this.http.put(`http://localhost:8080/putFavorites/${data.id}`, null);
  }

  async deleteBooks(id: any) {
    let query = await this.adb.collection('books', (ref) =>
      ref.where('id', '==', id)
    );
    await query
      .get()
      .toPromise()
      .then(function (query_func) {
        query_func.forEach((el) => {
          el.ref.delete();
        });
      });
    // return this.http.delete(`http://localhost:3000/books/${id}`);
  }

  postBookToSpring(element: any) {
    return this.http.post(`http://localhost:8080/postBooks`, element);
  }
}
