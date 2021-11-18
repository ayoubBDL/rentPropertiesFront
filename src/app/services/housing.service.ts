import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IProperty } from '../property/IProperty.interface';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  getAllProperties(SellRent: number){
    return this.http.get('data/properties.json')
    .pipe(
      map(data => {
        const propertiesArray: Array<IProperty> = [];
        Object.values(data).forEach(element => {
          if(element.SellRent === SellRent){
            propertiesArray.push(element)
          }
        });
        return propertiesArray;
      })
    )
  }
}
