<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { CardGame } from './game.svelte';

  const game = new CardGame();
</script>

<Card.Root>
  <Card.Header class="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
    <div class="space-y-1">
      <Card.Title>Deck of Doubles</Card.Title>
      <Card.Description>Try to match all 24 pairs</Card.Description>
    </div>
    <div class="flex items-center justify-end space-x-1 rounded-md">
      <Button on:click={() => game.reset()}>Reset</Button>
    </div>
  </Card.Header>
  <Card.Content class="grid grid-cols-6 gap-1 md:grid-cols-12">
    {#each game.cards as card}
      {#if card.flipped}
        <img src={card.imageUrl} alt="card number {card.value}" />
      {:else}
        <button
          class="!aspect-[2/3] w-full rounded-sm bg-red-900"
          onclick={() => card.flip()}
          on:keydown
        ></button>
      {/if}
    {/each}
  </Card.Content>
</Card.Root>
