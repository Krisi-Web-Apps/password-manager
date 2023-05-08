<template>
  <ul v-if="user.items.length > 0">
    <li
      v-for="(item, index) in user.items"
      :key="item.id"
      class="py-2 px-4 mb-2 rounded shadow"
    >
      <div class="flex justify-between items-center">
        <div>
          <div>{{ item.first_name }}</div>
          <div class="text-gray-400">{{ item.email }}</div>
          <div>{{ item.role_as }}</div>
        </div>
        <dropdown-dialog
          v-if="dialogOptions.length > 0"
          :options="dialogOptions"
          :id="item.id"
        />
      </div>
      <!-- dropdown -->
    </li>
  </ul>
  <div v-else>Все още нямате въведени пароли.</div>
</template>

<script>
// stores
import { useUserStore } from "@src/stores/user";

// dialogs
import DropdownDialog from "@src/components/dialogs/DropdownDialog.vue";

export default {
  name: "UsersListView",
  components: {
    // dialogs
    DropdownDialog,
  },
  setup() {
    const user = useUserStore();

    if (user.items.length === 0) user.getItems();

    const dialogOptions = [];
    const functions = {};

    return { user, ...functions, dialogOptions };
  },
};
</script>
