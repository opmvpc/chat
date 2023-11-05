<script setup>
import Nav from "./Nav.vue";
import Footer from "./Footer.vue";
</script>

<template>
  <!-- blue-950 to purple-950 with an angle of 45deg -->
  <div
    class="flex flex-col min-h-screen text-purple-100/90 font-sans antialiased bg-gradient-to-br from-blue-950 to-purple-950"
  >
    <header>
      <Nav />
    </header>

    <main class="pt-48 container mx-auto px-5">
      <div class="prose prose-invert prose-purple max-w-none">
        <slot />
      </div>
    </main>

    <Footer />
  </div>
</template>
