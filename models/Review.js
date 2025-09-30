import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
	rating:{
	type:Number,
	min:1,
	max:10,
	required:[true,'Please Provide a Rating Between 1 and 10']
	},
	reviewText:{
	type:String,
	required:[true,'Please Provide Text For Your Review.'],
	maxlength:500,
	},
	game:{
	type:mongoose.Schema.Types.ObjectId,
	ref:'Game',
	required:true,
	},
	user:{
	type:mongoose.Schema.Types.ObjectId,
	ref:'User',
	required:true
	},},
	{
	timestamps:true
	}

);


const Review = mongoose.model('Review',reviewSchema);
export default Review;
