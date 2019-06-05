import { Component, Input, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'footer-page',
  template:`
  <h1>W3CSS footer component example</h1>
  <pre><code>&lt;ng-footer 
  [contact]="[{{'{'}}name:'fb', link:'https://www.facebook.com', icon:'fa fa-facebook-official'{{'}'}},
              {{'{'}}name: 'twitter', link:'https://twitter.com', icon: 'fa fa-twitter'{{'}'}}]"&gt;
&lt;/ng-footer&gt;</code></pre>
    <ng-footer [contact]="[{name:'fb', link:'https://www.facebook.com', icon:'fa fa-facebook-official'},
                           {name: 'twitter', link:'https://twitter.com', icon: 'fa fa-twitter'}]"
               >
    </ng-footer>

  `
})
export class FooterPageComponent{

}
