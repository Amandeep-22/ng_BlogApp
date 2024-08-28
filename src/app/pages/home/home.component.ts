import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

    featuredPostArray = <any>[];
    latestPostArray = <any>[];
    constructor(private postService: PostsService){

      this.postService.loadFeatured().subscribe(val=>{
        this.featuredPostArray = val;
      })

      this.postService.loadlatest().subscribe(val=>{
        this.latestPostArray = val;
      })
    }
  ngOnInit(): void {
  }

    
}
