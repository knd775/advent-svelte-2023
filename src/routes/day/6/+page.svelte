<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card';

  let beats = $state(0);
  let seconds = $state(0);
  let bpm = $derived(beats / ((seconds || 1) / 60));

  let intervalId: number | null = $state(null);

  const beat = () => {
    intervalId ??= setInterval(() => seconds++, 1000);

    beats++;
  };

  const reset = () => {
    if (!intervalId) return;

    clearInterval(intervalId);
    beats = 0;
    seconds = 0;
    intervalId = null;
  };
</script>

<Card.Root class="mx-auto max-w-3xl">
  <Card.Header>
    <Card.Title>Beats per minute</Card.Title>
    <Card.Description>Test your rythym while you work</Card.Description>
  </Card.Header>
  <Card.Content>
    <Button onclick={beat}>Tap</Button>
    <Button onclick={reset} disabled={!intervalId}>Reset</Button>

    <p>Seconds: {seconds}</p>
    <p>BPM: {bpm}</p>
  </Card.Content>
</Card.Root>
