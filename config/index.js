import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey:  import.meta.env.VITE_SECRET_KEY || localStorage.getItem("token") || null,
});

const openAi = new OpenAIApi(configuration);
export default openAi;
