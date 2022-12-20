<script lang="ts">
  import EventsPage from "$lib/components/pages/EventsPage.svelte"
  import { Language, type ProjectType } from "$lib/types"
  import { languageStore } from "$lib/stores"
  languageStore.set(Language.English)
  export let data
</script>

<EventsPage {data} language={Language.English} />
