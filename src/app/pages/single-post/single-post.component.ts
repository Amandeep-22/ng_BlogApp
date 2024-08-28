import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent implements OnInit{

  postdata : any;
  similarPostArray = <any>[];
  constructor(private route : ActivatedRoute,private postservice : PostsService ){}

  ngOnInit(): void {
    this.route.params.subscribe(val=>{

        this.postservice.countViews(val['id']);

        this.postservice.loadOnePost(val['id']).subscribe(post=>{
          console.log(post);
          this.postdata = post;
          this.loadsimilarPost(this.postdata.category.categoryId);
        });
    })
  }

  loadsimilarPost(catId: any){
    this.postservice.loadsimilar(catId).subscribe(val=>{
      this.similarPostArray = val;
    });
  }

}
