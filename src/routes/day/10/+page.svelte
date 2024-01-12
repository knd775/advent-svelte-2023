<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';

  let open = $state(false);

  $effect(() => {
    setTimeout(() => {
      open = true;
    }, 1500);
  });
</script>

<div class="w-full pt-16 text-center">A message from Santa is on its way!</div>

<AlertDialog.Root bind:open closeOnOutsideClick={true}>
  <AlertDialog.Trigger />
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Merry Christmas!</AlertDialog.Title>
      <AlertDialog.Description></AlertDialog.Description>
    </AlertDialog.Header>

    <enhanced:img
      src="/static/santa.png"
      alt="Santa Claus"
      class="mx-auto mt-4 w-full max-w-[300px]"
    />

    <AlertDialog.Footer>
      <AlertDialog.Cancel>Thanks!</AlertDialog.Cancel>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
