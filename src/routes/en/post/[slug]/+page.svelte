<script lang="ts">
  import { Language } from "$lib/types"
  import SinglePost from "$lib/components/pages/SinglePost.svelte"
  import { languageStore } from "$lib/stores"
  languageStore.set(Language.English)
  export let data
</script>

<SinglePost {data} language={Language.English} />
