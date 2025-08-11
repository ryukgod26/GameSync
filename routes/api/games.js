import express from 'express';
import mongoose from 'mongoose';
import Game from '../../models/Game.js'
import authenticateToken from './authenticateToken.js';
import User from '../../models/User.js';

const router = express.Router();

router.get('/', async(req,res)=>{
	
	const games = await Game.find({});
	const title = games.map(game=>game.title);
	res.send(title + '\n');

});

router.get('/game/',async (req ,res)=>{
	
const {genre,title} = req.query;
const query={};
if(genre){
const games = await Game.find({genre:{$regex:genre,$options:'i'}});
res.json(games);
}



else if(title){
const game = await Game.findOne({title:{$regex:title,$options:'i'}});
res.json(game);
}
});

router.put('/add/gamesCompleted/',authenticateToken,async (req,res)=>{

const userId = req.user.id;
const {title} = req.body;

const user = await User.findById(userId);
const game = await Game.findOne({title:{$regex:title,$options:'i'}});
let message = ``;

if(!game){
return res.json({'message':`Game with title ${title} does not exist.`});
}
//Removing the game from games Playing list
if(user.gamesPlaying){
if(user.gamesPlaying.length>0){
for(const gamePlaying of user.gamesPlaying){
if(gamePlaying == game.id){
await User.updateOne(
	{_id:userId},
	{$pull:{gamesPlaying:game.id}}
);
message= `${game.title} has been deleted from the Games Playing List.`;
}
}
}
else{
if(user.gamesPlaying == game.id){
await User.updateOne(
	{_id:userId},
	{$pull:{gamesPlaying:game.id}}
);
message= `${game.title} has been deleted from the Games Playing List.`;
}
}
}


//Removing the game fron games Dropped list
if(user.gamesDropped){
if(user.gamesDropped.length>0){
for(const gameDropped of user.gamesDropped){
if(gameDropped == game.id){
await User.updateOne(
        {_id:userId},
        {$pull:{gamesDropped:game.id}}
);
message= `${game.title} has been deleted from the Games Dropped List.`;
}
}
}

else{
if(user.gamesDropped == game.id){
await User.updateOne(
        {_id:userId},
        {$pull:{gamesDropped:game.id}}
);
}
}
}

message= `${game.title} has been deleted from the Games Dropped List.`;

await User.updateOne(
	{_id:userId},
	{$addToSet:{gamesCompleted:game.id}}
);

//console.log(User);
res.json({'message': message + `Game ${title} has been added to your games completed list.`});

});


router.put('/add/gamesPlaying/',authenticateToken,async (req,res)=>{

const userId = req.user.id;
const {title} = req.body;

const user = await User.findById(userId);
const game = await Game.findOne({title:{$regex:title,$options:'i'}});

if(!game){
return res.json({'message':`Game with title ${title} does not exist.`});
}


//Removing the game fron games Dropped list
if(user.gamesDropped){
if(user.gamesDropped.length>0){
for(const gameDropped of user.gamesDropped){
if(gameDropped == game.id){
await User.updateOne(
        {_id:userId},
        {$pull:{gamesDropped:game.id}}
);
message= `${game.title} has been deleted from the Games Dropped List.`;
}
}
}

else{
if(user.gamesDropped == game.id){
await User.updateOne(
        {_id:userId},
        {$pull:{gamesDropped:game.id}}
);
message= `${game.title} has been deleted from the Games Dropped List.`;
}
}
}





//Removing the game fron games Completed list
if(user.gamesCompleted){
if(user.gamesCompleted.length>0){
for(const gameCompleted of user.gamesCompleted){
if(gameCompleted == game.id){
await User.updateOne(
        {_id:userId},
        {$pull:{gamesCompleted:game.id}}
);
message= `${game.title} has been deleted from the Games Completed List.`;
}
}
}

else{
if(user.gamesCompleted == game.id){
await User.updateOne(
        {_id:userId},
        {$pull:{gamesCompleted:game.id}}
);
message= `${game.title} has been deleted from the Games Completed List.`;


await User.updateOne(
	{_id:userId},
	{$addToSet:{gamesPlaying:game.id}}

);
}
}
}

res.json({'message':`Game ${title} has been added to your games Playing list.`});

});






router.delete('/delete/gamesDropped/:title',authenticateToken,async (req,res)=>{

const userId = req.user.id;
const {title} = req.params;

const user = User.findById(userId);
const game = await Game.findOne({title:{$regex:title,$options:'i'}});
let message = ``;
if(!game){

return res.json({'message':`Game with title ${title} does not exist.`});
}
//Removing the game fron games Playing list
if(user.gamesPlaying){
if(user.gamesPlaying.length>0){
for(const gamePlaying of user.gamesPlaying){
if(gamePlaying == game.id){
await User.updateOne(
	{_id:userId},
	{$pull:{gamesPlaying:game.id}}
);
message= `${game.title} has been deleted from the Games Playing List.`;
}
}
}

else{
if(user.gamesPlaying == game.id){
await User.updateOne(
	{_id:userId},
	{$pull:{gamesPlaying:game.id}}
);
message= `${game.title} has been deleted from the Games Playing List.`;

}
}
}


//Removing the game fron games Completed list
if(user.gamesCompleted){
if(user.gamesCompleted.length>0){
for(const gameCompleted of user.gamesCompleted){
if(gameCompleted == game.id){
await User.updateOne(
        {_id:userId},
        {$pull:{gamesCompleted:game.id}}
);
message= `${game.title} has been deleted from the Games Completed List.`;
}
}
}

else{
if(user.gamesCompleted == game.id){
await User.updateOne(
        {_id:userId},
        {$pull:{gamesCompleted:game.id}}
);
message= `${game.title} has been deleted from the Games Completed List.`;

}
}
}



await User.updateOne(
	{_id:userId},
	{$addToSet:{gamesDropped:game.id}}

);
res.json({'message': message + `Game ${title} has been added to your games Dropped list.`});
});
export default router;
