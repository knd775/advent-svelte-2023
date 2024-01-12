<script lang="ts">
  import { page } from '$app/stores';

  // eslint-disable-next-line svelte/valid-compile
  $page;
</script>

<div class="flex h-screen flex-col items-center justify-center text-center">
  <div>
    <h1
      class="mr-5 inline-block border-r border-solid border-black/[0.3] pr-6 align-top text-xl font-medium leading-[49px] dark:border-white/[0.3]"
    >
      {$page.status}
    </h1>
    <div style="display:inline-block">
      <h2 class="m-0 text-sm font-normal leading-[49px]">
        {$page.error?.message}
      </h2>
    </div>
  </div>
</div>
