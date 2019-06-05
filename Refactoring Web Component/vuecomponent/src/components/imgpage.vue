<template lang="html">

  <section class="imgpage">
    <h1>Img Slide component</h1>
    <pre><code>&lt;img-slide  :imgs="['https://www.w3schools.com/howto/img_mountains_wide.jpg',
                    'https://www.w3schools.com/howto/img_lights_wide.jpg',
                    'https://www.w3schools.com/howto/img_snow_wide.jpg']"
            :captions="['Mountains', 'Light', 'Snow']"&gt;
&lt;/img-slide&gt;
</code></pre>
    <img-slide :imgs="['https://www.w3schools.com/howto/img_mountains_wide.jpg',
                          'https://www.w3schools.com/howto/img_lights_wide.jpg',
                          'https://www.w3schools.com/howto/img_snow_wide.jpg']"
               :captions="['Mountains', 'Light', 'Snow']"
    ></img-slide>
  </section>

</template>

<script lang="js">
  import ImgSlide from './ImgSlide';
  export default  {
    name: 'imgpage',
    props: [],
    components: {ImgSlide},
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
  .imgpage {

  }
</style>
