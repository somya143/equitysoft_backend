const express = require("express");
const app = express.Router();
const Form = require("../../model/form/form.model");
const Question = require("../../model/question/question.model");

// Creating new form
exports.createForm = async(req,res,next) => {
    try {
        const { title, questions } = req.body;
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
        // Creating a new question and save it
        const newQuestion = new Question({
            questionText,
            valueType
        });
        await newQuestion.save();

        // Adding the new question's ID to the form's questions array
        form.questions.push(newQuestion._id);
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
    
        // Looping through the responses and adding them to the form's responses array
        responses.forEach(async (response) => {
          const { questionId, responseValue } = response;
          form.responses.push({ questionId, responseValue });
        });
    
        await form.save();
    
        res.send(form);
      } catch (error) {
        res.status(500).send({ message: error.message, error: true })
      }
};



