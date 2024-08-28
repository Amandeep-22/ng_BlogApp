import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.css'
})
export class SingleCategoryComponent implements OnInit{

    postArry = <any>[];
    categoryobj : any ;
    constructor(private route: ActivatedRoute, private postservice: PostsService) {
      
    }
  ngOnInit(): void {

    this.route.params.subscribe(val=>{
      console.log(val);
      this.categoryobj = val;
      this.postservice.loadCategoryPost(val['id']).subscribe(post=>{
          this.postArry = post;
      })
    })
  }
}
