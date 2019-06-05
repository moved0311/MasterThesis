<template lang="html">
  <div>
    <h1>ZipCode Map</h1>
    <pre><code>&lt;ZipCodeComponent&gt;&lt;/ZipCodeComponent&gt;</code></pre>
    <ZipCodeComponent></ZipCodeComponent>
    <h1>各縣市人口數</h1>
    <pre><code>&lt;CityDataComponent :info="['/populations.json', '人口數']"&lt;&gt;/CityDataComponent&gt;</code></pre>
    <CityDataComponent :info="['/populations.json', '人口數']"></CityDataComponent>
  </div>
</template>

<script lang="js">
  import ZipCodeComponent from './ZipCodeComponent'
  import CityDataComponent from './CityDataComponent'
  export default  {
    name: 'map-page',
    props: [],
    components: {ZipCodeComponent, CityDataComponent},
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="css">
  .map-page {

  }
</style>
