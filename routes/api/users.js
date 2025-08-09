import express from 'express';
import User from '../../models/User.js';

const router = express.Router();


router.get('/',async (req,res)=>{

const users = await User.find({});
const usernames = users.map((user)=>user.username);
res.send(usernames + '\n');


});

router.get('/user/:username', async(req,res)=>{

const {username} = req.params;
try{
console.log(username);
const user = await User.findOne({username});
console.log(user);
if(!user){
return res.status(404).send(`User with username:${username} does not exist `);
}
res.status(200).send(user);

}
catch(err){
return res.status(500).send("Server Error Occured");
}

});
export default router;
