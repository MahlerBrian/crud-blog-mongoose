'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


let authorSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: {
    type: String,
    unique: true
  }
});

let commentSchema = mongoose.Schema({
  content: String
});

//let vs const?  'type' vs no type?  String vs 'string'?
let blogPostSchema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  title: {type: String, required: true},
  content: {type: String},
  created: {type: Date, default: Date.now},
  comments: [commentSchema]
});

authorSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

authorSchema.methods.serialize = function() {
  return {
    id: this._id,
    author: this.authorName,
    userName: this.userName
  };
};

blogPostSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogPostSchema.methods.serialize = function() {
  return {
    id: this._id,
    author: this.authorName,
    content: this.content,
    title: this.title,
    created: this.created,
    comments: this.comments
  };
};





//why is Author variable and BlogPost constant?
let Author = mongoose.model('Author', authorSchema);
const BlogPost = mongoose.model('Blog', blogPostSchema);





module.exports = {Author, BlogPost};