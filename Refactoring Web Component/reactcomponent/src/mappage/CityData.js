import React, { Component } from 'react';
import './map.css';

export default class CityData extends Component {
  zoom = 7;
  map;
  twGrid;
  population;
  markers = [];
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      res: {}
    };
  }
  componentDidMount(){
    let L = window.L;
    this.map = new L.Map('citymap').setView([23.79037129915711, 120.95281938174952], this.zoom);
    let layer = L.esri.basemapLayer("Gray");
    this.map.addLayer(layer);
    this.twGrid = L.esri.featureLayer({
      url: "http://210.61.116.84/arcgis/rest/services/Taiwan/TwnMap_V1/MapServer/92",
      simplifyFactor: 0.1
    });
    this.map.addLayer(this.twGrid);

    fetch(this.props.info[0]) //"http://localhost:3000/assets/data.json"
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            population: result.datas
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    let selectedCity = "nothing selected";
    this.twGrid.on('load', function(){
      this.twGrid.eachFeature(function(layer){
        layer.on('click',function(){
          selectedCity = this.feature.properties.County_D_1;
        });
      });
    }.bind(this));

    this.twGrid.on('click',function(e){
      this.twGrid.setStyle({ // reset twGrid color.
        color: '#3388ff'
      })
      let query = "County_D_1='"+selectedCity+"'";
      this.twGrid.query().where(query).run(function(error, featureCollection, response){
        this.twGrid.setFeatureStyle(featureCollection.features[0].id, {
            color: 'red'
        })
      }.bind(this));

      let marker = new L.Marker(e.latlng);
      if(selectedCity === '桃園縣'){ selectedCity = '桃園市'; }
      let popstr = "<b>縣市名稱 : </b>" + selectedCity + "<br><b>" + this.props.info[1] + " : </b>" + this.state.population[selectedCity];
      this.markers.push(marker);
      this.cleanMarkers();
      this.map.addLayer(marker);
      marker.bindPopup(popstr).openPopup();

    }.bind(this))
  }
  cleanMarkers(){
    for(let i = 0; i < this.markers.length; i++){
      this.map.removeLayer(this.markers[i]);
    }
  }
  render() {
    return (
      <div id="citymap"></div>
    )
  }
}
