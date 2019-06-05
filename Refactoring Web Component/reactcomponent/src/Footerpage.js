import React, { Component } from 'react';
import Footer from './Footer';

export default class Footerpage extends Component {
  render() {
    return (
      <div className="footerpage">
        <h1>W3CSS footer component example</h1>
        <pre><code>&lt;Footer contact=&#65371;[<br></br>&#65371;name:'fb', link:'https://www.facebook.com', icon:'fa fa-facebook-official'&#65373;,
        <br></br>&#65371;name: 'twitter', link:'https://twitter.com', icon: 'fa fa-twitter'&#65373;]&#65373;&gt;<br></br>&lt;/Footer&gt;</code></pre>
        <Footer contact={[{name:'fb', link:'https://www.facebook.com', icon:'fa fa-facebook-official'},
                          {name: 'twitter', link:'https://twitter.com', icon: 'fa fa-twitter'}]}></Footer>
      </div>
    )
  }
}


