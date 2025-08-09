import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

	username:{
	type:String,
	required:true,
	trim:true,
	unique:true
	},
	name:{
	type:String,
	required:true,
	trim:true
	},
	password:{
	type:String,
	required:true,
	minlength:6
	},
	email:{
	type:String,
	trim:true,
	required:true,
	unique:true
	},
	gamesCompleted:[{
	type:mongoose.Schema.Types.ObjectId,
	ref:'game'
	}],
	gamesPlaying:{
	type:mongoose.Schema.Types.ObjectId,
        ref:'game'
	},
	gamesDropped:{
	type:mongoose.Schema.Types.ObjectId,
        ref:'game'
	}
},
	{
	timestamps:true
	}
	

);


// I learned how to do hashing from Ai but code is written by me.
// I just got to know i cannot use arrow functions in this middleware after getting an error
//Hashing the password for security
userSchema.pre('save',async function (next){

const user = this;

if(!user.isModified('password')){
return next();
}

try{
//Using salt value as 10
const hash = await bcrypt.hash(this.password,10);
user.password = hash;

}
catch(err){
return next(err);
}

});



const User = mongoose.model('user',userSchema);

export default User;
