<script lang="ts">
  import ProjectsSinglePage from "$lib/components/pages/ProjectsSinglePage.svelte"
  import { Language, type ProjectType } from "$lib/types"
  export let data: { project: ProjectType }
</script>

<ProjectsSinglePage {data} language={Language.Swedish} />
