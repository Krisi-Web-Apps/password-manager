<template>
  <div class="container mx-auto">
    <div class="w-full bg-white text-black rounded border py-5 px-5 mt-5">
      <div class="flex justify-between items-center">
        <h1 class="mb-5 text-2xl">Потребители</h1>
        <div class="flex gap-5">
          <button @click="handleRefresh" class="button">Опресняване</button>
        </div>
      </div>
      <div v-if="user.loading" class="mb-5 text-center">Зареждане...</div>
      <users-list-view />
    </div>
  </div>
</template>

<script>
// stores
import { useEnvStore } from "@src/stores/env";
import { useUserStore } from "@src/stores/user";

// dialogs
import UsersListView from "@src/components/users/UsersListView.vue";

export default {
  name: "UsersView",
  components: {
    // dialogs
    UsersListView,
  },
  setup() {
    const env = useEnvStore();
    const user = useUserStore();

    const functions = {
      handleRefresh: () => {
        user.getItems();
      },
    };

    return { env, user, ...functions };
  },
};
</script>
