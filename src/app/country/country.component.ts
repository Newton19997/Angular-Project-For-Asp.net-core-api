import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
export class Country{ 
  Id: any; 
  CountryName: any;  
 }
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  country:any;
  response:any;

  constructor(public api: ApiService,) {
    this.country = new Country();
   }

  ngOnInit(): void {
  }


  Save(){    
  
    // console.log(this.CustomerViewModels);
    // console.log(this.addres);
    // this.CustomerViewModels.CustomerAddresss=this.addres;
    this.api.postdata('Country', this.country).subscribe((res: any) =>{
      this.response = res;
      console.log(this.response);  
    }, err => {
     // this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
   // this.get();
  }
}
