<template>
  <li :class="props.classNames">
    <button
      @click="() => handleClick({ func: 'passwordsView' })"
      class="w-full button"
    >
      Пароли
    </button>
  </li>
  <li :class="props.classNames" v-if="user.me.role_as === 'admin'">
    <button
      @click="() => handleClick({ func: 'openUsersDialog' })"
      class="w-full button"
    >
      Потребители
    </button>
  </li>
  <li :class="props.classNames">
    <button
      @click="() => handleClick({ func: 'openProfileDialog' })"
      class="w-full button"
    >
      Здравей, {{ getFullname }}
    </button>
  </li>
  <li :class="props.classNames">
    <button @click="() => handleClick({ func: 'logout' })" class="w-full button">
      Изход
    </button>
  </li>
</template>

<script>
import { useRouter } from "vue-router";

// stores
import { useUserStore } from "@src/stores/user";
import { useEnvStore } from "@src/stores/env";

export default {
  name: "LoggedInItems",
  props: {
    classNames: String,
  },
  computed: {
    getFullname() {
      return `${this.user.me.first_name} ${this.user.me.last_name}`;
    },
  },
  setup(props) {
    const user = useUserStore();
    const router = useRouter();
    const env = useEnvStore();

    const functions = {
      open: {
        passwordsView: () => {
          router.push("/passwords");
          env.dialogs.global.navbars.top = false;
        },
        openUsersDialog: () => {
          router.push("/users");
          env.dialogs.global.navbars.top = false;
        },
        openProfileDialog: () => {
          // TODO:
          console.log("This is profile dialog!");
        },
        logout: () => {
          user.logout();
          env.dialogs.global.navbars.top = false;
        },
      },
      handleClick: ({ func }) => {
        functions.open[func]();
        env.dialogs.global.navbars.top = false;
      },
    };
    return { user, ...functions, props };
  },
};
</script>
