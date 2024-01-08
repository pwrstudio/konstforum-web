<script lang="ts">
  import AnslagstavlaPage from "$lib/components/pages/AnslagstavlaPage.svelte"
  import { Language } from "$lib/types/"
  import { languageStore } from "$lib/stores"
  languageStore.set(Language.Swedish)
  export let data: any
</script>

<AnslagstavlaPage {data} language={Language.Swedish} />
