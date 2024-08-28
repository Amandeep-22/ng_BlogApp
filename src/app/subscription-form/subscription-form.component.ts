import { Component, OnInit } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.css'
})
export class SubscriptionFormComponent implements OnInit{

  constructor(private subservice: SubscribersService){}

  ngOnInit(): void {
  }

  onSubmit(formValue: any)
  {
    console.log(formValue);
    const subData: Sub = {
      name: formValue.name,
      email: formValue.email
    };
    //this.subservice.addSubs(subData);
    this.subservice.checkSubs(formValue.email).subscribe(val=>{
      console.log(val);
      if(val.empty)
      {
        this.subservice.addSubs(subData);
      }
      else{
        console.log("Email address is already in use!!")
      }
    });
  }

}
