<template>
  <div class="relative">
    <button @click="() => handleOpen()" class="py-2 px-4 border rounded">
      Опции
    </button>
    <ul
      v-if="isOpen"
      class="absolute bg-white right-0 mt-1 p-2 border rounded min-w-[200px] z-40"
    >
      <li
        v-for="(item, index) in props.options"
        :key="index"
        class="w-full py-1.5 px-4 bg-white border-white hover:bg-gray-200 rounded cursor-pointer"
        :class="item.color"
        @click="() => handleAction(item)"
        :id="`dropdown_password_window_${props.id}`"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "DropdownDialog",
  props: {
    options: Array,
    id: Number,
  },
  setup(props) {
    const isOpen = ref();

    const functions = {
      handleAction: (item) => {
        isOpen.value = !isOpen.value;
        item.action(props.id);
      },
      handleOpen: () => {
        isOpen.value = !isOpen.value;
      },
      handleClose: () => {
        isOpen.value = !isOpen.value;
      },
    };

    return { isOpen, props, ...functions };
  },
};
</script>
