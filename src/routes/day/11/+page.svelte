<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { blur } from 'svelte/transition';

  let { data } = $props();
  let name = $state('');
  let { firstNames, lastNames } = $derived(data.names);
  let elfName = $state('');

  const transform = (name: string) => {
    const [firstName, lastName] = name.split(' ');
    const elfFirstName = firstName ? firstNames[prng(firstName, firstNames.length)] : '';
    const eltLastName = lastName ? lastNames[prng(lastName, lastNames.length)] : '';

    return `${elfFirstName} ${eltLastName}`.trim();
  };

  const prng = (seed: string, max: number) => {
    let sum = 0;
    for (let i = 0; i < seed.length; i++) {
      sum += seed.charCodeAt(i);
    }
    return sum % max;
  };
</script>

<Card.Root class="m-auto max-w-lg">
  <Card.Header>
    <Card.Title>Elf name generator</Card.Title>
    <Card.Description>Find your elf name</Card.Description>
  </Card.Header>
  <Card.Content>
    <form class="grid w-full items-center gap-1.5">
      <Label for="name">Enter your name</Label>
      <div class="flex space-x-2">
        <Input type="text" id="name" bind:value={name} />
        <Button type="submit" onclick={() => (elfName = transform(name))} disabled={!name}>
          Transform
        </Button>
      </div>
    </form>
  </Card.Content>
</Card.Root>

{#if elfName}
  <p class="w-full pt-5 text-center">Your elf name is</p>
  <p class="w-full pt-5 text-center text-4xl sm:text-5xl" transition:blur>✨ {elfName} ✨</p>
{/if}
