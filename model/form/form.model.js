const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  }, 
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'question', // Reference to the QuestionModel
    }
  ],
  responses: [{ type: mongoose.Schema.Types.Mixed }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'auth', // Reference to the Auth model
    required: true
  },
},
{
    versionKey:false,
    timestamps:true
});

const Form = mongoose.model('form', formSchema);

module.exports = Form;
