import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { JSONService } from './jsonservice.service';

@Component({
  selector: 'ng-jsontree',
  template:`
    <tree-view [treeData] = "data" (modify)="modifyHandler($event)"></tree-view>
    <!--  <button type="button" class="btn btn-success" (click)="save()">Save</button> -->
  `,
  providers: [JSONService],
  styles:[`
    button{
      margin-top: 3px;
    }
  `]
})
export class JSONTreeComponent implements OnInit{
  data: any;
  @Input() path;
  updateFlag = false;

  constructor(private jsonService: JSONService){}

  ngOnInit() {
    this.jsonService.getJsonData(this.path).then((res) => {
      this.data = res;
    });
  }
  modifyHandler(e){
    this.updateFlag = e;
  }
  save(){
    this.updateFlag = false;
  }
}
