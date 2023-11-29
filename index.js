const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config()

const openai = new OpenAI({
  apiKey: process.env.api,
});

app.post('/translate', async (req, res) => {
  const { content, language } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        "role": 'system',
        "content": `translate ${content} to ${language} and give the translation only`
      }],
    });
    const data = response.choices[0]
    console.log(data);
    res.status(200).json({ data: data });
  } catch (e) {
    res.status(500).json({
      message: e,
    });
    console.log(e);
  }
});

app.get('/', (req, res) => {
  res.send('Hi')
});

app.listen(8000, () => {
  console.log('http://localhost:8000');
});
