import express from 'express';
import User from '../../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import authenticateToken from './authenticateToken.js';
import Game from '../../models/Game.js';

const router = express.Router();


router.get('/',async (req,res)=>{

const users = await User.find({});
const usernames = users.map((user)=>user.username);
res.send(usernames + '\n');


});

router.get('/search/:username/', async(req,res)=>{

const {username} = req.params;
try{
//console.log(username);
const user = await User.findOne({username});
//console.log(user);
if(!user){
return res.status(404).json(`User with username:${username} does not exist `);
}
//console.log("Following Count:" + user.followingCount);
const details = {"name":user.name,"username":user.username,"Games Completed":user.gamesCompleted,'followersCount':user.followersCount,'followingCount':user.followingCount};
res.status(200).json(details);

}
catch(err){
return res.status(500).json({message:"Server Error Occured"});
}

});

router.post('/register/',async (req,res)=>{

const {username,name,email,password} = req.body;
if(!username || !name || !email || !password || password.length < 6){
return res.json({'message':'Please Provide all the fields which are username,name,email and password (must be 6 characters long'});
}
try{
const alreadyExist = await User.findOne({email});
const alreadyExist1 = await User.findOne({username});
if(alreadyExist){
//I searched about response code for conflicts on ai and got this
return res.status(409).json({"message" : 'User with this Email already exists.'});
}
if(alreadyExist1){
return res.status(409).json({"message": "User with this username already exists."});
}
const newUser = new User({
username,
name,
password,
email
});

const savedUser = await newUser.save();
res.status(201).json({'message':'User Saved Successfully.'});
}
catch(err){
res.send(err);
}
});

router.post('/login/', async (req,res) =>{

const {username,password} = req.body;

if(!username || !password){
return res.json({'message':'Please Provide Username and Password to Log In'});
}

try{
const user = await User.findOne({username});

if(!user){
res.json({'message':'User with this username does not exist'});
}
const isPassMatched = await bcrypt.compare(password,user.password);
if(!isPassMatched){
res.json({'message':'Wrong Password.'});
}
const now = new Date();
const userPayload = {id : user.id,username:user.username,issuedAt:now};
const jwtToken = jwt.sign(userPayload,process.env.JWT_SECRET_KEY,{expiresIn:'30min'});
res.json({jwtToken});
}

catch(err){
console.log(err);
res.status(500).json({'message':'Internal Server Error.'});
}

});

router.get('/profile/',authenticateToken,async (req,res)=>{

const payload = req.user;
//console.log(payload);
const user = await User.findById(payload.id).select('-password');
//console.log("test");
let gamesCompleted=[];
let gamesPlaying =[];
let gamesDropped = [];

if(user.gamesCompleted){
for(const gameCompleted of user.gamesCompleted){
const game = await Game.findById(gameCompleted);
gamesCompleted.push(game.title);
}
}
if(user.gamesPlaying){
for(const gamePlaying of user.gamesPlaying){
const game = await Game.findById(gamePlaying);
gamesCompleted.push(game.title);
}
}


if(user.gamesDropped){
for(const gameDropped of user.gameaDropped){
const game = await Game.findById(gameDropped);
gamesDropped.push(game.title);
}
}
const details= {
'username':user.username,
'name':user.name,
'email':user.email,
"Games Completed" : gamesCompleted,
"Games Playing" : gamesPlaying,
"Games Dropped" : gamesDropped,
"Number of Followers" : user.followersCount,
"Number of Following":user.followingCount

};
//console.log(details);
res.json(details);

});

router.delete('/:username/unfollow/',authenticateToken,async (req,res)=>{
const {username} = req.params;
const currentUserId = req.user.id;

try{
const user = await User.findOne({username});
if(!user){
return res.json({
'message':'User with this username does not exist.'
});

}

if(user.id == currentUserId){
return res.json({
   'message':'You cannot unfollow yourself.'
});
}
const currentUser = await User.findById(currentUserId);

await User.updateOne(
	{_id:currentUserId},
	{$pull:{following:user.id}}
);


await User.updateOne(
	{_id:user.id},
	{$pull:{followers:currentUserId}}
);

res.status(200).json({
'message':`You are now not following ${user.username}.`
});

}
catch(err){
console.log(err);
return res.json({
'message':'Sever Error Occured'
});

}


});


router.post('/:username/follow/',authenticateToken,async (req,res)=>{

const {username} = req.params;
const currentUserId = req.user.id;

try{
const user = await User.findOne({username});
if(!user){
return res.json({
'message':'User with this username does not exist.'
});
}
if(user.id == currentUserId){
return res.json({
	'message':'You cannot follow yourself.'
});

}
const currentUser = await User.findById(currentUserId);

await User.updateOne(
	{_id:currentUserId},
	{$addToSet:{following:user.id}}
);

await User.updateOne(
	{_id:user.id},
	{$addToSet:{followers:currentUserId}}
);

res.status(200).json({
'message':`You are now following ${user.username}.`
});



}
catch(err){
console.log(err);
return res.json({
'message':'Sever Error Occured'
});
}

});


router.get('/profile/followers/',authenticateToken, async (req,res)=>{

const userId = req.user.id;

const user = await User.findById(userId);
let followersUsernames = [];
const followersIds = user.followers;
//console.log(user);
//console.log(followersIds);
//I just got to know I cannot use forEach loop becaude it is not a async function.
//followersIds.forEach((followerId)=>{
for(const followerId of followersIds){
//console.log(followerId);
const follower = await User.findById(followerId);
followersUsernames.push(follower.username);


}
res.json({"Usernames of followers" : followersUsernames});
});


router.get('/profile/following/',authenticateToken, async (req,res)=>{

const userId = req.user.id;

const user = await User.findById(userId);
let followingUsernames = [];
const followingIds = user.following;

for(const followingId of followingIds){

const following = await User.findById(followingId);
followingUsernames.push(following.username);
}

res.json({"Usernames of following" : followingUsernames});


});




export default router;
