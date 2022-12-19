<script lang="ts">
  import { Language } from "$lib/types"
  import SinglePost from "$lib/components/pages/SinglePost.svelte"
  export let data
</script>

<SinglePost {data} language={Language.Swedish} />
