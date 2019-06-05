import { Component, Input, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'ng-imgslide',
  template:`
  <div class="slideshow-container">
    <div class="mySlides" *ngFor="let img of imgs; let i = index">
      <div class="numbertext">{{i+1}}/{{imgLength}}</div>
      <img src={{img}} style="width:100%">
      <div class="text" *ngIf="captions">{{captions[i]}}</div>
    </div>

    <!-- Next and previous buttons -->
    <a class="prev" (click)="plusSlides(-1)">&#10094;</a>
    <a class="next" (click)="plusSlides(1)">&#10095;</a>
  </div>
  <br>  

  <div style="text-align:center">
    <span class="dot" *ngFor="let img of imgs; let i = index" (click)="currentSlide(i+1)"></span>
  </div>
  `,
  styleUrls:['./imgSlide.component.css']
})
export class NGImgSlideComponent implements AfterViewInit,OnInit{
  @Input() imgs;
  @Input() captions;
  slideIndex = 1;
  imgLength;

  ngOnInit(){
    this.imgLength = this.imgs.length;
  }
  ngAfterViewInit(){
    this.showSlides(this.slideIndex);
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  
  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }
  
  showSlides(n) {
    var i;
    var slides = document.querySelectorAll(".mySlides") as NodeListOf<HTMLElement>;
    var dots = document.querySelectorAll(".dot") as NodeListOf<HTMLElement>;

    if (n > slides.length) {this.slideIndex = 1} 
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex-1].style.display = "block"; 
    dots[this.slideIndex-1].className += " active";
  }
}
