import {createAuthSlice} from "$stores/authStore.svelte";
import {createAppSlice} from "$stores/appStore.svelte";
import {createUserSlice} from "$stores/userStore.svelte";

export const app = createAppSlice();
export const user = createUserSlice();
export const auth = createAuthSlice()