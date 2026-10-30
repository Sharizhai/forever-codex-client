<script lang="ts">
  import { isMobile } from "$utils/deviceUtils";
  import { app } from "$stores/stores.svelte";
  import {NEWS_PATH, RACES_PATH} from "$config/config";
  import Router from "svelte-spa-router";
  import { onMount } from "svelte";

  import ArticleCreationPage from "$pages/ArticleCreationPage.svelte";
  import ArticleDetailPage from "$pages/ArticleDetailPage.svelte";
  import AppLayout from "$components/layout/AppLayout.svelte";
  import RacesPage from "$pages/RacesPage.svelte";
  import AboutPage from "$pages/AboutPage.svelte";
  import HomePage from "$pages/HomePage.svelte";
  import NewsPage from "$pages/NewsPage.svelte";

  const pageUrl = import.meta.env.VITE_ARTICLE_CREATE_PATH;

  const routes = {
    "/": HomePage,
    "/about": AboutPage,
      [pageUrl]: ArticleCreationPage,
      [NEWS_PATH]: NewsPage,
      [RACES_PATH]: RacesPage,
      [`${NEWS_PATH}/:id`]: ArticleDetailPage,
  };

  onMount(() => {
    app.activeLocale = localStorage.getItem("locale") ?? navigator.language.slice(0, 2);

    if (isMobile())
      document.body.classList.add("mobile");
  });

</script>

{#key app.activeLocale}
    <AppLayout>
        <Router {routes} />
    </AppLayout>
{/key}