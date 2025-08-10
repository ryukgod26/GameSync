import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import gamesApi from './routes/api/games.js';
import usersApi from './routes/api/users.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 4000;

mongoose.connect(process.env.MONGO_URI,{}).then(console.log("Connected"))
	.catch((err)=>console.log(`Error Connecting to Database\n Error:${err}`));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/games',gamesApi);
app.use('/users',usersApi);



app.use('/',(req,res)=>{

let message = "This is a Api created to store your and view others gaming information or status. Like what game are they playing and which games have they completed. You can also post reviews on games You have Played and view other people reviews."
	res.send(message);

});
app.listen(PORT,()=>{

console.log(`Server is Listening on Port: ${PORT}`);

});
