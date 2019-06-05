<template lang="html">
  <div>
    <table>
    <tr>
      <th>Name</th>
      <th>Size</th>
      <th>Type</th>
    </tr>
    <tr v-for="row in arrData" :class="applyClass('header', row.layer)">
      <td :class="applyClass('layer', row.layer)" v-on:click="layerToggle($event)"><span v-if="row.last" class="sign">-</span>{{row.name}}</td>
      <td>{{row.size}}</td>
      <td>{{row.type}}</td>
    </tr>
  </table>
  </div>
</template>

<script lang="js">
  export default  {
    name: 'tree-view',
    props: ['datas'],
    mounted() {
      this.init();
    },
    data() {
      return {
        test: 'some string',
        modifyFlag: false,
        arrData: [],
        layer: 0
      }
    },
    watch:{
      'datas': function(){
        this.init();
      }
    },
    methods:{
      init(){
        console.log('mount(): ',this.datas);
        if(this.datas){
          let keys = Object.keys(this.datas)
          for(let k of keys){
            this.parseJson(this.datas[k], 0);
          }
        }
      },
      parseJson(data, layer){
        this.layer = (this.layer < layer) ? layer : this.layer;
        for(let item of data){
          let flag = item.children ? true : false;
          this.arrData.push({name:item.data.name, layer:layer, size:item.data.size, type:item.data.type, last:flag});
          if(item.children){
            this.parseJson(item.children, layer+1);
          }
        }
      }, 
      inputChange(e){
        this.modifyFlag = true;
        this.modify.emit(this.modifyFlag);
      },
      layerToggle(event){
        var target = event.target || event.srcElement || event.currentTarget;
        let clickClass =$(target).parent().attr('class');
        let lastLayer = "header"+this.layer;
        let sign = $(target).attr('class')=='sign';

        if(clickClass != lastLayer && !sign){
          let next = $(target).parent().next();
          let len = $(target).parent().nextUntil('.'+clickClass).length;
          let arr = $(target).parent().nextUntil('.'+clickClass);
          // console.log(len);
          if($(target).find('span').text() == '-'){
            for(let i=0; i < len; i++){
              $(arr[i]).hide();
              if($(target).parent().attr('class') > $(arr[i+1]).attr('class')){break;}
            }
          }else{
            for(let i = 0; i < len; i++){
              // console.log($(arr[i]).find('span').text());
              if($(arr[i]).find('span').text()=='+'){
                $(arr[i]).find('span').text('-');
              }
              $(arr[i]).show();
            }
          }
          $(target).find('span').text(function(_, value){return value=='-'?'+':'-'});

        }
      },
      applyClass(prefix, layer){
        return prefix + layer;
      }
    }
}
</script>

<style scoped lang="css">
    table, td, th{ 
      border-collapse: collapse;
      border: 1px solid black;
    }
    input{
      width: 150px;
    }
    .layer1{
      padding-left: 15px;
    }
    .layer2{
      padding-left: 30px;
    }
    .layer3{
      padding-left: 45px;
    }
    .layer4{
      padding-left: 60px;
    }
</style>
