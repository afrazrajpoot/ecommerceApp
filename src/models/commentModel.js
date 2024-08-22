import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  post: {
    type: String,
  },
  parent: {
    type: String,
  },
  author: {
    type: String,
  },
  author_name: {
    type: String,
 
  },
  date: {
    type: String,
  },

  content: {
    type: String,
    default: null,
  },
  author_avatar_urls: {
    type:String
  },
});

const commentModel = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default commentModel;
