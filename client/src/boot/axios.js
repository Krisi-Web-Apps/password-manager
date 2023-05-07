import axios from "axios";

import { useEnvStore } from "@src/stores/env";
import { useUserStore } from "@src/stores/user";

const api = axios.create({ baseURL: import.meta.env.VITE_BASE_API_URL });

let start = 0;

api.interceptors.request.use((res) => {
  start = performance.now();
  return res;
});
api.interceptors.response.use(
  (res) => {
    const env = useEnvStore();
    env.time_ms = performance.now() - start;
    return res;
  },
  (err) => {
    const env = useEnvStore();
    if (
      err.response.data.message === "jwt expired" ||
      err.response.data.message === "Invalid token!"
    ) {
      const user = useUserStore();
      user.logout();
    }
    env.time_ms = performance.now() - start;
    if (err.response.data.message) {
      throw new Error(err.response.data.message);
    }
    return err;
  }
);

export default api;
