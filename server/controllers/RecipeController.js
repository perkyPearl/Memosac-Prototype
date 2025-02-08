const Recipe= require('../Models/recipeModel');
const app=express();

app.createRecipe= async(req, res)=>{
    try{
        const recipe=new Recipe(req.body);
        await recipe.save();

        res.status(201).json({message: "Recipe created successfully", recipe});
    }
    catch(err){
        res.status(500).json({message: "Error occured"});
    }
};

app.getAllRecipes= async(req, res)=>{
    try{
        const{category, tags, name}= req.query;
        let filter={};

        if(category) filter.category=category;
        if(tags) filter.tags={$in: tags.split(',')};
        if(name) filter.name=new RegExp(name, 'i');

        const recipes= await Recipe.find(filter);

        res.status(200).json(recipes);
    }
    catch(err){
        res.status(500).json({message: "Error ocuured"});
    }
};

app.getRecipeById= async (req, res)=>{
    try{
        const recipe= await Recipe.findById(req.params.id);

        if(!recipe) return res.status(404).json({message: "Recipe not found"});

        res.status(200).json(recipe);
    }
    catch(err){
        res.status(500).json({message: "Error occured"});
    }
};

app.updateRecipe= async(req, res)=>{
    try{
        const updatedRecipe=await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!updatedRecipe) return res.status(404).json({message:"Recipe not found"});

        res.status(200).json({message: 'Recipe updated succesfully!', updatedRecipe});
    }
    catch(err){
        res.status(500).json({message: "Error occured"});
    }
}

app.deleteRecipe= async(req, res)=>{
    try{
        const deletedRecipe= await Recipe.findIdAndDelete(req.params.id);

        if(!deletedRecipe) return res.status(404).json({message: "Recipe not found"});

        res.status(200).json({message: "Recipe deleted successfully!"});
    }
    catch(err){
        res.status(500).json({message:"Error occured"});
    }
}

app.rateRecipe= async(req, res)=>{
    try{
        const{rating}= req.body;
        const userId= req.user.id;
        const{id}= req.params;

        if(!rating || rating<1 || rating>5){
            return res.status(400).json({message: "Rating must be between 1 and 5!"});
        }

        const recipe=await Recipe.findById(id);
        if(!recipe) return res.status(404).json({message: "Recipe not found!"});

        const existingRating= recipe.ratings.find(r=> r.user.toString()===userId);

        if(existingRating){
            existingRating.rating=rating;
        }
        else{
            recipe.ratings.push({user: userId, rating});
        }

        const totalRatings= recipe.ratings.reduce((Sum, r)=>sum + r.rating, 0);
        recipe.averageRating= totalRatings/ recipe.ratings.length;

        await recipe.save();

        res.status(200).json({message: "Recipe saved successfully!", recipe});
    }
    catch(err){
        res.status(500).json({message: "Error occured"});
    }
}