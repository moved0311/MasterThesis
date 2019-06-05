import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class JSONService{
  constructor(private http: Http){}
  datas: any;

  getJsonData(path): Promise<any>{
    return this.http.get(path)
               .toPromise()
               .then(res => res.json())
               .catch(err => console.log(err));
  }
}
