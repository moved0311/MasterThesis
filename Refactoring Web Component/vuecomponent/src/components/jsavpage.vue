<template lang="html">
  <div>
    <h1>JSAV array</h1>
    <pre><code>&lt;jsavarr-component :datas="[2,5,15,43,12,36,13]"&gt;&lt;/jsavarr-component&gt;</code></pre>
    <jsavarr-component :datas="[2,5,15,43,12,36,13]"></jsavarr-component>
    <h1>JSAV binary search</h1>
    <pre><code>&lt;jsav-binary-component :sizes=15&gt;&lt;/jsav-binary-component&gt;</code></pre>
    <jsav-binary-component :sizes=15></jsav-binary-component>
  </div>
</template>

<script lang="js">
  import JsavarrComponent from './JsavarrComponent';
  import JsavBinaryComponent from './JsavBinaryComponent';
  export default  {
    name: 'jsavpage',
    props: [],
    components: {JsavarrComponent, JsavBinaryComponent},
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
  .jsavpage {

  }
</style>
