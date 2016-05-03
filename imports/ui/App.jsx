import React,  { Component,  PropTypes } from 'react';

import ReactDOM from 'react-dom';

//import react-meteor-data for working with collections
import { createContainer } from 'meteor/react-meteor-data';

//collection created
import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

//import AccountUIWarpper to use Blaze accounts-ui in React component
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }
  // getTasks(){
  //   return [
  //     {_id: 1, text: 'This is task 1' },
  //     {_id: 2, text: 'This is task 2' },
  //     {_id: 3, text: 'This is task 3' },
  //     {_id: 4, text: 'This is task 4' }
  //   ];
  // }
  //
  // this.propTypes = {
  //   tasks: PropTypes.array.isRequired,
  // }
  handleSubmit(event){
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call("tasks.insert", text);

    ReactDOM.findDOMNode(this.refs.textInput).value = '';

  }

  toggleHideCompleted(){
    this.setState({
       hideCompleted: !this.state.hideCompleted,
     });
    // this.forceUpdate();
  }

  renderHideTask(){
    let tasksCopy = this.props.tasks,
        output = <small className='hide-completed'>There are not taks yet, Loggin !</small>,
        label = <label className="hide-completed">
          <input
          type = "checkbox"
          readOnly
          checked = { this.props.hideCompleted }
          onChange = { this.toggleHideCompleted.bind(this) }
          />
          Hide Completed Task
        </label>;
    console.log(tasksCopy.length);
    if(tasksCopy === 0){
      return label;
    } else {
      return output;
    }
  }

  renderTasks(){

    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUser = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUser;
      return (
        <Task
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
          />
      )
    });
  }

  render(){
    return(
      <div className="container">
        <header>

          <AccountsUIWrapper />

          <h1>Todo List { this.props.incompletedCountTasks }</h1>

          { this.renderHideTask() }

          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type = "text"
                ref = "textInput"
                placeholder = "Type to add new tips"
                />
            </form> : ''
          }
        </header>
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompletedCountTasks: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort : { createdAt : -1 } }).fetch(),
    incompletedCountTasks: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  }
}, App);
