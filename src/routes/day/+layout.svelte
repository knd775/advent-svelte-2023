<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import { days } from '$lib/days';
  import LeftIcon from '~icons/heroicons/chevron-left-solid';
  import RightIcon from '~icons/heroicons/chevron-right-solid';

  let { children } = $props();

  // eslint-disable-next-line svelte/valid-compile
  $page;

  let dayNumber = $derived(Number($page.url.pathname.split('/').pop()));
  let nextDay = $derived(dayNumber + 1);
  let prevDay = $derived(dayNumber - 1);
  let title = $derived(days.find((d) => d.day == dayNumber)?.title);
</script>

<svelte:head>
  <title>Day {dayNumber} - Advent of Svelte</title>
</svelte:head>

<div class="flex items-center justify-between pb-4">
  <h3>Day {dayNumber}: {title}</h3>

  <div class="space-x-2">
    {#if prevDay > 0}
      <Button variant="outline" size="icon" href="/day/{prevDay}">
        <LeftIcon />
      </Button>
    {:else}
      <Button variant="outline" size="icon" disabled>
        <LeftIcon />
      </Button>
    {/if}

    {#if nextDay <= days.filter((d) => d.status && d.status !== 'notstarted').length}
      <Button variant="outline" size="icon" href="/day/{nextDay}">
        <RightIcon />
      </Button>
    {:else}
      <Button variant="outline" size="icon" disabled>
        <RightIcon />
      </Button>
    {/if}
  </div>
</div>

{@render children()}
