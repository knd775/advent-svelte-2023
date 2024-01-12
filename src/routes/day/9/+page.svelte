<script lang="ts">
  import * as Card from '$lib/components/ui/card';

  const targetDate = new Date(new Date().getFullYear(), 11, 24);

  let timeLeft = $state(targetDate.getTime() - new Date().getTime());
  let days = $derived(Math.ceil(timeLeft / (1000 * 60 * 60 * 24)));
  let hours = $derived(Math.ceil((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  let minutes = $derived(Math.ceil((timeLeft % (1000 * 60 * 60)) / (1000 * 60)));
  let seconds = $derived(Math.ceil((timeLeft % (1000 * 60)) / 1000));

  $effect(() => {
    const interval = setInterval(() => {
      timeLeft = targetDate.getTime() - new Date().getTime();
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<Card.Root class="mx-auto max-w-3xl">
  <Card.Header>
    <Card.Title>
      <p>🎁 Countdown to Christmas 🎄</p>
    </Card.Title>
    <Card.Description>Santa is coming!</Card.Description>
  </Card.Header>
  <Card.Content class="m-auto flex w-full max-w-lg items-center justify-between">
    <div class="text-center">
      <p class="text-5xl">{days}</p>
      <p class="opacity-70">days</p>
    </div>
    <div class="text-center">
      <p class="text-5xl">{hours}</p>
      <p class="opacity-70">hours</p>
    </div>
    <div class="text-center">
      <p class="text-5xl">{minutes}</p>
      <p class="opacity-70">minutes</p>
    </div>
    <div class="text-center">
      <p class="text-5xl">{seconds}</p>
      <p class="opacity-70">seconds</p>
    </div>
  </Card.Content>
</Card.Root>
