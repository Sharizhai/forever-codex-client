<script lang="ts">
    import Footer from "$components/layout/Footer.svelte";
    import NavBar from "$components/layout/NavBar.svelte";
    import type { Snippet } from "svelte";

    let { children }: { children: Snippet } = $props();
</script>

<div class="app-layout">
    <NavBar />

    <main class="app-layout-content">
        {@render children()}
    </main>

    <Footer />
</div>

<style lang="scss">
    .app-layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;

        &-content {
            flex: 1;
        }
    }
</style>