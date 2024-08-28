import { Injectable } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs: AngularFirestore) { }

  loadFeatured() {

    return this.afs.collection('posts', ref => ref.where('isFeatured', '==', true).limit(4)).snapshotChanges().pipe(

      map(actions => {

        return actions.map(a => {

          const data = a.payload.doc.data();

          const id = a.payload.doc.id;

          return { id, data };
        })
      })
    );
  }

  loadlatest(){

    return this.afs.collection('posts', ref => ref.orderBy('createdAt')).snapshotChanges().pipe(

      map(actions => {

        return actions.map(a => {

          const data = a.payload.doc.data();

          const id = a.payload.doc.id;

          return { id, data };
        })
      })
    );
  }

  loadCategoryPost(categoryid: any){

    return this.afs.collection('posts', ref => ref.where('category.categoryId','==', categoryid)).snapshotChanges().pipe(

      map(actions => {

        return actions.map(a => {

          const data = a.payload.doc.data();

          const id = a.payload.doc.id;

          return { id, data };
        })
      })
    );

  }

  loadOnePost(postid: any){

    return this.afs.doc(`posts/${postid}`).valueChanges();
  }

  loadsimilar(catId: any){

    return this.afs.collection('posts', ref => ref.where('category.categoryId','==', catId).limit(4)).snapshotChanges().pipe(

      map(actions => {

        return actions.map(a => {

          const data = a.payload.doc.data();

          const id = a.payload.doc.id;

          return { id, data };
        })
      })
    );
  }

  countViews(postId: any){

    const viewsCount = {
      views: firebase.firestore.FieldValue.increment(1)
    };
  
    this.afs.doc(`posts/${postId}`).update(viewsCount).then(() => {
      console.log('Views Count Updated..!');
    });
  }
}

