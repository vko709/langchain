import { OpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import * as dotenv from 'dotenv';
import { LangWatch } from 'langwatch';
import { StringOutputParser } from '@langchain/core/output_parsers';

dotenv.config();
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

  const outputParser = new StringOutputParser();

const model = new OpenAI({
    openAIApiKey: process.env.OPEN_API_KEY,
    temperature : 0.9
})

const template = "How to learn python?";

const prompt = ChatPromptTemplate.fromTemplate(template);

const chain = prompt.pipe(model).pipe(outputParser);

const res = await chain.invoke({product: "colorful socks", adjective: "funny" });

console.log(res);