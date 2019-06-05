import React, { Component } from 'react';
import JSONTree from './JSONTree';

export default class DataPage extends Component {
  render() {
    return (
      <div className="datapage">
        <h1>JSON Tree Table</h1>
        <pre><code>{`<JSONTree path="/assets/data.json"></JSONTree>`}</code></pre>
        <JSONTree path="/assets/data.json"></JSONTree>
      </div>
    )
  }
}
