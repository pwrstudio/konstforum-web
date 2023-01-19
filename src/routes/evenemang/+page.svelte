<script lang="ts">
  import EventsPage from "$lib/components/pages/EventsPage.svelte"
  import { Language } from "$lib/types"
  export let data
</script>

{#key data}
  <EventsPage {data} language={Language.Swedish} />
{/key}
