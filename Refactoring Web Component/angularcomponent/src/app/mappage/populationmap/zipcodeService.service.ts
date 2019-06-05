import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ZipCodeService{
  constructor(private http: Http){}
  datas: any;

  getJsonData(path): Promise<any>{
    return this.http.get(path) //"/assets/populations.json"
               .toPromise()
               .then(res => res.json())
               .catch(err => console.log(err));
  }
}
