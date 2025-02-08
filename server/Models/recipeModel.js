const mongoose=require('mongoose');
const {Schema, model}=mongoose;

const RecipeSchema= new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    ingredients: [{type: String, required:true}],
    instructions: {type: String, required:true},
    imageUrl: {type:String},
    cookingTime:{type: Number, required: true},
    category:{type: String, required: true},
    tags:[{type:String}],
    author: {type: mongoose.Schema.Types.Object.Id, ref:"User", required:true},
    createdAt:{type: Date, default: Date.now},
    ratings:[
        {
            user: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
            rating: {type:Number, min:1, max:5},
        }
    ],
    averageRating: {type:Number, default:0}
});

const RecipeModel= model('Recipe, RecipeSchema');
module.exports=RecipeModel;