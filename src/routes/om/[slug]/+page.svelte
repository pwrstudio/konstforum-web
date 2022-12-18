<script lang="ts">
  import MainPage from "$lib/components/pages/MainPage.svelte"
  import ArtistsSinglePage from "$lib/components/pages/ArtistsSinglePage.svelte"
  import { Language, MainPageType, type ArtistType } from "$lib/types"
  export let data: {
    mainPage: any
    artist: ArtistType
  }
  const { mainPage, artist } = data
</script>

<MainPage
  data={mainPage}
  language={Language.Swedish}
  mainPageType={MainPageType.Single}
>
  <ArtistsSinglePage data={artist} language={Language.Swedish} />
</MainPage>
