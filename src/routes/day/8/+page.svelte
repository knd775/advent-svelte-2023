<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { CardGame } from './game.svelte';

  const game = new CardGame();
</script>

<Card.Root>
  <Card.Header class="grid grid-cols-[1fr_150px] items-start gap-4 space-y-0">
    <div class="space-y-1">
      <Card.Title>Deck of Doubles</Card.Title>
      <Card.Description>
        <p>Try to match all 24 pairs</p>
        <p class="italic">Currently dealing with a likely svelte 5 reactivity bug</p>
      </Card.Description>
    </div>
    <div class="flex items-center justify-end space-x-4 rounded-md">
      {#if game.active}
        <p class="text-lg">{game.timer}</p>
      {/if}
      <Button on:click={() => game.reset()}>Reset</Button>
    </div>
  </Card.Header>
  <Card.Content class="grid grid-cols-6 gap-1 md:grid-cols-12">
    {#each game.cards as card}
      <div class="flex">
        <img
          src={card.imageUrl}
          alt="card number {card.value}"
          class="!aspect-[2/3]"
          class:hidden={!card.flipped}
          class:saturate-50={card.matched}
        />
        <button
          class="!aspect-[2/3] w-full rounded-sm bg-[url('/cardback.webp')] bg-contain bg-no-repeat"
          class:hidden={card.flipped}
          onclick={() => card.flip()}
          on:keydown
        />
        <div class="absolute font-bold text-green-400">
          <p>f: {card.flipped}</p>
          <p>m: {card.matched}</p>
          <p>v: {card.value}</p>
        </div>
      </div>
    {/each}
  </Card.Content>
</Card.Root>

<Card.Root class="mt-4 w-44">
  <Card.Header>
    <Card.Title>Debug info</Card.Title>
    <Card.Description>
      <p>blocked: {game.blocked}</p>
      <p>num flipped: {game.flippedCards.length}</p>
      <p>num matched: {game.numberOfMatches}</p>
    </Card.Description>
  </Card.Header>
</Card.Root>

<style>
  @keyframes flip {
    from {
      transform: rotate3d(1, 0, 0, -180deg);
      animation-timing-function: ease-out;
    }

    to {
      transform: rotate3d(1, 0, 0, 0deg);
      animation-timing-function: ease-in;
    }
  }

  .flip {
    backface-visibility: visible;
    animation-name: flip;
  }
</style>
