<template>
  <div id="app">
    <div id="container">
      <div class="sidenav">
        <router-link to="/footer">Footer</router-link>
        <router-link to="/imgpage">Img</router-link>
        <router-link to="/jsavpage">JSAV</router-link>
        <router-link to="/jsonpage">JSON</router-link>
        <router-link to="/mappage">Map</router-link>
      </div>   
      <div class="main">
        <router-view></router-view> 
      </div>
    </div>
  </div>
</template>

<script>
  import './assets/JSAV/lib/jquery.js';
  import './assets/JSAV/lib/jquery.transit.js';
  import './assets/JSAV/build/JSAV.js';
  import './assets/JSAV/css/JSAV.css';

export default {
  name: 'app',
  components: {
    
  }

}
</script>

<style>
@import "https://www.w3schools.com/w3css/4/w3.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
        
html,h1,div {
    font-family: "微軟正黑體";
}
#container{
    height: 900px;
    /* width: 1000px; */
    left:180px;
}
.sidenav {
    height: 100%;
    width: 180px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    padding-top: 20px;
}
.sidenav a{
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
}
.main {
    margin-left: 180px; /* Same as the width of the sidenav */
    font-size: 28px; /* Increased text to enable scrolling */
    padding: 0px 10px;
}
pre {
    border: solid 1px black;
    background-color: #eee;
    margin-top: 5px;
}
</style>
