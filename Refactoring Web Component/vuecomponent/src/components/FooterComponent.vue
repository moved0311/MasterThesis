<template lang="html">
  <section class="footer-component">
    <footer class="w3-container w3-padding-64 w3-center w3-black w3-xlarge">
      <a v-for="(item,key) of contact" :href="item.link" :key={key}><i :class="item.icon"></i></a>
      <p class="w3-medium">
        Powered by <a v-if="powerby">{{powerby}}</a>
                   <a v-if="!powerby" href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a>
      </p>
    </footer>
  </section>
</template>

<script lang="js">
  export default  {
    name: 'footer-component',
    props: ['contact','powerby']
}
</script>

<style scoped lang="css">
  i{
      margin-left: 5px;
  }
</style>
