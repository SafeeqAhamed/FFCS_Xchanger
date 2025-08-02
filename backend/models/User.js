const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/@vitstudent\.ac\.in$/, 'Only VIT student emails are allowed'],
  },
  password: {
    type: String,
    required: true,   //must provide
  },
});

module.exports = mongoose.model('User', userSchema);   //mongoose convert to lowercase
                                                        //collection name=lowerplural(model name) 
                                                            //'User'	users
                                                             //'Faculty'	faculties