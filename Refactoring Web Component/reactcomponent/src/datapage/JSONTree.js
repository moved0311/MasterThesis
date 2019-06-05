import React, { Component } from 'react';
import TreeView from './TreeView';

export default class JSONTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      res: []
    };
  }

  componentDidMount() {
    fetch(this.props.path) //"http://localhost:3000/assets/data.json"
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            res: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, res } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <TreeView data={res}></TreeView>
      );
    }
  }
}
