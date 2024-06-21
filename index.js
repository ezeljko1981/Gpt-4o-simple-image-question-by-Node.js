import OpenAI from 'openai';
import colors from 'colors';
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function ask(question, targetUrl) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: question },
          {
            type: "image_url",
            image_url: {
              "url": targetUrl,
            },
          },
        ],
      },
    ],
  });
  //console.log(response.choices[0]);
  
  console.log(colors.bold.blue("user: " + question + " for image on " + targetUrl));
  console.log(colors.bold.green(response.choices[0].message.role + ": " + response.choices[0].message.content));
  
}

ask("What’s in this image?","https://i.imgur.com/fNXdwHw.png");
