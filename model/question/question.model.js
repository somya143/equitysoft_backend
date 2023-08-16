const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  valueType: {
    type: String,
    enum: ['Integer', 'Float', 'Text', 'Date', 'DateTime'],
    required: true,
  },
},{
    versionKey: false,
    timestamps:true
});

const QuestionModel = mongoose.model('question', questionSchema);

module.exports = QuestionModel;
