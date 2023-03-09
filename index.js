const express = require("express");
const port = 2000;
const host = '0.0.0.0';
const app = express();
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();



/*initializing a Configuration object and passing an object to the constructor containing the property apiKey*/
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json()); // parse JSON request body

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/form/index.html');
  
});

app.post('/chatbot', function(req,res) {
  const message = req.body.message;
  console.log(`Received message: ${message}`);
  // do something with the message, e.g. send a response

  //const response = { message: 'Hello from the chatbot' };
  
  runCompletion(message,res);
});

// app.post('/chatbot', async (req, res) => {
//   try {
//     const prompt = req.body.message;
//     console.log(`Received message: ${prompt}`);
//     // do something with the message, e.g. send a response

//     const completion = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `${prompt}`,
//       temperature: 0, // Higher values means the model will take more risks.
//       max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
//       top_p: 1, // alternative to sampling with temperature, called nucleus sampling
//       frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
//       presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
//     });

//     // res.status(200).send({
//     //   bot: response.data.choices[0].text
//     // });

//     var response = completion.data.choices[0].text;
//     console.log(`Received response:${response}`);
//     res.json(response);

//   } catch (error) {
//     console.error(error)
//     res.status(500).send(error || 'Something went wrong');
//   }
// });



async function runCompletion (msg,res) {

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
      prompt: `${msg}`,
      temperature: 0, // Higher values means the model will take more risks.
      max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
  });



  var response = completion.data.choices[0].text;
  console.log(`Received response:${response}`);
  res.json(response);
  //res.json({ message: response }); 
}
app.listen(port,host);