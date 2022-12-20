<script lang="ts">
  import ProjectsSinglePage from "$lib/components/pages/SinglePost.svelte"
  import { Language, type ProjectType } from "$lib/types"
  import { languageStore } from "$lib/stores"
  languageStore.set(Language.English)
  export let data: { project: ProjectType }
</script>

<ProjectsSinglePage {data} language={Language.English} />
