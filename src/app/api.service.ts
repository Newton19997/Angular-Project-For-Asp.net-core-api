import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { environment } from './../environments/environment';
declare var $: any;
import { DomSanitizer } from "@angular/platform-browser";
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // public baseUrl = 'http://117.58.243.13:3000/api/';
  // public baseUrl = 'http://192.168.12.5:3500/api/';
  // public baseUrl = 'http://192.168.13.3:3000/api/';
  // public baseUrl = 'http://182.160.126.149:3000/api/';
  public baseUrl = 'https://localhost:3000/api/';
  noImagePath = 'assets/data.png';
  imageNotFound = 'assets/imagenotfound.png';
  localUrl = 'assets/employees';
  // baseUrl: string;
  buyermodeUser = 'Admin';
  cutting = [
    // {name: '' , value: 0},
    { name: 'Please Select', value: 0 },
    { name: 'Polar', value: 1 },
    { name: 'Die', value: 2 },
    { name: 'Polar + Die', value: 3 },
  ];

  blockStatus = [
    { name: 'Damaged', value: 1 },
    { name: 'Running', value: 2 },
  ]
  version = [
    { name: '1.0', value: 1 },
    { name: '2.0', value: 2 },
    { name: '3.0', value: 3 },
  ]
  glueing = [
    // {name: '' , value: 0},
    { name: 'No', value: 0 },
    { name: 'Manual', value: 1 },
    { name: 'Machine', value: 2 }];
  thermal = [
    // {name: '' , value: 0},
    { name: 'Gloss', value: 1 },
    { name: 'Matt', value: 2 }
  ];
  coldglue = [
    // {name: '' , value: 0},
    { name: 'Gloss', value: 1 },
    { name: 'Matt', value: 2 }
  ];
  lamination = [
    { name: 'No', value: 0 },
    { name: 'Hot', value: 1 },
    { name: 'Cold/Glue', value: 2 }
  ];

  working_type = [
    // {name: '', value: 0},
    { name: 'Satin', value: 1 },
    { name: 'Taffeta', value: 2 },
  ];
  part_no = [
    { name: '1', value: 1 },
    // { name: '1' , value: 2},
  ];
  fabrics = [
    { name: '4inch', value: 1 },
    { name: '8inch', value: 2 },
  ];
  options = [
    { name: 'Yes', value: 1 },
    // {name: '' , value: 0},
    { name: 'No', value: 2 },
    { name: 'Not Applicable', value: 3 }
  ];
  pistatus = [
    { name: 'Please Select', value: 0 },
    { name: 'Yes', value: 1 },
    { name: 'No', value: 2 }
  ];
  denier_Value = [
    { name: '50', value: '50' },
    { name: '75', value: '75' },
    { name: '90', value: '90' },
    { name: '100', value: '100' },
  ];
  // unit = [
  //   {name: 'pcs', value: 30710},
  //   {name: 'yard', value: 30734},
  //   {name: 'mtr', value: 30711},
  // ];
  orderType = [
    { name: 'Please Select', value: 0 },
    { name: 'InHouse', value: 1 },
    { name: 'Sub Contact', value: 3 },
  ]
  foldtype = [
    { name: 'No', value: 0 },
    { name: 'Yes', value: 1 }
  ];
  printside = [
    { name: 'One side ', value: 0 },
    { name: 'Double side', value: 1 }
  ];
  WOoptions = [
    // {name: '' , value: 0},
    { name: 'No', value: 0 },
    { name: 'Yes', value: 1 }
  ];
  FOCreason = [
    { name: 'Excess wastage in Production', value: 1 },
    { name: 'FOC requested by Customer', value: 2 },
    { name: 'Rejected by Customer', value: 3 },
    { name: 'Short QTY claimed by Customer', value: 4 }
  ];

  searchpitype = [
    { name: 'Payment No', value: 1 },
    { name: 'Normal PI No', value: 2 },
    { name: 'Master PI No', value: 3 },
    { name: 'Old PI No', value: 4 },
    { name: 'TT/FDD No', value: 5 }
  ];

  attStatus: any;
  payrollFreq: any;
  salaryType: any;
  unit: any;
  employeehistory: any;
  imageToShow: any;
  logo: any;


  constructor(public http: HttpClient, private myRoute: Router, private _location: Location, public datePipe: DatePipe, public sanitizer: DomSanitizer) {
    this.baseUrl = environment.api;
  }

  login(username: string, pass: string): Observable<any[]> {
    return this.http.get<any[]>('http://192.168.13.3:8000/api/login?LoginID=' + username + '&Password=' + pass);
    // return this.http.get<any[]>('http://202.74.243.119:8000/api/login?LoginID=' + username + '&Password=' + pass);
  }
  fetchData(url): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + url);
  }
  fetchDataById(url, id): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + url + '/' + id);
  }
  getDataFromServer(url): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + url).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

      errorMessage = `An error occurred: ${err.error.message}`;
    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  checkPermission(page: string, list: string): boolean {
    const pageList: string[] = JSON.parse(sessionStorage.getItem(list));
    return pageList.includes(page);
  }
  getUnit() {
    this.getdata('LOVs?filter[where][lovtype]=SampleUnit').subscribe((resp: any) => {
      this.unit = resp;
    });
  }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';


  backClicked() {
    this._location.back();
  }

  getdata(url) {
    const getUrl = this.baseUrl + url;
    return this.http.get(getUrl);
  }

  getdataByid(url, id) {
    const getUrl = this.baseUrl + url + '/' + id;
    return this.http.get(getUrl);
  }

  numberOnly(event: KeyboardEvent) {
    var cntrlKey = event.ctrlKey;
    let key = event.key;
    if (cntrlKey) {
      if (key !== 'v') event.preventDefault();
    }
    else {
      const number = Number.parseInt(event.key);
      if (!number && key !== '.' && key !== 'Backspace' && key !== '0') event.preventDefault();
    }
    cntrlKey = false;
    key = '';
  }


  numberOnlyTab(event: KeyboardEvent) {
    const number = Number.parseInt(event.key);
    if (!number && event.key !== '.' && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== '0') {
      event.preventDefault();
    }
  }


  postdatafor(url, data, fileToUpload:File) {
    console.log(JSON.stringify(data));
    const postUrl = this.baseUrl + url;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
   this.uploadFile1(url,fileToUpload);
    return this.http.post(postUrl, data);

   

  }

 //saveimage

 uploadFile1(url,fileToUpload: File) {
      const postUrl = this.baseUrl + url;
  const data: FormData = new FormData();
 // if (!filename) { filename = fileToUpload.name; }
  data.append('Image', fileToUpload, fileToUpload.name);
 // const postUrl = this.baseUrl + 'fileuploads/' + folderName + '/upload';
  return this.http.post(postUrl, data);
}

//end


  postdata(url, data) {
    console.log(JSON.stringify(data));

    const postUrl = this.baseUrl + url;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.post(postUrl, data);
  }
  // putdata(url, data) {
  //   console.log(JSON.stringify(data));
  //   const putUrl = this.baseUrl + url;
  //   const headers = new Headers();
  //   headers.append('Accept', 'application/json');
  //   headers.append('Content-Type', 'application/json');

  //   return this.http.put(putUrl, data);
  // }



  putdata(url,Id, data) {

    console.log(url)
    console.log(data)
   console.log(JSON.stringify(data));
    const putUrl = this.baseUrl + url;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.put(putUrl+'/'+Id,data);
  }

  // putData(id,formData){  
  //   return this.http.put('/api/Employee/'+id,formData);  
  // }  


  patchdata(url, data) {
    console.log(JSON.stringify(data));
    const updateUrl = this.baseUrl + url;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.patch(updateUrl, data);
  }
  deletedata(url,id) {
   // console.log(JSON.stringify(data));
    const deleteUrl = this.baseUrl + url ;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.delete(deleteUrl+'/'+id);
  }

  // deleteData(id){  
  //   return this.http.delete('/api/Employee/'+id);  
  // } 

  // deletedata(url, id) {
  //   const deleteUrl = this.baseUrl + url + '/' + id;
  //   const headers = new Headers();
  //   headers.append('Accept', 'application/json');
  //   headers.append('Content-Type', 'application/json');

  //   return this.http.delete(deleteUrl);
  // }


  uploadFile(folderName, fileToUpload: File, filename: string = null) {
    const data: FormData = new FormData();
    if (!filename) { filename = fileToUpload.name; }
    data.append('file', fileToUpload, filename);
    const postUrl = this.baseUrl + 'fileuploads/' + folderName + '/upload';
    return this.http.post(postUrl, data);
  }

  uploadFileInLocal(folderName, fileToUpload: File) {
    const data: FormData = new FormData();
    data.append('file', fileToUpload, fileToUpload.name);
    const postUrl = 'assets/' + folderName;
    return this.http.post(postUrl, data);
  }

  toExportFileName(fileName: string, type: string): string {
    return `${fileName}_` + new Date().toLocaleDateString() + `.${type}`;
  }
  createImageFromBlob(image: Blob,) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
      // this.emp.DSG = this.imageToShow;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
  createImageFromBlob1(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.logo = reader.result;
      // this.emp.DSG = this.imageToShow;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
  //   getDataOnScroll(url, batch, lastKey?) {
  // let query = {
  //   orderByKey: true,
  //   limitToFirst: batch
  // }
  // if (lastKey) query['startAt'] = lastKey
  //     const getUrl = this.baseUrl + url;
  //     return this.http.get(getUrl);
  //   }
  formatDate1(date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
  formatDate(date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  formatDateMedium(date): string {
    return this.datePipe.transform(date, 'medium');
  }
  getBlobThumbnail(url): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.get<Blob>(this.baseUrl + url,
      { headers: headers, responseType: 'blob' as 'json' });
  }
  // getImage(imageUrl: string): Observable<File> {
  //   return this.http.get<Blob>(this.baseUrl +imageUrl,
  //       {headers: headers, responseType: 'blob' as 'json' });
  // }
 
  BlobToImage(blobData,) {
    let array = new Uint8Array(blobData);
    const char = array.reduce((data, byte) => { return data + String.fromCharCode(byte); }, '');
    let base64String = btoa(char);
    let imageurl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + base64String);
  }
  //  printEmployeeHistory = id => {
  //   this.getdata('employee-profiles/EmployeeHistoryReport?cardno=' + id).subscribe((res: any) => {
  //         this.employeehistory = res;
  //         console.log(this.employeehistory);
  //       }, error2 => {console.log(error2); }
  //   );
  // }


  exportValidations(frompage, topage, totalPageCount) {
    let isError = false;
    if (topage > totalPageCount) {
      this.showWarningToast('To Page cannot be greater than Total Pages', '');
      isError = true;
    }
    if (frompage < 1) {
      this.showWarningToast('From Page cannot be less than 1', '');
      isError = true;
    }
    if (topage < 1) {
      this.showWarningToast('To Page cannot be less than 1', '');
      isError = true;
    }
    if (topage < frompage) {
      this.showWarningToast('From Page cannot be greater than To Page', '');
      isError = true;
    }
    if (topage - frompage > 10) {
      this.showWarningToast('Range is too large(>10)', '');
      isError = true;
    }
    return isError;
  }

  showSuccessToast(title = '', message = '') {
    this.uiAlert({
      textHead: title,
      text: message,
      bgcolor: '#097a06',
      textcolor: '#fff',
      position: 'top-right',
      icon: 'checkmark box',
      time: 2,
    });
  }
  showInfoToast(title = '', message = '') {
    this.uiAlert({
      textHead: title,
      text: message,
      bgcolor: '#55a9ee',
      textcolor: '#fff', // color
      position: 'top-right', // position . top And bottom ||  left / center / right
      icon: 'info circle', // icon in semantic-UI
      time: 2,
    });
  }
  showResetToast(title = '', message = '') {
    this.uiAlert({
      textHead: title,
      text: message,
      bgcolor: '#55a9ee',
      textcolor: '#fff', // color
      position: 'top-right', // position . top And bottom ||  left / center / right
      icon: 'checkmark circle', // icon in semantic-UI
      time: 1,
    });
  }
  showWarningToast(title = '', message = '') {
    this.uiAlert({
      textHead: title,
      text: message,
      bgcolor: '#f36712',
      textcolor: '#fff', // color
      position: 'top-right', // position . top And bottom ||  left / center / right
      icon: 'warning sign', // icon in semantic-UI
      time: 2,
    });
  }

  showFailureToast(title = '', message = '') {
    this.uiAlert({
      textHead: title, // header
      text: message, // Text
      bgcolor: '#DB2828',
      textcolor: '#fff', // color
      position: 'top-right', // position . top And bottom ||  left / center / right
      icon: 'remove circle', // icon in semantic-UI
      time: 4, // time
    });
  }
  showDeleteToast(title = '', message = '') {
    this.uiAlert({
      textHead: title, // header
      text: message, // Text
      bgcolor: '#DB2828',
      textcolor: '#fff', // color
      position: 'top-right', // position . top And bottom ||  left / center / right
      icon: 'checkmark box', // icon in semantic-UI
      time: 2, // time
    });
  }
  showRefreshToast(title = '', message = '') {
    this.uiAlert({
      textHead: title,
      text: message,
      bgcolor: '#00B4AB',
      textcolor: '#fff', // color
      position: 'top-right', // position . top And bottom ||  left / center / right
      icon: 'checkmark box', // icon in semantic-UI
      time: 2,
    });
  }


  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'comp');
  }

  getTime(dateTime: string): string {
    let hour = Number.parseInt(dateTime.substring(11, 13));
    const min = Number.parseInt(dateTime.substring(14, 16));
    let day = 'AM';
    let minutePrefix: string;
    min < 10 ? minutePrefix = '0' : minutePrefix = '';

    if (hour > 11) day = 'PM';
    if (hour > 12) hour -= 12;

    return hour + ':' + minutePrefix + min + ' ' + day;
  }

  uiAlert(options) {
    var setUI = $.extend({
      textHead: 'Your user registration was successful.',
      text: 'You may now log-in with the username you have chosen',
      textcolor: '#19c3aa',
      bgcolors: '#fff',
      position: 'top-right',
      icon: '',
      time: 5,
      permanent: false
    }, options);

    var ui_alert = 'ui-alert-content';
    ui_alert += '-' + setUI.position;
    setUI.bgcolors = 'style="background-color: ' + setUI.bgcolor + ';   box-shadow: 0 0 0 1px rgba(255,255,255,.5) inset,0 0 0 0 transparent;"';
    if (setUI.bgcolors === '') setUI.bgcolors = 'style="background-color: ; box-shadow: 0 0 0 1px rgba(255,255,255,.5) inset,0 0 0 0 transparent;"';
    if (!$('body > .' + ui_alert).length) {
      $('body').append('<div class="ui-alert-content ' + ui_alert + '" style="width: inherit;"></div>');
    }
    var message = $('<div id="messages" class="ui icon message" ' + setUI.bgcolors + '><i class="' + setUI.icon + ' icon" style="color: ' + setUI.textcolor + ';"></i><i class="close icon" style="color: ' + setUI.textcolor + ';" id="messageclose"></i><div style="color: ' + setUI.textcolor + '; margin-right: 10px;">   <div class="header">' + setUI.textHead + '</div>  <p> ' + setUI.text + '</p></div>  </div>');
    $('.' + ui_alert).prepend(message);
    message.animate({
      opacity: '1',
    }, 300);
    if (setUI.permanent === false) {
      var timer: any = 0;
      $(message).mouseenter(function () {
        clearTimeout(timer);
      }).mouseleave(function () {
        uiAlertHide();
      });
      uiAlertHide();
    }
    function uiAlertHide() {
      timer = setTimeout(function () {
        message.animate({
          opacity: '0',
        }, 300, function () {
          message.remove();
        });
      }, (setUI.time * 1000));
    }

    $('#messageclose')
      .on('click', function () {
        $(this)
          .closest('#messages')
          .transition('fade')
          ;
      })
      ;

  };

  binType = [
    { name: 'Product Category Wise Bin', value: 1 },
    { name: 'Store Wise Bin', value: 2 },
  ];


  generatePDFArray(data: any[], sumColumns: string[]): string[][] {
    // const headings = ['SL'].concat(Object.keys(data[0]).filter((heading: string) => heading != 'Department'));
    const headings = ['SL'].concat(Object.keys(data[0]));
    const pdfData = [headings];
    const sumIndex: number[] = [];
    let currentSerial = 1;

    headings.forEach((column: string, index: number) => {
      if (sumColumns.includes(column)) sumIndex.push(index);
    });
    let grandTotalRow: any[] = this.createTotalRow(headings.length, sumIndex, 'Grand Total');

    data.forEach((e: any, index: number) => {
      const currentRow = headings.map((heading: string) => {
        if (heading == 'SL') return currentSerial;
        else return e[heading];
      });

      sumIndex.forEach((index: number) => {
        grandTotalRow[index] += currentRow[index];
      });

      pdfData.push(currentRow);
      currentSerial++;
    });

    pdfData.push(grandTotalRow);
    return pdfData;
  }

  createTotalRow(length: number, zeroIndexes: number[], title: string): string[] {
    const row: any[] = ['', title].concat(new Array(length - 2).fill(''));
    zeroIndexes.forEach((index: number) => row[index] = 0);
    return row;
  }

  lcTTRQ = [
    { name: 'LC', value: 1 },
    { name: 'TT', value: 2 },
    { name: 'RQ', value: 3 },
  ];

  CoMMID = [
    { name: 'Details', value: 1 },
    { name: 'Summary', value: 2 },
    { name: 'Due List', value: 3 },
    { name: 'Order Status', value: 4 },
  ];


}
