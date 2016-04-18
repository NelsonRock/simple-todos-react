import React, { Component,  PropTypes } from 'react';

import { Tasks } from '../api/tasks.js';

// Tas k component is a todo item
export default class Task extends Component{

  toggleChecked(event){
    Tasks.update( this.props.task._id, {
      $set: { checked : !this.props.task.checked },
    });
  }

  deleteTask(){
    Tasks.remove( this.props.task._id );

  }

  render(){

    const taskClassName = this.props.task.checked ? 'checked' : '';

    return(
      <li className = {taskClassName}>
          <input
            type = "checkbox"
            readOnly
            checked = { this.props.task.checked }
            onClick = { this.toggleChecked.bind(this) }
          />

          <span>{this.props.task.text}</span>

      </li>
    );
  }
}
Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};
