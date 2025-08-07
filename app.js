const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PORT = 4000;

dotenv.config();
mongoose.connect(process.env.MONGO_URI,{}).then(console.log("Connected"))
	.catch((err)=>console.log(`Error Connecting to Database\n Error:${err}`));

const gamesApi = require('./routes/api/games');
const usersApi = require('./routes/api/users');


app.use('/',gamesApi);
app.use('/',usersApi);



app.use('/',(req,res)=>{

let message = "This is a Api created to store your and view others gaming information or status. Like what game are they playing and which games have they completed. You can also post reviews on games You have Played and view other people reviews."
	res.send(message);

});
app.listen(PORT,()=>{

console.log(`Server is Listening on Port: ${PORT}`);

});
