import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'w3css-table',
  template: `
  <table id="customers" [style.font-family]="fontFamily">
    <tr>
      <th *ngFor="let header of theader" [style.background]=bgColor>{{header}}</th>
    </tr>
    <tr *ngFor="let obj of in_data">
      <td *ngFor="let title of theader">{{obj[title]}}</td>
    </tr>
  </table>
  `,
  styleUrls: ['./w3-csstable.component.css']
})
export class W3CSSTableComponent implements OnInit {
  @Input() in_data;
  @Input() bgColor;
  @Input() fontFamily;
  theader = [];
  ngOnInit() {
    if(this.in_data[0]){
      this.theader = Object.keys(this.in_data[0]);
    }
  }
}


