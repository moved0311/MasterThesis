import { Component, Input, AfterViewInit, OnChanges, Output, EventEmitter, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'tree-view',
  template:`
  <table  id="customers">
    <tr>
      <th *ngFor="let h of header">{{h}}</th>
    </tr>
    <tr *ngFor="let row of arrData" class="header{{row.layer}}">
      <td *ngFor="let h of header; index as i" (click)="layerToggle($event)">      
      <!--<span *ngIf="row.last && i==0" class="sign" class="layer{{row.layer}}">-</span> -->
          <span *ngIf="i==0 && row.last; else another" class="sign" class="layer{{row.layer}}">-</span>
          <ng-template #another>
            <span *ngIf="i==0" class="layer{{row.layer}}"></span>
          </ng-template>
        {{row[h]}}
      </td>
    </tr>
  </table>
  `,
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnChanges, OnInit{
  @Input() treeData;
  @Output() modify = new EventEmitter();
  modifyFlag = false;
  arrData:any = [];
  layer = 0;
  header = [];
  ngOnInit(){
  }
  ngOnChanges(){
    if(this.treeData){
      let keys = Object.keys(this.treeData)
      for(let k of keys){
        this.parseJson(this.treeData[k], 0);
      }
    }
  }

  parseJson(data, layer){
    this.layer = (this.layer < layer) ? layer : this.layer;
    for(let item of data){
      let flag = item.children ? true : false;
      this.header = Object.keys(item.data);
      let tmp ={}
      for(let h of this.header){
        tmp[h] = item.data[h];
      }
      tmp['last'] = flag;
      tmp['layer'] = layer;
      this.arrData.push(tmp);
      if(item.children){
        this.parseJson(item.children, layer+1);
      }
    }
  }

  inputChange(e){
    this.modifyFlag = true;
    this.modify.emit(this.modifyFlag);
  }

  layerToggle(event){
    var target = event.target || event.srcElement || event.currentTarget;
    let clickClass =$(target).parent().attr('class');
    let lastLayer = "header"+this.layer;
    let sign = $(target).attr('class')=='sign';

    if(clickClass != lastLayer && !sign){
      let next = $(target).parent().next();
      let len = $(target).parent().nextUntil('.'+clickClass).length;
      let arr = $(target).parent().nextUntil('.'+clickClass);
      // console.log(len);
      if($(target).find('span').text() == '-'){
        for(let i=0; i < len; i++){
          $(arr[i]).hide();
          if($(target).parent().attr('class') > $(arr[i+1]).attr('class')){break;}
        }
      }else{
        for(let i = 0; i < len; i++){
          // console.log($(arr[i]).find('span').text());
          if($(arr[i]).find('span').text()=='+'){
            $(arr[i]).find('span').text('-');
          }
          $(arr[i]).show();
        }
      }
      $(target).find('span').text(function(_, value){return value=='-'?'+':'-'});

    }
  }
}
