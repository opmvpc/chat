<script setup>
import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";
import { WebrtcProvider } from "y-webrtc";
import { onMounted, ref } from "vue";

const doc = new Y.Doc();
const yMessagesArray = doc.getArray("messages");
const messages = ref([]);

const roomName = "opmvpc-test";

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
  const provider = new WebrtcProvider(roomName, doc, {
    signaling: [`ws://${location.hostname}:5173/ws`],
  });

  const dbProvider = new IndexeddbPersistence(roomName, doc);

  dbProvider.on("synced", () => {
    console.log("content from the database is loaded");
  });

  provider.on("status", (event) => {
    console.log(event.status); // logs "connected" or "disconnected"
  });
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

  <form @submit.prevent="sendMessage" class="flex flex-col space-y-4">
    <label for="name" class="cursor-pointer">Name</label>
    <input
      class="text-purple-700 rounded-md border border-purple-500 shadow-lg shadow-blue-950 ring-purple-200/80 ring-2 focus:ring-4 focus:ring-purple-200/80 focus:outline-none focus:border-purple-500"
      id="name"
      type="text"
      v-model="userName"
    />

    <label for="message" class="cursor-pointer">Message</label>
    <textarea
      type="text"
      v-model="messageInputText"
      id="message"
      class="text-purple-700 rounded-md border border-purple-500 shadow-lg shadow-blue-950 ring-purple-200/80 ring-2 focus:ring-4 focus:ring-purple-200/80 focus:outline-none focus:border-purple-500"
    ></textarea>

    <button type="submit">Send</button>
  </form>
</template>
