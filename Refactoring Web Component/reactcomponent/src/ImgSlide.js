import React, { Component } from 'react';
import './imgSlide.css';

export default class ImgSlide extends Component {
  slideIndex;
  componentWillMount(){
    console.log('componentWillMount');
  }
  componentDidMount() {
    console.log('componentDidMount');
    this.slideIndex = 1;
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
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {this.slideIndex = 1}    
    if (n < 1) {this.slideIndex = this.slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex-1].style.display = "block";  
    dots[this.slideIndex-1].className += " active";
  }

  render() {
    return (
      <div>
        <div className="slideshow-container">
          {this.props.imgs.map((img,i) => 
            <div className="mySlides fade" key={i}>
              <div className="numbertext">1 / 3</div>
              <img src={img} alt="" style={{width: '100%'}}></img>
              <div className="text">{this.props.captions[i]}</div>
            </div>
          )}
          <a className="prev" onClick={(e) => this.plusSlides(-1)}>&#10094;</a> 
          <a className="next" onClick={(e) => this.plusSlides(1)}>&#10095;</a>
        </div>
        <div style={{textAlign: 'center'}}>
          {this.props.imgs.map((img, i) => <span className="dot" onClick={(e) => this.currentSlide(i+1)} key={i}></span>)}
        </div>
      </div>
    )
  }

}
