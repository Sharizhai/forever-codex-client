<script lang="ts">
  import { isMobile } from "$utils/deviceUtils";
  import { app } from "$stores/stores.svelte";
  import Router from "svelte-spa-router";
  import { onMount } from "svelte";

  import AppLayout from "$components/layout/AppLayout.svelte";
  import AboutPage from "$pages/AboutPage.svelte";
  import HomePage from "$pages/HomePage.svelte";

  const routes = {
    "/": HomePage,
    "/about": AboutPage,
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