import React, { Component } from 'react';
import ImgSlide from './ImgSlide';

export default class Imgpage extends Component {
  render() {
    return (
      <div className="imgpage">
        <h1>Img Slide component</h1>
        <pre><code>{`<ImgSlide 
  imgs={['https://www.w3schools.com/howto/img_mountains_wide.jpg',
         'https://www.w3schools.com/howto/img_lights_wide.jpg',
         'https://www.w3schools.com/howto/img_snow_wide.jpg']}
  captions={['Caption 1', 'Caption 2', 'Caption 3']}>
</ImgSlide>`}</code></pre>
      
        <ImgSlide imgs={['https://www.w3schools.com/howto/img_mountains_wide.jpg',
                         'https://www.w3schools.com/howto/img_lights_wide.jpg',
                         'https://www.w3schools.com/howto/img_snow_wide.jpg']}
                  captions={['Mountains', 'Light', 'Snow']}>
        </ImgSlide>
      </div>
    )
  }
}
