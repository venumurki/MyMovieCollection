Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isClient) {  
  Template.body.helpers({
	
    resolutions: function() {
	  return Resolutions.find({});
	}
  });
  
  Template.body.events({
  'submit .red_color': function(event) {
  var title = event.target.title.value;
  var year = event.target.year.value;  
  var e = document.getElementById("movieGenre");
  var genre= e.options[e.selectedIndex].text;
  
  Meteor.call("addResolution", title,year,genre);
  
  event.target.title.value = "";
  event.target.year.value = "";
  event.target.genre.value = "";
    
	return false;
  }	  
     
  });
  
  Template.collection.events({
      'click .delete': function() {
           Meteor.call("deleteResolution",this._id);
		    
	  },   
  
      'click .update_movie': function() {
           Meteor.call("updateResolution",this._id);
		   $('#add_or_update_movie').show();
			 $('#update_movie').hide();
	  },   
	  
      'click .edit': function() {
          
		     $('input[name="title"]').val(this.title);
			 $('input[name="year"]').val(this.year);
			  $('#movieGenre').val(this.genre).trigger('change');
			 $('#add_or_update_movie').hide();
			 $('#update_movie').show();
		    
	  } 	  
  });
  
  Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}



Meteor.methods({
    addResolution: function(title,year,genre) {
	
	if(title==undefined || title==null || title=="")
	{
		alert("Enter the title ");
	}
	else
	if(year==undefined || year== null || year==""){
		alert("Enter year ");
	}
	else
	if(genre=="Select Genre.."){
		alert("Select the genre");
	}
	else{		 
		   Resolutions.update(
	
			{title: title},
			{
			title: title,
			year: year,  
			genre: genre,
			createdAt: new Date()  
			},
			{upsert: true}
			)
		}
	},
	updateResolution:function(id){
		if(title==undefined || title==null || title=="")
	{
		alert("Enter the title ");
	}
	else
	if(year==undefined || year== null || year==""){
		alert("Enter year ");
	}
	else
	if(genre=="Select Genre.."){
		alert("Select the genre");
	}
	else{		 
	
		   Resolutions.update(
	
			{id: id},
			{
			title: title,
			year: year,  
			genre: genre,
			createdAt: new Date()  
			},
			{upsert: true}
			)
		}
	},
	deleteResolution: function(id) {
	     Resolutions.remove(id);
	},
	
	
	
});
