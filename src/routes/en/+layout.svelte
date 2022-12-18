<script lang="ts">
  import { languageStore } from "$lib/stores"
  import { Language } from "$lib/types"
  languageStore.set(Language.English)
</script>

<slot />
