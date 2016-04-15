import { Mongo } from 'meteor/mongo';
export const Task = new Mongo.Collection("tasks");
Task.allow({
  insert: function(){
    return false;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
