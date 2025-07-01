# chat/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from chat.models import ChatMessage
from classes.models import Class

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.class_id = self.scope['url_route']['kwargs']['class_id']
        self.group_name = f"class_{self.class_id}"

        # Check if the user is authenticated and allowed to join the chat.
        user = self.scope["user"]
        if not user.is_authenticated:
            await self.close()
            return

        allowed = await self.check_membership(user, self.class_id)
        if not allowed:
            await self.close()
            return

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

        # Send recent chat history (last 100 messages)
        await self.send_chat_history()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        if not text_data:
            return

        try:
            data = json.loads(text_data)
        except json.JSONDecodeError:
            await self.send(text_data=json.dumps({"error": "Invalid JSON received"}))
            return

        message = data.get("message", "").strip()
        if not message:
            return  # ignore empty messages

        user = self.scope["user"]

        # Save the message to the database
        chat_message = await self.save_message(user, self.class_id, message)

        # Broadcast the message to the group
        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "chat_message",
                "message": message,
                "username": user.username,
                "timestamp": chat_message.timestamp.isoformat(),
            }
        )

    async def chat_message(self, event):
        # send a flat object so client can parse .message/.username/.timestamp
        await self.send(text_data=json.dumps({
            "message": event["message"],
            "sender": event["username"],
            "time": event["timestamp"],
        }))

    async def send_chat_history(self):
        # fetch last 100 messages in chronological order
        msgs = await self.get_chat_history(self.class_id)
        history = []
        for msg in msgs:
            history.append({
                "message": msg.content,
                "sender": msg.sender.username,
                "time": msg.timestamp.isoformat(),
            })
        # send as plain array so client onmessage handles Array.isArray
        await self.send(text_data=json.dumps(history))

    @database_sync_to_async
    def save_message(self, user, class_id, message):
        class_obj = Class.objects.get(pk=class_id)
        return ChatMessage.objects.create(
            class_obj=class_obj,
            sender=user,
            content=message
        )

    @database_sync_to_async
    def get_chat_history(self, class_id):
        # Return the last 100 messages in chronological order
        qs = ChatMessage.objects.filter(class_obj_id=class_id).select_related("sender").order_by("-timestamp")[:100]
        return list(reversed(qs))

    @database_sync_to_async
    def check_membership(self, user, class_id):
        try:
            class_obj = Class.objects.get(pk=class_id)
        except Class.DoesNotExist:
            return False
        return user == class_obj.author or user in class_obj.enrolled_students.all()
