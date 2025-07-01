# chatbot/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from openai import OpenAI
import os

# Initialize the OpenAI client
# (You might want to load your API key from environment variables)
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key= "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"  # set this in your env
)
#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

class ChatbotConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # For a chatbot, you don't need a group: each connection is individual.
        self.conversation_history = [{
            "role": "system",
            "content": (
                "You are StudyBuddy, a friendly chatbot assistant that helps students study. "
                "When a student asks a question, guide them with hints, explanations, and encouragement. "
                "Focus on helping them understand concepts rather than giving direct answers, "
                "and maintain a supportive, patient tone throughout."
            )
        }]# In-memory conversation context
        await self.accept()

    async def disconnect(self, close_code):
        # Optionally, clear conversation or persist history.
        self.conversation_history = []

    async def receive(self, text_data=None, bytes_data=None):
        if not text_data:
            return

        try:
            data = json.loads(text_data)
        except json.JSONDecodeError:
            await self.send(text_data=json.dumps({"error": "Invalid JSON"}))
            return

        user_message = data.get("message", "")
        if not user_message:
            await self.send(text_data=json.dumps({"error": "No message provided"}))
            return

        # Append user message to conversation history
        self.conversation_history.append({
            "role": "user",
            "content": user_message
        })

        await self.send(text_data=json.dumps({"typing": True}))
        
        # Build the full conversation context:
        messages = self.conversation_history.copy()

        # Call the OpenRouter API asynchronously (using a threadpool if needed)
        response_text = await self.get_chatbot_response(messages)

        # Append chatbot response to conversation history
        self.conversation_history.append({
            "role": "assistant",
            "content": response_text
        })

        # Send the response back to the client
        await self.send(text_data=json.dumps({
            "message": response_text
        }))

    async def get_chatbot_response(self, messages):
        # Use an async wrapper since the openai API call is synchronous
        from asgiref.sync import sync_to_async
        response = await sync_to_async(self.call_chatbot)(messages)
        return response

    def call_chatbot(self, messages):
        # Call the OpenRouter API with the conversation context
        try:
            completion = client.chat.completions.create(
            model="deepseek/deepseek-chat-v3-0324:free",
            messages=messages
        )
            # Return the assistant's response message
            return completion.choices[0].message.content
        except Exception as e:
            return f"Error: {str(e)}"
