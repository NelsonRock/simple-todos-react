import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection("tasks");

if(Meteor.isServer){
  Meteor.publish("tasks", function publishingTasks(){
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'tasks.insert'(text){
    check(text, String);
    if(!this.userId){
      throw new Meteor.Error('no-authorized', 'You must be logge in!!');
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });

  },

  'tasks.remove'(taskId){
    check(taskId, String);

    const task = Tasks.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized', 'You should be owner to remove this task');
    }

    Tasks.remove(taskId);
  },

  'tasks.setChecked'(taskId, setChecked){
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Tasks.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can checked it
      throw new Meteor.Error('not-authorized', 'You should be owner to check this task');
    }

    Tasks.update(taskId, { $set: { checked: setChecked } } );
  },

  'tasks.setPrivate'(taskId, setToPrivate){
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Tasks.findOne(taskId);

    if(task.owner !== this.userId) {
      throw new Meteor.Error('no-authorized', 'You should be owner to make private this task');
    }

    Tasks.update( taskId, { $set: { private : setToPrivate } } );

  },

});
