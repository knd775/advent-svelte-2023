<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';
  import * as Table from '$lib/components/ui/table';
  import type { Task } from './types.js';

  let { data } = $props();

  let tasks = $derived(data.list.toReversed());
  let elves = $derived(
    Object.entries(
      tasks.reduce(
        (acc, task) => {
          if (!acc[task.elf]) acc[task.elf] = [];
          acc[task.elf]?.push(task);
          return acc;
        },
        {} as { [name: string]: Task[] }
      )
    )
  );
</script>

<div class="space-y-4">
  <Card.Root class="w-full">
    <Card.Header>
      <Card.Title>
        <p>Elf Productivity Dashboard</p>
      </Card.Title>
      <Card.Description>Keep an eye on the elves</Card.Description>
    </Card.Header>
    <Card.Content class="grid grid-cols-4 gap-2">
      {#each elves as [name, tasks]}
        {@const { length } = tasks}
        {@const wrappingTasks = tasks.filter((task) => task.task === 'WRAPPED_PRESENT')}
        {@const creatingTasks = tasks.filter((task) => task.task === 'CREATED_TOY')}
        {@const wrappingMinutes = wrappingTasks.reduce(
          (acc, task) => (acc += task.minutesTaken),
          0
        )}
        {@const creatingMinutes = creatingTasks.reduce(
          (acc, task) => (acc += task.minutesTaken),
          0
        )}
        {@const overallMinutes = wrappingMinutes + creatingMinutes}
        <Card.Root>
          <Card.Header>
            <Card.Title>{name}</Card.Title>
            <Card.Description>Elf worker</Card.Description>
          </Card.Header>
          <Card.Content>
            <Badge>{length} tasks</Badge>
            <Badge>{((overallMinutes / length) * 2).toFixed(2)} avg per toy</Badge>
            <Badge>
              {(60 / (wrappingMinutes / wrappingTasks.length)).toFixed(2)} wrapped per hour
            </Badge>
            <Badge>
              {(60 / (creatingMinutes / creatingTasks.length)).toFixed(2)} built per hour
            </Badge>
          </Card.Content>
        </Card.Root>
      {/each}
    </Card.Content>
  </Card.Root>

  <Card.Root class="w-full">
    <Card.Header>
      <Card.Title>
        <p>Task history</p>
      </Card.Title>
      <Card.Description>
        All tasks completed so far (needs pagination, currently only showing 20 for performance
        reasons)
      </Card.Description>
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
          {#each tasks.slice(0, 20) as task}
            <Table.Row>
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
</div>
