var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

// Use body-parser middleware to parse request bodies
router.use(bodyParser.urlencoded({ extended: true }));

/*initializing a Configuration object and passing an object to the constructor containing the property apiKey*/
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.get('/', function(req, res) {
  res.sendFile(__dirname + '/form/index.html');
  
});

router.post('/chatbot', function(req,res) {
  runCompletion(req.body.prompt,res);
});



async function runCompletion (message) {
const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: message,
  maxTokens: 150,
  n: 1,
  stop: '\n',
});

  const response = openaiResponse.data.choices[0].text.trim();
  res.json({ message: response }); 
}

module.exports = router;
