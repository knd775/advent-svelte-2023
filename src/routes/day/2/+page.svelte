<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Progress } from '$lib/components/ui/progress';

  let cookies = $state(0);
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Santa's cookies</Card.Title>
    <Card.Description>
      Feed Santa enough cookies so he can have enough energy to deliver all the presents
    </Card.Description>
  </Card.Header>
  <Card.Content class="space-y-4">
    <Progress value={cookies} />

    <div class="flex space-x-2">
      <Button onclick={() => (cookies += 1)}>Give cookie</Button>
      <Button onclick={() => (cookies -= 1)}>Take cookie</Button>
      <Button onclick={() => (cookies = 0)}>Take all cookies</Button>
    </div>
  </Card.Content>
</Card.Root>
