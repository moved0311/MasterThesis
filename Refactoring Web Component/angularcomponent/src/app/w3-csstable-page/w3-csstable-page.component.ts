import { Component } from '@angular/core';
import {Elements, AnotherData, TableData} from './data';

@Component({
  selector: 'app-w3-csstable-page',
  template: `
    <h1>W3CSS Table</h1>
    <pre><code>&lt;w3css-table [in_data]=datas bgColor="pink" fontFamily="fantasy"&gt;&lt;/w3css-table&gt;</code></pre>
    <w3css-table [in_data]=datas></w3css-table>     <!-- bgColor="pink" fontFamily="fantasy" -->
  `
})
export class W3CSSTablePageComponent{
  // datas = Elements;
  // datas = AnotherData;
  datas = TableData;
}


