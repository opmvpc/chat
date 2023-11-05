<script setup>
import NavLink from "./NavLink.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <nav class="px-4 fixed w-full">
    <div
      class="px-5 my-5 container mx-auto flex justify-between items-center h-20 backdrop-blur-md bg-blue-200/30 rounded-lg border border-purple-500 shadow-lg shadow-blue-950 ring-purple-200/80 ring-2"
    >
      <div class="">
        <RouterLink
          class="text-2xl font-bold hover:text-purple-300/80 transition-colors"
          to="/"
          >Chat App</RouterLink
        >
      </div>
      <div class="">
        <ul class="flex space-x-6">
          <NavLink url="/" text="Accueil" />
          <NavLink url="/chat" text="Chat" />
        </ul>
      </div>
    </div>
  </nav>
</template>
