<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { toggleMode } from 'mode-watcher';
  import GitHubIcon from '~icons/mdi/github';
  import TwitterIcon from '~icons/mdi/twitter';
  import MoonIcon from '~icons/radix-icons/moon';
  import SunIcon from '~icons/radix-icons/sun';
</script>

<header
  class="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
  <div class="container flex h-14 items-center">
    <div class="flex">
      <a
        href="/"
        class="mr-6 flex w-full items-center justify-between space-x-2 transition-colors ease-linear hover:text-primary/90"
      >
        <div>
          <img
            src="/santa-svelte.webp"
            alt="Advent of Svelte logo"
            class="h-10 w-full object-contain"
          />
        </div>
        <div>
          <span class="font-semibold"> Advent of Svelte </span>
        </div>
      </a>
    </div>
    <nav class="flex flex-1 items-center justify-end space-x-2">
      <Button
        href="https://github.com/knd775/advent-svelte-2023"
        target="_blank"
        size="icon"
        variant="ghost"
      >
        <GitHubIcon class="size-5" />
        <span class="sr-only">GitHub</span>
      </Button>

      <Button href="https://twitter.com/knd775" target="_blank" size="icon" variant="ghost">
        <TwitterIcon class="size-5 fill-current" />
        <span class="sr-only">Twitter</span>
      </Button>

      <Button onclick={toggleMode} size="icon" variant="ghost">
        <SunIcon class="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon
          class="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </nav>
  </div>
</header>
