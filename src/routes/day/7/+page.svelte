<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Morse } from './morse.svelte';

  const morse = new Morse();

  let message = $state('');
  let convertedMessage = $derived(morse.convert(message));

  const preventInvalidKey = (e: KeyboardEvent) => {
    if (e.key.match(/[^a-zA-Z0-9 ]/)) e.preventDefault();
  };

  // Sanitize inputs that would bypass the keydown event (eg. paste)
  const preventInvalidInput = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) =>
    (e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z0-9 ]/g, ''));
</script>

<Card.Root class="mx-auto max-w-3xl">
  <Card.Header>
    <Card.Title>
      <p>Morse code</p>
    </Card.Title>
    <Card.Description>Convert message to morse code</Card.Description>
  </Card.Header>
  <Card.Content class="space-y-4">
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="message">Message</Label>
      <div class="flex gap-2">
        <Input
          type="text"
          id="message"
          bind:value={message}
          onkeydown={preventInvalidKey}
          oninput={preventInvalidInput}
        />
        <Button onclick={() => morse.playMessage(message)} disabled={!message}>Play</Button>
      </div>
    </div>

    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label>Preview</Label>
      <p>{convertedMessage || '-'}</p>
    </div>
  </Card.Content>
</Card.Root>
