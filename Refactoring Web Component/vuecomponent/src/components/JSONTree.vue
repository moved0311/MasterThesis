<template lang="html">
  <div>
    <TreeView :datas="data"></TreeView>
  </div>
</template>

<script lang="js">
  import TreeView from './TreeView';
  export default  {
    name: 'json-tree',
    props: ['path'],
    components: {TreeView},
    mounted() {
      console.log('path: ',this.path);
      var self = this;
      fetch(this.path, {})
        .then((response) => {
          return response.json(); 
        }).then((jsonData) => {
          self.data = Object.assign({}, self.data, jsonData);
        }).catch((err) => {
          console.log('錯誤:', err);
      });
    },
    data() {
      return {
        data: {}
      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="css">
  .json-tree {

  }
</style>
