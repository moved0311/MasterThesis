<template lang="html">
<div id="container-binarySearch">
  <div class="jsavcontrols"></div><span class="jsavcounter"></span>
  <p class="jsavoutput jsavline"></p>
  <div class="jsavcanvas"></div>
</div>
</template>

<script lang="js">
  export default  {
    name: 'jsav-binary-component',
    props: ['sizes'],
    mounted() {
      var av = new JSAV("container-binarySearch");
      var theArray = JSAV.utils.rand.numKeys(1, 100, this.sizes).sort((a,b)=>(a-b));
      var find = JSAV.utils.rand.numKeys(1, 100, 1);
      var arr = av.ds.array(theArray, {indexed: true});
      av.umsg("binary search to find "+find+".");
      av.displayInit();
      var step = this.binarySearch(theArray, find);
    for(let i=0; i < step.length; i++){
      let low = step[i].low;
      let high = step[i].high;
      let mid = step[i].mid;
      let newlow = step[i].newlow;
      let newhigh = step[i].newhigh;
      let goal = step[i].goal;
      if(i != step.length -1){
        if(theArray[mid] < find){
          av.umsg(`Low = ${low} and high = ${high}, so mid = ( ${low} + ${high} ) / 2 = ${mid} <br>\
                   Beause ${theArray[mid]} is less than ${find}, the new low will be ${newlow}`);
          for(let i = low; i < mid; i++){
            arr.css([i],{"color":"white"});
          }
        }else{
          av.umsg(`Low = ${low} and high = ${high}, so mid = ( ${low} + ${high} ) / 2 = ${mid} <br>\
                 Beause ${theArray[mid]} is great than ${find}, the new high will be ${newhigh}`);
          for(let i = high; i > mid; i--){
            arr.css([i],{"color":"white"});
          }
        }
        arr.highlight(mid);
      }else{
        if(goal){
          av.umsg(`Low = ${low} and high = ${high}, so mid = ( ${low} + ${high} ) / 2 = ${mid} <br>\
                   The key was found at index ${goal}!`);
          arr.highlight(mid);
        }else{
          av.umsg(`Low = ${low} and high = ${high}, so mid = ( ${low} + ${high} ) / 2 = ${mid} <br>\
                   The key was not found`);
        }
        av.recorded();
        break;
      }
      av.step();
    }
    av.recorded();
    },
    data() {
      return {
        
      }
    },
    methods: {
      binarySearch(arr, goal){
        var low = 0;
        var high = arr.length -1;
        var stack = [];
        while(low <= high){
          var tmp = { low:0, high:0, mid:0, newlow:0, newhigh:0, goal:null };
          var mid = Math.floor((low + high)/2);
          tmp.low = low;
          tmp.high = high;
          tmp.mid = mid;
          if(arr[mid] < goal){
            low = mid + 1;
            tmp.newlow = low;
          }else if(arr[mid] > goal){
            high = mid - 1;
            tmp.newhigh = high;
          }else{
            tmp.goal = mid;
            stack.push(tmp);
            return stack;
          }
          stack.push(tmp);
        }
        return stack;
      }
    },
    computed: {

    }
}
</script>

<style scoped lang="css">
  .jsav-binary-component {

  }
</style>
