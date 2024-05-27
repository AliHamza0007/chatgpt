// node --version # Should be >= 18
// npm install @google/generative-ai

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

const MODEL_NAME = 'gemini-1.5-pro-latest';
const API_KEY = import.meta.env.VITE_Gemni_API_KEY;
const Output_Tokens = import.meta.env.VITE_Output_Tokens;

async function runChat(msg: string) {
  if (!API_KEY) {
    throw new Error('API key not provided.');
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: Output_Tokens,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chat.sendMessage(msg);
  const response = result.response;

  const responseArray = response.text().split('**');

  let newResponse = '';

  for (let i = 0; i < responseArray.length; i++) {
    if (i % 2 === 1) {
      newResponse += `<b>${responseArray[i]}</b>`;
    } else {
      newResponse += responseArray[i];
    }
  }

  // Replace "*" with "<br/>"
  const newResponseWithBreaks = newResponse.split('*').join('<br/>');

  // Define custom hook for typewriter effect

  return newResponseWithBreaks;
}

export default runChat;
