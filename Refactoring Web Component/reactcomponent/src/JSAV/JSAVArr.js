import React, { Component } from 'react';

export default class JSAVArr extends Component {
  componentDidMount(){
    let JSAV = window.JSAV;
    let av = new JSAV("container-jsavarr");
    let theArray = this.props.datas;
    av.ds.array(theArray, {indexed: false});
    av.displayInit();
  }
  render() {
    return (
      <div id="container-jsavarr"></div>
    )
  }
}
