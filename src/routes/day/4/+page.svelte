<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import Chart from './chart.svelte';
  import Status from './status.svelte';
  import { SHRM } from './store.svelte';

  const store = new SHRM();
</script>

<div class="items-start space-y-4 xl:flex xl:gap-4 xl:space-y-0">
  <Card.Root class="w-full">
    <Card.Header>
      <Card.Title class="flex justify-between">
        <p>SHRM™</p>
        <Status status={store.status} />
      </Card.Title>
      <Card.Description>Santa's Heart Rate Monitor™</Card.Description>
    </Card.Header>
    <Card.Content class="space-x-2">
      <Chart data={store.allData} />
    </Card.Content>
  </Card.Root>

  <div class="space-y-4 sm:min-w-96">
    <Card.Root>
      <Card.Header>
        <Card.Title>Statistics</Card.Title>
        <Card.Description>Information about Santa's heartrate</Card.Description>
      </Card.Header>
      <Card.Content>
        {@const { min, max, last30SecondsAvg, lastMinuteAvg, last5MinutesAvg } = store.stats}
        <p><span class="opacity-60">Min:</span> {min}</p>
        <p><span class="opacity-60">Max:</span> {max}</p>
        <p><span class="opacity-60">30s avg:</span> {last30SecondsAvg || '🤷‍♂️'}</p>
        <p><span class="opacity-60">1m avg:</span> {lastMinuteAvg || '🤷‍♂️'}</p>
        <p><span class="opacity-60">5m avg:</span> {last5MinutesAvg || '🤷‍♂️'}</p>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Header>
        <Card.Title>Controls</Card.Title>
        <Card.Description>Manage the Santa Heart Rate Monitor™</Card.Description>
      </Card.Header>
      <Card.Content class="space-x-2">
        <Button onclick={() => store.start()} bind:disabled={store.status}>Start</Button>
        <Button onclick={() => store.stop()} disabled={!store.status}>Stop</Button>
        <Button onclick={() => store.reset()}>Reset</Button>
      </Card.Content>
    </Card.Root>
  </div>
</div>
