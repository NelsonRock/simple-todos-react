import React, { Component,  PropTypes } from 'react';

import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';

// Tas k component is a todo item
export default class Task extends Component{

  toggleChecked(event){
    Meteor.call("tasks.setChecked", this.props.task.id, !this.props.task.checked);
  }

  deleteTask(){
    Meteor.call("tasks.remove", this.props.task.id);

  }

  displayUsername(){
    return this.props.task.username ? <strong> { this.props.task.username } : </strong> : '';
  }

  render(){

    const taskClassName = this.props.task.checked ? 'checked' : '';

    return(
      <li className = {taskClassName}>
          <button className = "delete" onClick = { this.deleteTask.bind(this) }>
            &times;
          </button>

          <input
            type = "checkbox"
            readOnly
            checked = { this.props.task.checked }
            onClick = { this.toggleChecked.bind(this) }
          />

          <span className = "text">
            { this.displayUsername()  }
            <span>{this.props.task.text}</span>
          </span>
      </li>
    );
  }
}
Task.propTypes = {
   // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};
