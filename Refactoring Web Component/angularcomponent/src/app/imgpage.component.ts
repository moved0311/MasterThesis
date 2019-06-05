import { Component, Input, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'img-page',
  template:`
    <h1>Img Slide component</h1>
    <pre><code>&lt;ng-imgslide 
    [imgs]="['https://www.w3schools.com/howto/img_band_chicago.jpg',
             'https://www.w3schools.com/howto/img_band_ny.jpg',
             'https://www.w3schools.com/howto/img_band_la.jpg']"
    [captions]="['Mountains', 'Light', 'Snow']"&gt;
&lt;/ng-imgslide&gt;</code></pre>

    <ng-imgslide [imgs]="['https://www.w3schools.com/howto/img_mountains_wide.jpg',
                          'https://www.w3schools.com/howto/img_lights_wide.jpg']"
                 [captions]="['Mountains', 'Light']">
    </ng-imgslide>
  `
})
export class ImgPageComponent{

}
