import React, { Component } from 'react';
import "./TreeView.css";
import $ from 'jquery'; 

export default class TreeView extends Component {
  arrData = [];

  parseJson(data, layer){
    this.layer = (this.layer < layer) ? layer : this.layer;
    for(let item of data){
      let flag = item.children ? true : false;
      this.arrData.push({name:item.data.name, layer:layer, size:item.data.size, type:item.data.type, last:flag});
      if(item.children){
        this.parseJson(item.children, layer+1);
      }
    }
  }
  layerToggle(event){
    var target = event.target || event.srcElement || event.currentTarget;
    let clickClass =$(target).parent().attr('class');
    let lastLayer = "header"+this.layer;
    let sign = $(target).attr('class')==='sign';

    if(clickClass !== lastLayer && !sign){
      // let next = $(target).parent().next();
      let len = $(target).parent().nextUntil('.'+clickClass).length;
      let arr = $(target).parent().nextUntil('.'+clickClass);
      if($(target).find('span').text() === '-'){
        for(let i=0; i < len; i++){
          $(arr[i]).hide();
          if($(target).parent().attr('class') > $(arr[i+1]).attr('class')){break;}
        }
      }else{
        for(let i = 0; i < len; i++){
          // console.log($(arr[i]).find('span').text());
          if($(arr[i]).find('span').text()==='+'){
            $(arr[i]).find('span').text('-');
          }
          $(arr[i]).show();
        }
      }
      $(target).find('span').text(function(_, value){return value==='-'?'+':'-'});

    }
  }
  render() {
    this.arrData = [];
    if(this.props.data){
      let keys = Object.keys(this.props.data)
      for(let k of keys){
        this.parseJson(this.props.data[k], 0);
      }
      console.log(this.arrData);
    }
    return (
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Type</th>
          </tr>
          {this.arrData.map((obj, i) => 
            <tr key={i} className={'header' + obj.layer}>
              <td className={'layer' + obj.layer} onClick={(e) => this.layerToggle(e)}>{obj.last ? <span className="sign">-</span> : ""}{obj.name}</td>
              <td>{obj.size}</td>
              <td>{obj.type}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}
