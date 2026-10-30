import {createArticleSlice} from "$stores/articleStore.svelte";
import {createAuthSlice} from "$stores/authStore.svelte";
import {createUserSlice} from "$stores/userStore.svelte";
import {createAppSlice} from "$stores/appStore.svelte";

export const app = createAppSlice();
export const user = createUserSlice();
export const auth = createAuthSlice();
export const articles = createArticleSlice();