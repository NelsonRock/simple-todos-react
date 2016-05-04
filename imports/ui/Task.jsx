import React, { Component,  PropTypes } from 'react';

import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';

import classnames from 'classnames';

import { Bert } from 'meteor/themeteorchef:bert';

// Tas k component is a todo item
export default class Task extends Component{

  toggleChecked(){
    Meteor.call("tasks.setChecked", this.props.task._id, !this.props.task.checked, (err, res) => {
      if(err){
        Bert.alert( err.reason, 'danger', 'growl-top-right' );
      }
      else{
        Bert.alert('Ckecked!', 'success', 'growl-top-right', 'fa-thumbs-o-up')
      }
    });
  }

  deleteTask(){
    Meteor.call("tasks.remove", this.props.task._id, (err, res) => {
        if(err){
          Bert.alert( err.reason, 'danger', 'growl-top-right');
        }
        else{
          Bert.alert('Good!', 'success', 'growl-top-right', 'fa-thumbs-o-up')
        }
    });
  }

  togglePrivate(){
    Meteor.call("tasks.setPrivate", this.props.task._id , !this.props.task.private, (err, res) => {
      if(err){
        Bert.alert( err.reason, 'danger', 'growl-top-right');
      }
      else{
        Bert.alert( 'Status changed', 'success', 'growl-top-right', 'fa-thumbs-o-up');
      }
    });
  }

  render(){

    const taskClassName = classnames({
      checked : this.props.task.checked,
      private : this.props.task.private,
    });

    return(
      <li className = {taskClassName}>
          <button className = "delete" onClick = { this.deleteTask.bind(this) }>
            &times;
          </button>

          <input
            type = "checkbox"
            readOnly
            checked = { this.props.task.checked }
            onChange = { this.toggleChecked.bind(this) }
          />

          { this.props.showPrivateButton ? (
            <button className="toggle-private" onClick={ this.togglePrivate.bind(this) }>
              { this.props.task.private ? 'Private' : 'Public'}
            </button> ) : '' }

            <span className = "text">
              <strong>{ this.props.task.username }</strong> : {this.props.task.text}
              </span>
      </li>
    );
  }
}
Task.propTypes = {
   // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
  showPrivateButton: PropTypes.bool.isRequired,
};
