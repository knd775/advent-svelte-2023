<script>
  import AppHeader from '$lib/components/AppHeader.svelte';
  import TailwindIndicator from '$lib/components/TailwindIndicator.svelte';
  import { ModeWatcher } from 'mode-watcher';
  import '../app.pcss';

  let { children } = $props();
</script>

<svelte:head>
  <title>Advent of Svelte</title>
</svelte:head>

<AppHeader />

<div class="relative flex min-h-[calc(100vh-57px)] flex-col" id="page">
  <div class="container h-full flex-1 self-stretch py-6">
    {@render children()}
  </div>

  <div class="container w-full py-4 text-center">
    Advent of Svelte 2023 (by <a
      href="https://twitter.com/knd775"
      target="_blank"
      class="transition-colors ease-linear hover:text-slate-500">@knd775</a
    >)
  </div>
</div>

<TailwindIndicator />

<ModeWatcher defaultMode={'dark'} />
