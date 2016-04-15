import { Mongo } from 'meteor/mongo';
export const Tasks = new Mongo.Collection("tasks");
Tasks.allow({
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
