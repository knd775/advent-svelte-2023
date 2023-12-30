<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { days } from '$lib/days';
  import CheckIcon from '~icons/heroicons/check-circle-solid';
  import InProgressIcon from '~icons/heroicons/clock-solid';
</script>

<div class="grid grid-cols-2 gap-2 lg:grid-cols-4">
  {#each days as { day, title, status }}
    {#if status && status !== 'notstarted'}
      <a href={`/day/${day}`} class="group">
        <Card.Root
          class="h-full transition-colors ease-linear group-hover:bg-muted/40 {status ===
          'incomplete'
            ? 'border-dashed'
            : ''}"
        >
          <Card.Header>
            <Card.Title class="flex gap-1">
              Day {day}
              {#if status === 'complete'}
                <CheckIcon class="text-sm text-green-500" />
              {:else if status === 'incomplete'}
                <InProgressIcon class="text-sm text-yellow-500" />
              {/if}
            </Card.Title>
            {title}
          </Card.Header>
        </Card.Root>
      </a>
    {:else}
      <Card.Root class="bg-muted/15 opacity-40">
        <Card.Header>
          <Card.Title>
            Day {day}
          </Card.Title>
          {title}
        </Card.Header>
      </Card.Root>
    {/if}
  {/each}
</div>
