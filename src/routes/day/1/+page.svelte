<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import * as Table from '$lib/components/ui/table';
  import MinusIcon from '~icons/heroicons/minus';
  import PlusIcon from '~icons/heroicons/plus';

  let { data } = $props();
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Naughty or Nice list</Card.Title>
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
        {#each data.list as { name, tally }}
          <Table.Row>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{tally}</Table.Cell>
            <Table.Cell>
              {#if tally > 0}
                <Badge class="bg-green-400">Nice</Badge>
              {:else}
                <Badge class="bg-red-500">Naughty</Badge>
              {/if}
            </Table.Cell>
            <Table.Cell>
              <Button variant="default" size="icon" onclick={() => (tally -= 1)}>
                <MinusIcon />
              </Button>
              <Button variant="default" size="icon" onclick={() => (tally += 1)}>
                <PlusIcon />
              </Button>
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </Card.Content>
</Card.Root>
