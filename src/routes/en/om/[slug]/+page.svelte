<script lang="ts">
  import DefaultPage from "$lib/components/pages/DefaultPage.svelte"
  import { Language } from "$lib/types"
  import { languageStore } from "$lib/stores"
  languageStore.set(Language.English)
  export let data
</script>

<DefaultPage {data} />
