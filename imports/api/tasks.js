import { Mongo } from 'meteor/mongo';
export const Tasks = new Mongo.Collection("tasks");

Meteor.methods({
  'tasks.insert'(text){
    check(text, String);
    if(!Meteor.userId()){
      throw new Meteor.Error('no-authorized');
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.user(),
      username: Meteor.user().username,
    });

  },

  'tasks.remove'(taskId){
    check(taskId, String);

    Tasks.remove(taskId);
  },

  'tasks.setChecked'(taskId, setChecked){
    check(taskId, String);
    check(setChecked, Boolean);

    Tasks.update(taskId,
      {
        $set: { checked : setChecked }
      }
    );
  },

  'tasks.setPrivate'(taskId, setToPrivate){
    check(taskId, String);
    check(setToPrivate, Boolean;

    const tasks = Tasks.findOne( taskId );

    if(task.owner !== this.userId()) {
      throw new Meteor.Error("no-authorized");
    }

    Tasks.update( taskId,
       {
         $set: { private : setToPrivate }
       }
     );

  },
});
Tasks.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
