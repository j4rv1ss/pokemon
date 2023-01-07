import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;


const pokemonSchema = new mongoose.Schema({

   id:{
     type:ObjectId,
     ref:"Alluser",
     required:true,
     trim:true
   },
   name:{
    type:String,
    required:true,
    trim:true
   },
   attacks:{
    type:[String],
    required:true
   },
   abilities:{
    type:[String],
    required:true
   },
   image:{
    public_id:String,
    url:String,
   }

})

export const pokemon= mongoose.model("pokemon",pokemonSchema)