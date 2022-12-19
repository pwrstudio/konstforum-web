<script lang="ts">
  import DefaultPage from "$lib/components/pages/DefaultPage.svelte"
  import { Language } from "$lib/types"
  export let data
</script>

<DefaultPage {data} language={Language.Swedish} />
