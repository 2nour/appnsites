const express= require('express');
const bodyParser= require('body-parser');
const cors= require('cors');
var firebase= require('firebase');
var admin = require("firebase-admin");


var firebaseConfig = {
    apiKey: "AIzaSyBFuDmbcxTAFYK9NT3vdM7pBoQvS_HnnQw",
    authDomain: "appnsites.firebaseapp.com",
    databaseURL: "https://appnsites.firebaseio.com",
    projectId: "appnsites",
    storageBucket: "appnsites.appspot.com",
    messagingSenderId: "875760668880",
    appId: "1:875760668880:web:b6c9cdd19c1dd258008ed5",
    measurementId: "G-D8TR4J4GEQ"
  };

  firebase.initializeApp(firebaseConfig);
 


const app = express();
app.use(cors());
app.use(bodyParser.json());

var port ="3000";


// Server
app.listen(port, () => console.log(`Listening on port ${port}`));



    
//Fetch instances
app.get('/all', function (req, res) {

	console.log("HTTP Get Request");
	var profileReference = firebase.database().ref("/Profiles/");

	
	profileReference.on("value", 
			  function(snapshot) {
					res.json(snapshot.val());
					profileReference.off("value");
					}, 
			  function (errorObject) {
					res.send("The read failed: " + errorObject.code);
			 });
})


  
//Create new instance
app.put('/addprofile', function (req, res) {

	console.log("HTTP Put Request");

	var id = req.body.id;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
	var email = req.body.email;

	var referencePath = '/Profiles/'+id+'/';
	var profileReference = firebase.database().ref(referencePath);
	profileReference.set({firstname: firstname,lastname:lastname, email: email}, 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});


//update instance
app.put('/updateprofile', function (req, res) {

	console.log("HTTP Put Request");

	var id = req.body.id;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
	var email = req.body.email;

	var referencePath = '/Profiles/'+id+'/';
	var profileReference = firebase.database().ref(referencePath);
	profileReference.update({firstname: firstname,lastname:lastname, email: email}, 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});

