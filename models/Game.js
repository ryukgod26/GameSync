import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({

title:{
	type:String,
	trim:true,
	required:true,
	unique:true
},
	genre:{
	type:String,
	required:true,
	trim:true
}},

{
timestamps:true
});

const Game = mongoose.model('Game',gameSchema);

export default Game;
