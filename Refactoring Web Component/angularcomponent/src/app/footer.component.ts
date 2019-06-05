import { Component, Input} from '@angular/core';
@Component({
  selector: 'ng-footer',
  template:`
      <footer class="w3-container w3-padding-64 w3-center w3-xlarge" [style.background]=bgColor> <!--  [style.background]=bgColor [style.color]=fontColor -->
          <a *ngFor="let item of contact" href={{item.link}}>
            <i class={{item.icon}}></i>
          </a>
          <p class="w3-medium" [style.color]=fontColor>
            Powered by 
            <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">
              <span *ngIf="powerby; else default">{{powerby}}</span>
              <ng-template #default>
                w3.css
              </ng-template>
          </a>
          </p>
      </footer>    
  `,
  styleUrls : ['./footer.component.css']
})
export class NGfooterComponent{
  @Input() bgColor;
  @Input() fontColor;
  @Input() IconColor;
  @Input() powerby;
  @Input() contact;
}
