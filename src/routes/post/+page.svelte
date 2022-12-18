<script lang="ts">
  import MainPage from "$lib/components/pages/MainPage.svelte"
  import { Language, MainPageType } from "$lib/types/"
  export let data: any
</script>

<MainPage {data} language={Language.Swedish} />
