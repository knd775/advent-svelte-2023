<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import * as Table from '$lib/components/ui/table';
  import { cn } from '$lib/utils';
  import MinusIcon from '~icons/heroicons/minus';
  import PlusIcon from '~icons/heroicons/plus';
  import { Store } from './store.svelte';

  let { data } = $props();
  const list = new Store(data.list);

  let name = $state('');
</script>

<div class="flex items-start gap-4">
  <Card.Root class="w-full">
    <Card.Header>
      <Card.Title>Naughty or Nice list</Card.Title>
      <Card.Description>An ERP for the elves</Card.Description>
    </Card.Header>
    <Card.Content>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Tally</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head></Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each list.people as { name, tally, id } (id)}
            {@const naughty = tally < 0}
            <Table.Row>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{tally}</Table.Cell>
              <Table.Cell>
                <Badge class={cn(naughty ? 'bg-red-500' : 'bg-green-500')}>
                  {naughty ? 'Naughty' : 'Nice'}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Button variant="default" size="icon" onclick={() => list.decrement(id)}>
                  <MinusIcon />
                </Button>
                <Button variant="default" size="icon" onclick={() => list.increment(id)}>
                  <PlusIcon />
                </Button>
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </Card.Content>
  </Card.Root>
  <div class="min-w-96 space-y-4">
    <Card.Root>
      <Card.Header>
        <Card.Title>New child</Card.Title>
        <Card.Description>Add a new child to Santa's list</Card.Description>
      </Card.Header>
      <Card.Content>
        <Label for="name">Name</Label>
        <Input id="name" placeholder="Enter a name" bind:value={name} />
        <Button class="mt-4" onclick={() => list.addPerson(name)}>Add</Button>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Header>
        <Card.Title>Options</Card.Title>
        <Card.Description>Advanced options for managing the list</Card.Description>
      </Card.Header>
      <Card.Content>
        <Button class="mt-4" onclick={() => list.set(data.list)}>Reinitialize</Button>
        <Button class="mt-4" onclick={() => list.clear()}>Clear</Button>
      </Card.Content>
    </Card.Root>
  </div>
</div>
