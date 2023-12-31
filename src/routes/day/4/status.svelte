<script lang="ts">
  let { status } = $props<{ status: boolean }>();
</script>

<span class="relative flex size-3">
  <span
    class:!inline-flex={status}
    class="absolute hidden h-full w-full animate-ping rounded-full bg-emerald-500 opacity-65"
  />
  <span
    class:bg-red-600={!status}
    class:bg-green-500={status}
    class="relative inline-flex size-3 rounded-full opacity-75"
  />
</span>
