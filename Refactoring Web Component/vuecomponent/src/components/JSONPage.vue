<template lang="html">

  <section class="json-page">
    <h1>JSON Tree Table</h1>
    <pre><code>&lt;JSONTree path="/data.json"&gt;&lt;/JSONTree&gt;</code></pre>
    <JSONTree path="/data.json"></JSONTree>
  </section>

</template>

<script lang="js">
  import JSONTree from './JSONTree';
  export default  {
    name: 'json-page',
    props: [],
    components: {JSONTree},
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
  .json-page {

  }
</style>
