const express = require("express");
const app = express.Router();
const { createForm, getForm, addQuestion, submitForm } = require("../../controller/form/form.controller");
const authMiddleware = require("../../middleware/auth.middleware");

app.route('/').get(getForm);
app.use('/', authMiddleware);
app.route('/create-forms').post(createForm);
app.route('/:formId/questions').post(addQuestion);
app.route('/:formId/submit').post(submitForm);

module.exports = app;