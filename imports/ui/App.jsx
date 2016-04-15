import React,  { Component } from 'react';

//import react-meteor-data for working with collections
import { createContainer } from 'meteor/react-meteor-data';

//collection created
import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

export default class App extends Component{
  getTasks(){
    return [
      {_id: 1, text: 'This is task 1' },
      {_id: 2, text: 'This is task 2' },
      {_id: 3, text: 'This is task 3' },
      {_id: 4, text: 'This is task 4' }
    ];
  }

  renderTasks(){
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render(){
    return(
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  //tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}).fetch(),
  };
}, App);
