import { Component, OnInit, AfterViewInit, Input, OnChanges } from '@angular/core';
declare var L: any;
//get populations json data service.
import { ZipCodeService } from './zipcodeService.service';

@Component({
  selector: 'app-zipmapcode',
  templateUrl: './zipmapcode.component.html',
  styleUrls: ['./zipmapcode.component.css'],
  providers: [ZipCodeService]
})
export class ZipmapcodeComponent implements OnInit,OnChanges,AfterViewInit {
  @Input() serviceType;
  map;
  markers = new Array();
  zoom = 8;
  layer1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  });
  layer2 = L.esri.basemapLayer("Gray");
  twGrid;
  population;
  test;
  constructor(private zipcodeservice: ZipCodeService){}
  ngOnInit() {
    this.map = new L.Map('map').setView([23.79037129915711, 120.95281938174952], this.zoom);
    this.map.addLayer(this.layer1);
    this.twGrid = L.esri.featureLayer({
      url: "http://210.61.116.84/arcgis/rest/services/Taiwan/TwnMap_V1/MapServer/92",
      simplifyFactor: 0.1
    });
    // this.zipcodeservice.getJsonData(this.info[0]).then((res) => { this.population = res.datas; })
  }
  ngAfterViewInit(){
    this.clean();
    this.setBasemap(this.layer1);
    let data = {latlng:'', pos:'', zipcode:''};
    let geocodeService = L.esri.Geocoding.geocodeService();
    
    this.map.on('click', function(e) {
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
          // console.log(data);
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }
  ngOnChanges(){

    if(this.serviceType == "1"){
      console.log("郵遞區號:",this.serviceType);
      this.clean();
      this.setBasemap(this.layer1);
      let data = {latlng:'', pos:'', zipcode:''};
      let geocodeService = L.esri.Geocoding.geocodeService();
      
      this.map.on('click', function(e) {
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
            // console.log(data);
          }.bind(this));
        }.bind(this));
      }.bind(this));
    }else if(this.serviceType == "2"){
      // console.log(this.info[0],this.info[1]);
      console.log("人口數:", this.serviceType);
      this.clean();
      this.map.setZoom(this.zoom);
      this.setBasemap(this.layer2);
      this.map.addLayer(this.twGrid);

      let selectedCity = "nothing selected";
      let selectedId;
      this.twGrid.on('load', function(){
        this.twGrid.eachFeature(function(layer){
          layer.on('click',function(){
            selectedCity = this.feature.properties.County_D_1;
            selectedId = this.feature.id;
          });
        }.bind(this));
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
        if(selectedCity == '桃園縣'){ selectedCity = '桃園市'; }
        let popstr = "<b>縣市名稱 : </b>" + selectedCity + "<br><b>" + this.info[1] + " : </b>" + this.population[selectedCity];
        this.markers.push(marker);
        this.cleanMarkers();
        let pos = e.latlng;
        this.map.addLayer(marker);
        marker.bindPopup(popstr).openPopup();

      }.bind(this))

    }else{
      console.log("沒有選擇服務 ",this.serviceType);
    }
  }
  clean(){ //remove markers and listener.
    // remove all markers.
    for(let i = 0; i < this.markers.length; i++){
      this.map.removeLayer(this.markers[i]);
    }
    // remove click listener.
    this.map.off("click");
    this.twGrid.off("load");
    this.twGrid.off("click");
  }
  cleanMarkers(){
    for(let i = 0; i < this.markers.length; i++){
      this.map.removeLayer(this.markers[i]);
    }
  }
  setBasemap(layer) {
    if (this.layer1 || this.layer2) {
      this.map.removeLayer(this.layer1);
      this.map.removeLayer(this.layer2);
      this.map.removeLayer(this.twGrid);
    }
    this.map.addLayer(layer);
  }

}