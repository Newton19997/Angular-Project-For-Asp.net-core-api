import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';

export class Address{
  // CustomerAddressid: any;
  // Customer_Address: any
   customer_Address: any
   customerId: any
 }
 export class CustomerViewModel {
   Id:any;
   CustomerName: any;
   FatherName: any;
   MotherName: any;
   MaritalStatus: any;
   CountryId: any;
   CustomerAddresss: any;
   Image:any;
 
  
 }
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  title = 'PracticalTestTaskSSE';
  count: number=1
  addres : Address[]
  country:any;
  customerList:any;
  CustomerViewModels:any;
  response:any;
  imageUrl:string="../assets/upimg/images.png";
  fileToUpload :File =null;
  cusID:any;
  customerAddresList:any;
  datav:any;
  newEntry: boolean=true


  
  collapse = false;
  file: any;
  http: any;
  public responses:{dbPath:''};

   hiddenimage: boolean=false;
  constructor( public api: ApiService,) { 
     this.addres= [new Address()];
     this.CustomerViewModels = new CustomerViewModel();
     this.collapse = true;
  }

  ngOnInit() {
    this.api.getdata('Country').subscribe((res: any[]) => {
      this.country= res;
       console.log( this.country)
    });

    this.api.getdata('Customer').subscribe((res: any[]) => {
      this.customerList= res;
     // this.customerList.image=this.responses.dbPath;

       console.log( this.customerList)
    });
    this.reset();
  }



  editOn(customerList,index){

   this.cusID= this.customerList[index].id;
   console.log(this.cusID);
   this.newEntry= false
   this.api.getdata('Customer/' + this.cusID).subscribe((res: any[]) => {
    this.customerAddresList= res;
     console.log( this.customerAddresList)
     this.CustomerViewModels.Id=this.customerAddresList.id;    
     this.CustomerViewModels.CustomerName=this.customerAddresList.customerName;
     this.CustomerViewModels.FatherName=this.customerAddresList.fatherName
     this.CustomerViewModels.MotherName=this.customerAddresList.motherName
     this.CustomerViewModels.MaritalStatus=this.customerAddresList.maritalStatus.toString();
     
     this.CustomerViewModels.CountryId=this.customerAddresList.countryId
    this.CustomerViewModels.Image=this.customerAddresList.image
     //this.CustomerViewModels.Image=this.responses.dbPath;
     this.addres=this.customerAddresList.customerAddresss;
     
     this.hiddenimage=true;
     
     console.log(this.addres);
     console.log('this.addres');
     console.log(this.CustomerViewModels.Image);

  });

  }

  deleteKeys(masterData,index){
    this.addres.splice(index,1)
  }
  
  addRow()
  {
    console.log(this.addres)
    for(let i=0; i<this.count; i++) { 
       this.addres[this.addres.length]=new Address()
      }
    this.count=1
  }

  // addRow()
  // {
  // for(let i=0; i < this.count; i++) {

  //   const newBreakDownDetails:Address = {...this.addres[0]};
  //   console.log(newBreakDownDetails);
  //  delete newBreakDownDetails.CustomerAddressid;
  //  console.log(this.addres);
  //   this.addres.push(newBreakDownDetails);
  //  // this.dozens.push(this.dozens[0]);
  // }
  // //this.count=1
  // }
/*
  Save() { 
   
    console.log(this.CustomerViewModels);
    console.log(this.addres);
    this.CustomerViewModels.CustomerAddresss=this.addres;
    //this.CustomerViewModels.Image=this.fileToUpload;
    //this.api.postdatafor('Customer', this.CustomerViewModels,this.fileToUpload ).subscribe((res: any) =>{
      this.api.postdatafor('Customer', this.CustomerViewModels,this.CustomerViewModels).subscribe((res: any) =>{
      this.response = res;
    //  console.log(res);
     //this.prod1.iid=res.iid ; 
     //this.prod1.cid=res.cid;
     // console.log('iid '+ this.prod1.iid)
    
         this.ngOnInit()
     
    }, err => {
     // this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
   // this.get();
  }
*/


  Save() { 
   
    console.log(this.CustomerViewModels);
    console.log(this.addres);
    this.CustomerViewModels.CustomerAddresss=this.addres;
    this.CustomerViewModels.Image=this.responses.dbPath;
    this.api.postdata('Customer', this.CustomerViewModels).subscribe((res: any) =>{
     // this.api.postdatafor('Customer', this.CustomerViewModels,this.CustomerViewModels).subscribe((res: any) =>{
      this.response = res;
      this.reset();
    //  console.log(res);
     //this.prod1.iid=res.iid ; 
     //this.prod1.cid=res.cid;
     // console.log('iid '+ this.prod1.iid)
    
         this.ngOnInit()
     
    }, err => {
     // this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
   // this.get();
  }

  
  Edit(){  
    console.log(this.CustomerViewModels);
    console.log(this.addres);
    this.CustomerViewModels.CustomerAddresss=this.addres;
    if(this.hiddenimage=true){
      this.CustomerViewModels.Image=this.responses.dbPath;
    }
   
    this.api.putdata('Customer',this.CustomerViewModels.Id, this.CustomerViewModels).subscribe((res: any) =>{
      this.response = res;
      this.newEntry=true;
      this.reset();
      this.ngOnInit();
    }, err => {
     // this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  
  }
   
  deleteData() {  
    console.log(this.CustomerViewModels);
    console.log(this.addres);
    this.CustomerViewModels.CustomerAddresss=this.addres;
    this.api.deletedata('Customer',this.CustomerViewModels.Id).subscribe((res: any) => {  
      this.datav = res;  
      //this.getdata(); 
      this.newEntry=true;
      this.reset();
      this.ngOnInit() 
    },err => {
      // this.api.showFailureToast('Error', err.message);
       console.log(err);
     }) ;
  } 
  

  fileChanged(e) {
    this.file = e.target.files[0];
    console.log(this.file)
  }
  
  uploadFilenewton(files: FileList) {
    this.collapse = true;
    console.log('image');
  
    this.fileToUpload = files.item(0);
    //Show image preview
  var reader =new FileReader();
  reader.onload=(event:any)=>{
    this.imageUrl =event.target.result;
   // console.log(this.imageUrl)
  }
  reader.readAsDataURL(this.fileToUpload)
   
  }

  public onUploadFinished=(event)=>{
    this.responses=event;
  }

  public createImgPath=(serverPath:string)=>{
    return `https://localhost:44362/${serverPath}`;
    //console.log(`https://localhost:44362/${serverPath}`)
  }

  reset(){
    this.CustomerViewModels.Id=null;
    this.CustomerViewModels.CustomerName=null;
    this.CustomerViewModels.FatherName=null;
    this.CustomerViewModels.MotherName=null;
    this.CustomerViewModels.MaritalStatus=null;
    this.CustomerViewModels.CountryId=null;
    this.addres=[];
    this.CustomerViewModels.Image=null;
    this.addres= [new Address()];
    this.hiddenimage=false;
    this.newEntry=true;
  }

}
