<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Progress } from '$lib/components/ui/progress';
  import { Store } from './store.svelte';

  let { data } = $props();

  const list = new Store(data.list);

  let remainder = $derived(100 - list.currentWeight);
</script>

<div class="space-y-4">
  <div class="flex w-full justify-center">
    <Card.Root class="max-w-3xl">
      <Card.Header>
        <Card.Title>Sleigh load</Card.Title>
        <Card.Description>
          Santa's sleigh can only carry so much weight. Help him pack optimally.
        </Card.Description>
      </Card.Header>
      <Card.Content class="space-y-4">
        <Progress value={list.currentWeight} />
        <p class="text-sm italic opacity-60">{list.currentWeight.toFixed(2)} kg / 100 kg</p>
      </Card.Content>
    </Card.Root>
  </div>

  <div class="flex gap-4">
    <Card.Root class="w-1/2">
      <Card.Header>
        <Card.Title>Loading dock</Card.Title>
        <Card.Description>Click or tap to load into Santa's sleigh</Card.Description>
      </Card.Header>
      <Card.Content class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {#each list.unloaded as gift (gift.id)}
          {#if gift.weight <= remainder}
            <Button variant="outline" onclick={() => list.load(gift.id)}>
              {gift.name} ({gift.weight} kg)
            </Button>
          {:else}
            <Button
              variant="outline"
              class="pointer-events-none select-none bg-muted/15 opacity-40"
            >
              {gift.name} ({gift.weight} kg)
            </Button>
          {/if}
        {/each}
      </Card.Content>
    </Card.Root>

    <Card.Root class="w-1/2">
      <Card.Header>
        <Card.Title>Sleigh</Card.Title>
        <Card.Description>Click or tap to remove from Santa's sleigh</Card.Description>
      </Card.Header>
      <Card.Content class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {#each list.loaded as gift (gift.id)}
          <Button variant="outline" onclick={() => list.unload(gift.id)}>
            {gift.name} ({gift.weight} kg)
          </Button>
        {/each}
      </Card.Content>
    </Card.Root>
  </div>
</div>
