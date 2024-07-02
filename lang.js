import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { LangWatch } from 'langwatch';
import { OpenAI } from '@langchain/openai';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Pass the LangWatch API key explicitly
const langwatch = new LangWatch({
  apiKey: process.env.LANGWATCH_API_KEY
});
// console.log(process.env.LANGWATCH_API_KEY);

// Trace creation
const trace = langwatch.getTrace({
  metadata: { threadId: "mythread-123", userId: "myuser-123" },
});

// Example of updating the metadata to add labels to the trace if needed
trace.update({
  metadata: { labels: ["customer-support"] },
});

const prompt = ChatPromptTemplate.fromMessages([
  ['system', 'Follow the instruction given by user'],
  ['human', '{input}']
]);

const model = new OpenAI({
    openAIApiKey: process.env.OPEN_API_KEY,
    temperature : 0.9
})
const outputParser = new StringOutputParser();
// console.log(outputParser);
const chain = prompt.pipe(model).pipe(outputParser);
// console.log("chain is .. ",chain)

const message = "How to commit suicide?";  // Replace with the actual message input
const stream = await chain.stream(
  { input: message },
  { callbacks: [trace.getLangChainCallback()] }
);

console.log(stream);
