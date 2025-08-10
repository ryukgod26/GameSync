import express from 'express';
import User from '../../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import authenticateToken from './authenticateToken.js';

const router = express.Router();


router.get('/',async (req,res)=>{

const users = await User.find({});
const usernames = users.map((user)=>user.username);
res.send(usernames + '\n');


});

router.get('/:username/', async(req,res)=>{

const {username} = req.params;
try{
//console.log(username);
const user = await User.findOne({username});
//console.log(user);
if(!user){
return res.status(404).json(`User with username:${username} does not exist `);
}
console.log("Following Count:" + user.followingCount);
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

const userPayload = {id : user.id,username:user.username};
const jwtToken = jwt.sign(userPayload,process.env.JWT_SECRET_KEY,{expiresIn:'30min'});
res.json({jwtToken});
}

catch(err){
console.log(err);
res.status(500).json({'message':'Internal Server Error.'});
}

});

router.post('/me/',authenticateToken,(req,res)=>{

const payload = req.user;
const user = User.findOne({id:payload.id});
console.log("test");
const details= {
'username':user.username,
'name':user.name,
'email':user.email,
"Games Completed" : user.gamesCompleted,
"Games Playing" : user.gamesPlaying,
"Games Dropped" : user.gamesDropped,
"Number of Followers" : user.followersCount,
"Number of Following":user.followingCount

};
console.log(details);
res.json(details);

});

export default router;
