import openai

# Set API Key
openai.api_key = 'your-api-key'

def chatbot_response(user_input):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": user_input}]
    )
    return response['choices'][0]['message']['content']
