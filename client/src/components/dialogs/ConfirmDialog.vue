<template>
  <div
    class="fixed top-0 left-0 bg-gray-900/60 flex justify-center items-center w-full h-screen"
  >
    <div
      class="fixed border-2 border-gray-100 rounded-md shadow-md bg-white text-black lg:w-1/2 md:w-2/3 sm:w-3/4 w-full max-h-[500px] overflow-y-scroll"
    >
      <h2 class="text-2xl text-center py-5">
        <slot name="header"></slot>
      </h2>
      <slot name="body"></slot>
      <div class="flex justify-end gap-5 px-5 pb-5">
        <button
          class="button text-white bg-red-500 border-red-500"
          @click="() => $emit('close')"
        >
          Затвори
        </button>
        <button
          class="button text-white bg-red-500 border-red-500"
          @click="() => $emit('confirm')"
        >
          Потвърди
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmDialog",
};
</script>
