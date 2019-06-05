import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

declare var JSAV: any;

@Component({
  selector: 'app-jsavarr',
  templateUrl: './jsavarr.component.html',
  styleUrls: ['./jsavarr.component.css']
})
export class JsavarrComponent implements OnInit,AfterViewInit {
  @Input() datas;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
      var av = new JSAV("container-jsavarr");
      var theArray = this.datas;
      var arr = av.ds.array(theArray, {indexed: false});
      av.displayInit();
    }
}
