import React, { Component } from 'react';

const style = {
    marginLeft: '5px'
}
export default class Footer extends Component {
  componentDidMount(){
    console.log(this.props.contact.length);
  }
  render() {
    return (
      <div className="footer">
        <footer className="w3-container w3-padding-64 w3-center w3-black w3-xlarge">
          {this.props.contact.map((obj,i) => 
            <a href={obj.link} key={i} style={style}><i className={obj.icon}></i></a>          
          )}
          <p className="w3-medium">
            Powered by <a href="https://www.w3schools.com/w3css/default.asp">w3.css</a>
          </p>
        </footer>
      </div>
    )
  }
}
