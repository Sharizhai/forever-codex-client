<script lang="ts">
  import { isMobile } from "$utils/deviceUtils";
  import { app } from "$stores/stores.svelte";
  import Router from "svelte-spa-router";
  import { onMount } from "svelte";

  import HomePage from "$pages/HomePage.svelte";
  import AppLayout from "$components/layout/AppLayout.svelte";

  const routes = {
    "/": HomePage,
  };

  onMount(() => {
    app.activeLocale = localStorage.getItem("locale") ?? navigator.language.slice(0, 2);

    if (isMobile())
      document.body.classList.add("mobile");
  });

</script>

<AppLayout>
    <Router {routes} />
</AppLayout>