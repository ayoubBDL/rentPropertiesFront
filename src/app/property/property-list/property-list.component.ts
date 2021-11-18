import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit{

  properties: any = [];
  SellRent=1;

  constructor(private route:ActivatedRoute,private housingService:HousingService){}

  ngOnInit():void{
    if(this.route.snapshot.url.toString()){
      this.SellRent = 2 //we are on rent property url
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      data=>{
        this.properties=data;
        console.log(data)
        console.log(this.route.snapshot.url.toString())

      },error =>{
        console.log(error)
      }
    )
  }

}
