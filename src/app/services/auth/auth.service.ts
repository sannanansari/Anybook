import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  id = localStorage.getItem("id");
  constructor(private fireAuth: AngularFireAuth,private adb: AngularFirestore) { }

  async getID() {
    console.log("get ID ",localStorage.getItem("id"));
    this.id = localStorage.getItem("id");
    return await this.id
  }

  async register(form) {
    try{
      const registerUser = await this.fireAuth.createUserWithEmailAndPassword(form.email,form.password)
      // console.log(registerUser);
      const data = {
        uid: registerUser.user.uid,
        email: form.email,
        phone: form.phone,
        gender: form.gender,
        type: 'user',
        status: 'active'
      }
      await this.adb.collection('users').doc(registerUser.user.uid).set(data);      
    }
    catch(e) {}
  }

  async login(email: string,password: string): Promise<any> {
    localStorage.removeItem('id')
    const check = await this.fireAuth.signInWithEmailAndPassword(email,password)
    const getData = await  ( await this.adb.collection('users').doc(check.user.uid).get().toPromise()).data();
    const type = getData['type'];
    localStorage.setItem("uid",check.user.uid)
    if(type == "user"){
    localStorage.setItem("id","user")
      return await this.getID();
    } else {
      localStorage.setItem("id","admin")
      return await this.getID();
    }
    return await false;
    }

    async forgot(email: string) {
    await this.fireAuth.sendPasswordResetEmail(email)
      // })
    }
}
