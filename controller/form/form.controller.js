const express = require("express");
const app = express.Router();
const Form = require("../../model/form/form.model");
const Question = require("../../model/question/question.model");

// Creating new form
exports.createForm = async(req,res,next) => {
    try {
        const { title } = req.body;
        const createdBy = req.auth._id
        const form = new Form({
          title,
          createdBy 
        });
        const savedForm = await form.save();
        res.send(savedForm);
      } catch (error) {
        res.status(500).send({ message: error.message, error: true });
      }
};

// Get a list of forms for a user
exports.getForm = async(req,res,next) => {
    try {
        const forms = await Form.find().populate(["questions","responses"]).exec(); 
        res.send(forms);
      } catch (error) {
        res.status(500).send({ message: error.message, error: true });
      }
};

// Adding questions to a form
exports.addQuestion = async (req, res, next) => {
    try {
        const { formId } = req.params;
        const { questionText, valueType } = req.body;
        
        const form = await Form.findById(formId).populate("questions").exec();// Finding the form by its ID
        if (!form) {
            return res.status(404).send({ message: 'Form not found', error: true });
        }
        form.questions.forEach((question) => {
          const matchingQuestion = form.questions.find((q) => q._id.equals(question._id));
          if (matchingQuestion) {
            question.questionText = matchingQuestion.questionText;
            question.valueType = matchingQuestion.valueType;
          }
        });
        // Creating a new question and save it
        const newQuestion = new Question({
            questionText,
            valueType
        });
        await newQuestion.save();

        // Adding the new question's ID to the form's questions array
        form.questions.push(newQuestion);
        await form.save();

        res.send(form);
    } catch (error) {
        res.status(500).send({ message: error.message, error: true });
    }
};

// Submitting the form
exports.submitForm = async (req, res, next) => {
  try {
    const { formId } = req.params;
    const { responses } = req.body;

    // Finding the form by its ID
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).send({ message: 'Form not found', error: true });
    }

    // Create an array to store promises for responses
    const responsePromises = responses.map(async (response) => {
      const { questionId, responseValue } = response;
      form.responses.push({ questionId, responseValue });
    });

    // Await all response promises to complete
    await Promise.all(responsePromises);

    await form.save();

    res.send(form);
  } catch (error) {
    res.status(500).send({ message: error.message, error: true });
  }
};




