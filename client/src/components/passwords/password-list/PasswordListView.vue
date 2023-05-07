<template>
  <ul>
    <li
      v-for="(item, index) in password.items"
      :key="item.id"
      class="py-2 px-4 mb-2 rounded shadow"
    >
      <div class="flex justify-between items-center">
        <div>
          <div>{{ item.title }}</div>
          <div class="text-gray-400">{{ item.password }}</div>
        </div>
        <div>
          <button class="button">Опции</button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
// stores
import { usePasswordStore } from "@src/stores/password";

export default {
  name: "PasswordListView",
  setup() {
    const password = usePasswordStore();

    if (password.items.length === 0) password.getItems();

    const functions = {
      handleClose: () => {},
    };

    return { password, ...functions };
  },
};
</script>

<style lang="scss" scoped></style>
