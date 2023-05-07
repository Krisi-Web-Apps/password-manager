<template>
  <div class="bg-white text-black border shadow">
    <div class="container mx-auto flex gap-2 my-5">
      <router-link to="/" class="button bg-gray-300 border-gray-400">
        Начало
      </router-link>
      <router-link to="/about" class="button bg-gray-300 border-gray-400">
        За Сайта
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomBar",
};
</script>
