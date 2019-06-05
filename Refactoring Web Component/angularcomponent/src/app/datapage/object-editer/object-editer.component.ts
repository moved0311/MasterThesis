import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { JSONService } from '../jsonservice.service';

@Component({
  selector: 'app-object-editer',
  templateUrl: './object-editer.component.html',
  styleUrls: ['./object-editer.component.css'],
  providers: [JSONService]
})
export class ObjectEditerComponent implements OnInit, OnChanges {
  data: any = {
    "name":"John",
    "age":30,
    "cars": {
        "car1":"Ford",
        "car2":"BMW",
        "car3":"Fiat"
    }
  };
  dataKeys;
  parseData = [];

  constructor(private jsonService: JSONService) { }
  ngOnInit() {
    this.dataKeys = Object.keys(this.data);
    this.parseJSON(this.data);
  }
  parseJSON(data){
    let keys = Object.keys(data);
    for(let key of keys){
      if(typeof(data[key])!=="object"){
        this.parseData.push({key:key, value:data[key]})
      }else{
        this.parseJSON(data[key]);
      }
    }
  }
  ngOnChanges(){

  }
  close(event){
    var target = event.target || event.srcElement || event.currentTarget;
    $(target).closest('tr').remove();
  }
  add(event){
    let copy = $('.dataRow').closest('tr').clone()[0];
    $(copy).find('input').val("");
    $(copy).find('button').on('click',function(){
      this.closest('tr').remove();
    });
    $('#objectEditor').append(copy);
  }
}