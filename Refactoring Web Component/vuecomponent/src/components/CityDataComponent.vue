<template lang="html">
  <div id="citymap"></div>
</template>

<script lang="js">
  export default  {
    name: 'city-data-component',
    props: ['info'],
    beforeMount(){
      //get population datas.
        fetch(this.info[0]) //"http://localhost:3000/assets/data.json"
        .then(res => res.json())
        .then(
          res => {
            this.population = res.datas;
         }
        )
    },
    mounted() {
      this.map = new L.Map('citymap').setView([23.79037129915711, 120.95281938174952], this.zoom);
      let layer = L.esri.basemapLayer("Gray");
      this.map.addLayer(layer);
      this.twGrid = L.esri.featureLayer({
        url: "http://210.61.116.84/arcgis/rest/services/Taiwan/TwnMap_V1/MapServer/92",
        simplifyFactor: 0.1
      });
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
    },
    data() {
      return {
        zoom: 7,
        map: {},
        population: {},
        markers: [],
      }
    },
    methods: {
      cleanMarkers(){
        for(let i = 0; i < this.markers.length; i++){
          this.map.removeLayer(this.markers[i]);
        }
      }
    },
    computed: {

    }
}
</script>

<style scoped lang="css">
  #zipcodemap, #citymap {
      /* position: absolute; top:0; bottom:0; right:0; left:180; */
      height: 500px;
      width: 1000px;
  }
  div.leaflet-popup{
      width: 300px;
  }
  div.leaflet-control-zoom.leaflet-bar.leaflet-control{
      width: 30px;
  }
</style>
