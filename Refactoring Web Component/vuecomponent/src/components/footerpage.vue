<template lang="html">
  <div>
    <h1>W3CSS footer component example</h1>
<pre><code>&lt;footer-component 
  :contact="[{name:'fb', link:'https://www.facebook.com', icon:'fa fa-facebook-official'},
             {name: 'twitter', link:'https://twitter.com', icon: 'fa fa-twitter'}]"
  powerby="taiyi"&gt;
&lt;/footer-component&gt;
</code></pre>
    <footer-component :contact="[{name:'fb', link:'https://www.facebook.com', icon:'fa fa-facebook-official'},
                           {name: 'twitter', link:'https://twitter.com', icon: 'fa fa-twitter'}]"
                      powerby="taiyi">
    </footer-component>
  </div>
</template>

<script lang="js">
  import FooterComponent from './FooterComponent'
  export default  {
    name: 'footerpage',
    props: [],
    components: {FooterComponent}
}
</script>

<style scoped lang="css">
</style>
