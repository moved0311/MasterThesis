<template lang="html">
<div id="sourceCodeArea">
<div class="w3-container w3-content w3-padding-64" style="max-width:800px" id="contact">
    <h2 class="w3-wide w3-center">{{jtv0}}</h2>
    <p class="w3-opacity w3-center">{{jtv1}}</p>
    <div class="w3-row w3-padding-32">
      <div class="w3-col m6 w3-large w3-margin-bottom">
        <i class="fa fa-map-marker" style="width:30px"></i> Chicago, US<br>
        <i class="fa fa-phone" style="width:30px"></i> Phone: +00 151515<br>
        <i class="fa fa-envelope" style="width:30px"> </i> Email: mail@mail.com<br>
      </div>
      <div class="w3-col m6">
        <form action="/action_page.php" target="_blank">
          <div class="w3-row-padding" style="margin:0 -16px 8px -16px">
            <div class="w3-half">
              <input class="w3-input w3-border" type="text" placeholder="Name" required="" name="Name">
            </div>
            <div class="w3-half">
              <input class="w3-input w3-border" type="text" placeholder="Email" required="" name="Email">
            </div>
          </div>
          <input class="w3-input w3-border" type="text" placeholder="Message" required="" name="Message">
          <button class="w3-button w3-black w3-section w3-right" type="submit">SEND</button>
        </form>
      </div>
    </div>
  </div>
 </div>
  
</template>

<script lang="js">
  export default  {
    name: 'test',
    props: [],
    mounted() {

    },
    data() {
      return {
        jtv0 : 'this is jtv0',
        jtv1 : 'this is jtv1',
      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="css">
  /* @import "https://www.w3schools.com/w3css/4/w3.css"; */
  .test {

  }
</style>
