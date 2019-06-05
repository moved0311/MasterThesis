<template lang="html">
  <div id="zipcodemap"></div>
</template>

<script lang="js">
  export default  {
    name: 'zip-code-component',
    props: [],
    mounted() {
      this.map = new L.Map('zipcodemap').setView([23.79037129915711, 120.95281938174952], this.zoom);
      let layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      });
      this.map.addLayer(layer);
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
    },
    data() {
      return {
        zoom : 8,
        map : {},
        markers : []
      }
    },
    methods: {

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
