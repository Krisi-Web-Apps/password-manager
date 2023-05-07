<template>
  <div
    class="fixed top-0 left-0 flex justify-center items-center w-full h-screen"
  >
    <div
      class="fixed border rounded shadow bg-white text-black lg:w-1/2 md:w-2/3 sm:w-3/4 w-full max-h-[500px] overflow-y-scroll"
    >
      <!-- dialog header -->
      <h2 class="text-2xl text-center py-5">
        <slot name="header"></slot>
      </h2>

      <!-- dialog body -->
      <slot name="body"></slot>

      <!-- footer dialog -->
      <div class="flex justify-end px-5 pb-5">
        <button class="button text-white bg-red-500 border-red-500" @click="() => $emit('close')">
          Затвори
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimpleDialog",
};
</script>

<style lang="scss" scoped></style>
