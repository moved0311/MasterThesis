import React, { Component } from 'react';
import JSAVArr from './JSAVArr';
import JSAVbinarySearch from './JSAVbinarySearch';

export default class JsavPage extends Component {
  render() {
    return (
      <div className="jsavpage">
        <h1>JSAV array</h1>
        <pre><code>
        {`<JSAVArr datas={[9,12,14,23,25,31,34,35]></JSAVArr>`}
        </code></pre>
        <JSAVArr datas={[9,12,14,23,25,31,34,35]}></JSAVArr>

        <h1>JSAV binary search</h1>
        <pre><code>
        {`<JSAVbinarySearch size="10"></JSAVbinarySearch>`}  
        </code></pre>
        <JSAVbinarySearch size="10"></JSAVbinarySearch>
      </div>
    )
  }
}
