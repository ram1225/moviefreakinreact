import React, { Component } from "react";

export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Loading"
    };
  }

  componentDidMount() {
    const stopLoader = this.state.text + "...";
    this.interval = setInterval(() => {
      this.state.text === stopLoader
        ? this.setState({ text: "Loading" })
        : this.setState(currentState => {
            return {
              text: currentState.text + "."
            };
          });
    }, 300);
  }

  componentWillUnmount() {
      clearInterval(this.interval);
  }

  render() {
    return <p>{this.state.text}</p>;
  }
}
