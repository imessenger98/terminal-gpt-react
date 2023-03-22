import openAi from "../config";

async function callOpenAi(question) {
  try {
    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    return error.message;
  }
}

export default callOpenAi;
