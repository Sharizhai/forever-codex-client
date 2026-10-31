import {createArticleSlice} from "$stores/articleStore.svelte";
import {createLegacySlice} from "$stores/legacyStore.svelte";
import {createAuthSlice} from "$stores/authStore.svelte";
import {createUserSlice} from "$stores/userStore.svelte";
import {createRaceSlice} from "$stores/raceStore.svelte";
import {createAppSlice} from "$stores/appStore.svelte";

export const app = createAppSlice();
export const user = createUserSlice();
export const auth = createAuthSlice();
export const articles = createArticleSlice();
export const races = createRaceSlice();
export const legacy= createLegacySlice();