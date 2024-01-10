<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { slide } from 'svelte/transition';
  import { CardGame } from './game.svelte';

  const game = new CardGame((time) => (alertState = { open: true, time }));

  let alertState = { open: false, time: 0 };
</script>

<Card.Root>
  <Card.Header class="grid grid-cols-[1fr_150px] items-start gap-4 space-y-0">
    <div class="space-y-1">
      <Card.Title>Deck of Doubles</Card.Title>
      <Card.Description>
        <p>Try to match all 24 pairs</p>
        {#if game.highScore}
          <p class="italic">Best time: {game.highScore} seconds</p>
        {:else}
          <p class="italic">Best time: none</p>
        {/if}
      </Card.Description>
    </div>
    <div class="flex items-center justify-end space-x-4 rounded-md">
      {#if game.active}
        <p class="text-lg">{game.timer}</p>
      {/if}
      <Button on:click={() => game.reset()}>Restart</Button>
    </div>
  </Card.Header>
  <Card.Content class="grid grid-cols-6 gap-1 md:grid-cols-12">
    {#each game.cards as card}
      <div class="flex !aspect-[2/3]">
        {#if card.flipped}
          <div
            style="--image-url: url({card.imageUrl})"
            class="w-full overflow-hidden rounded-lg bg-[image:var(--image-url)] bg-cover bg-no-repeat ring-green-300 dark:ring-green-600"
            class:saturate-50={card.matched}
            class:ring={card.matched}
            transition:slide={{ duration: 200, axis: 'x' }}
          />
        {:else}
          <button
            class="w-full overflow-hidden bg-[url('/cardback.webp')] bg-cover bg-no-repeat"
            onclick={() => card.flip()}
            on:keydown
            transition:slide={{ duration: 200, axis: 'x' }}
          />
        {/if}
      </div>
    {/each}
  </Card.Content>
</Card.Root>

<AlertDialog.Root bind:open={alertState.open}>
  <AlertDialog.Trigger />
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>You win!</AlertDialog.Title>
      <AlertDialog.Description>
        <p>
          You've completed the game in {alertState.time} seconds
        </p>
        {#if alertState.time === game.highScore}
          <p>That's your new best time!</p>
        {/if}
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Show board</AlertDialog.Cancel>
      <AlertDialog.Action onclick={() => game.reset()}>Play again</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
