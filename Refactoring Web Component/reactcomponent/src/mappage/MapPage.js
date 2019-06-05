import React, { Component } from 'react';
import ZipcodeMap from './ZipcodeMap';
import CityData from './CityData';

export default class MapPage extends Component {
  render() {
    return (
      <div className="mappage">
        <h1>ZipCode Map</h1>
        <pre><code>{`<ZipcodeMap></ZipcodeMap>`}</code></pre>
        <ZipcodeMap></ZipcodeMap>
        <h1>各縣市人口數</h1>
        <pre><code>{`<CityData info={['/assets/populations.json', '人口數']}></CityData>`}</code></pre>
        <CityData info={['/assets/populations.json', '人口數']}></CityData>
      </div>
    )
  }
}
