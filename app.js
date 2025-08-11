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

let message = "This is a small project created by me.This is a robust backend Api for gamers.They can add games in their profiles in different catofries like Games they have Completed, Games They are Playing and Games they have Dropped. This Project as the Complete Server side logic for the Application.You can Easily build apps or Websites with this Api.(One more Thing I have never Wrote a Readme File before So Please Igmore mistakes in Readme File).Visit https://github.com/ryukgod26/GameSync.git For more Info."
	res.json({"message":message});

});

app.use('/health/',(req,res)=>{

res.status(200).send("OK");

});


app.listen(PORT,()=>{

console.log(`Server is Listening on Port: ${PORT}`);

});
