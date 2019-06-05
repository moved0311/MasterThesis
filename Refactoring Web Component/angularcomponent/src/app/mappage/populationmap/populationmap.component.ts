import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
declare var L: any;
import { ZipCodeService } from './zipcodeService.service';

@Component({
  selector: 'app-populationmap',
  templateUrl: './populationmap.component.html',
  styleUrls: ['./populationmap.component.css'],
  providers: [ZipCodeService]
})
export class PopulationmapComponent implements OnInit, AfterViewInit {
  @Input() serviceType;
  @Input() info; // make a useful web component usage. e.g. <app-zipmapcode [info]="['/assets/populations.json', '人口數']"></app-zipmapcode>
  map;
  markers = new Array();
  zoom = 8;
  layer1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  });
  layer2 = L.esri.basemapLayer("Gray");
  twGrid;
  population;
  constructor(private zipcodeservice: ZipCodeService){}
  ngOnInit() {
    this.map = new L.Map('map2').setView([23.79037129915711, 120.95281938174952], this.zoom);
    this.map.addLayer(this.layer1);
    this.twGrid = L.esri.featureLayer({
      url: "http://210.61.116.84/arcgis/rest/services/Taiwan/TwnMap_V1/MapServer/92",
      simplifyFactor: 0.1
    });
    this.zipcodeservice.getJsonData(this.info[0]).then((res) => { this.population = res.datas; })
  }
  ngAfterViewInit(){
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
