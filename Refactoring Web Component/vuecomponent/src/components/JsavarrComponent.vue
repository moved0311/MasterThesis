<template lang="html">
  <div>
    <div id="container-jsavarr"></div>
  </div>
</template>

<script lang="js">
  export default  {
    name: 'jsavarr-component',
    props: ['datas'],
    mounted() {
      var av = new JSAV("container-jsavarr");
      var arr = av.ds.array(this.datas, {indexed: false});
      av.displayInit();
    },
    data() {
      return {
      }
    }
}
</script>

<style scoped lang="css">
</style>
