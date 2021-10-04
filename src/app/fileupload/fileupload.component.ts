import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  public message:string;
  public progress:number;
  @Output() public onUploadFinished=new EventEmitter();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }



  public uploadFile=(files)=>{
    if(files.length===0)
    return;
    let fileToUpload=<File>files[0];
    const formDate=new FormData();
    formDate.append('file',fileToUpload,fileToUpload.name);

    this.http.post('https://localhost:44362/api/uploadfile',formDate,{reportProgress:true, observe:'events'})
    .subscribe(event=>{
if(event.type=== HttpEventType.UploadProgress){
  this.progress=Math.round(100*event.loaded/event.total);

}
else if(event.type===HttpEventType.Response){
  this.message='Upload success.';
  this.onUploadFinished.emit(event.body);
}
    });
  }
}
