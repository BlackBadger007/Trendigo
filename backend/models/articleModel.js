import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true , index: true },
    content: { type: String, required: true },
});

articleSchema.index({title:'text' , content:'text'})

const Article = mongoose.model("Article" , articleSchema)
export default Article