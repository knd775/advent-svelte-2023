<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import * as Table from '$lib/components/ui/table';
  import { groupBy } from '$lib/utils';

  let { data } = $props();

  let tasks = $derived(Object.entries(data.list).reverse());
  let elves = $derived(Object.entries(groupBy(tasks, 'elf')));
</script>

<Card.Root class="w-full">
  <Card.Header>
    <Card.Title>
      <p>Elf Productivity Dashboard</p>
    </Card.Title>
    <Card.Description>Keep an eye on the elves</Card.Description>
  </Card.Header>
  <Card.Content class="grid grid-cols-4">
    {#each elves as [i, elf] (i)}
      <Card.Root>
        <Card.Header>
          <Card.Title>
            <p>{elf[0]?.[1].elf}</p>
          </Card.Title>
          <Card.Description>All tasks completed so far</Card.Description>
        </Card.Header>
      </Card.Root>
    {/each}
  </Card.Content>
</Card.Root>

<Card.Root class="w-full">
  <Card.Header>
    <Card.Title>
      <p>Task history</p>
    </Card.Title>
    <Card.Description>All tasks completed so far</Card.Description>
  </Card.Header>
  <Card.Content class="space-x-2">
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Elf</Table.Head>
          <Table.Head>Task</Table.Head>
          <Table.Head>Minutes</Table.Head>
          <Table.Head>Time</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each tasks as [i, task] (i)}
          <Table.Row data-id={i}>
            <Table.Cell>{task.elf}</Table.Cell>
            <Table.Cell>{task.task}</Table.Cell>
            <Table.Cell>{task.minutesTaken}</Table.Cell>
            <Table.Cell>{new Date(task.date).toLocaleString()}</Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </Card.Content>
</Card.Root>
