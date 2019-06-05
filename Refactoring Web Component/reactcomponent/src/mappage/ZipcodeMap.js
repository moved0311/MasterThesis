import React, { Component } from 'react';
import './map.css';
import $ from 'jquery'; 

export default class ZipcodeMap extends Component {
  zoom = 8;
  map;
  markers = [];
  componentDidMount(){
    let L = window.L;
    this.map = new L.Map('zipcodemap').setView([23.79037129915711, 120.95281938174952], this.zoom); //
    let layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
    this.map.addLayer(layer);
    let data = {latlng:'', pos:'', zipcode:''};
    let geocodeService = L.esri.Geocoding.geocodeService();
    
    this.map.on('click', function(e) {
      console.log(data);
      data.latlng = e.latlng;
      geocodeService.reverse().latlng(e.latlng).run(function(error, result) {
        data.pos = result.address.Match_addr;
        let url = "http://zip5.5432.tw/zip5json.py?adrs=" + result.address.Match_addr;
        $.ajax({url: url, success: function(result){
          data.zipcode = result.zipcode;
        }}).then(function(){
          let popstr = "<b>地址 : </b>" + data.pos + "<br><b>郵遞區號 : </b>" + data.zipcode;
          let marker = new L.Marker(data.latlng);
          this.markers.push(marker);  // add to markers array.
          this.map.addLayer(marker);
          marker.bindPopup(popstr).openPopup();
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }
  render() {
    return (
      <div id="zipcodemap"></div>
    )
  }
}
