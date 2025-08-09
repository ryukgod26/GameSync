import express from 'express';
import mongoose from 'mongoose';
import Game from '../../models/Game.js'

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
export default router;
