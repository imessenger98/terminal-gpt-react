import openAi from "../../config";

/**
Call OpenAI API to generate a response to the user's message
@async
@function
@param {string} question - The user's message to generate a response for
@returns {Promise<string>} - The response generated by the OpenAI API
@throws {Error} - Any errors that occur during the API call
*/
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