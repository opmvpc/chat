<script setup>
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { onMounted, ref } from "vue";

const doc = new Y.Doc();
const yMessagesArray = doc.getArray("messages");
const messages = ref([]);

const wsURL = `ws://${import.meta.env.VITE_WS_HOST}:${
  import.meta.env.VITE_WS_PORT
}`;
const roomName = "test";

const wsProvider = new WebsocketProvider(wsURL, roomName, doc);

wsProvider.on("status", (event) => {
  console.log(event.status); // logs "connected" or "disconnected"
});

const messageInputText = ref("");
const userName = ref("");

const sendMessage = () => {
  const message = {
    user: {
      name: userName.value,
    },
    content: messageInputText.value,
  };

  yMessagesArray.push([message]);
  messageInputText.value = "";
  console.log(yMessagesArray.toArray());
  console.log(messages.value);
};

yMessagesArray.observe((event) => {
  messages.value = yMessagesArray.toArray();
  console.log(messages.value);
});

onMounted(() => {
  console.log(messages.value);
});
</script>

<template>
  <h1>Chat</h1>
  <ul v-if="messages.length > 0">
    <li v-for="(message, index) in messages" :key="`message-${index}`">
      <strong>{{ message.user.name }}</strong
      >:
      {{ message.content }}
    </li>
  </ul>

  <form @submit.prevent="sendMessage">
    <label for="name">Name</label>
    <input type="text" v-model="userName" />
    <label for="message">Message</label>
    <input type="text" v-model="messageInputText" />
    <button type="submit">Send</button>
  </form>
</template>
