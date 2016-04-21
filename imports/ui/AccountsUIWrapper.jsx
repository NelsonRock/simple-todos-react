import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    //Will use meteor blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount() {
    //Will clean up Blaze tempplate
    Blaze.remove(this.view);
  }
  render() {
    // Render a placeholder container that will be filled
    return <span ref = "container" />;
  }

}
