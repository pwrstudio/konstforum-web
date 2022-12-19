<script lang="ts">
  import truncate from "lodash/truncate"

  export let title = ""
  export let description = ""
  // let url = ""

  const DEFAULT_DESCRIPTION = "konstforum"
  const DEFAULT_IMAGE = "https://konstforum.se/"

  const t = (title.length > 0 ? title + " | " : "") + "Konstforum"

  const d =
    description.length > 0
      ? truncate(description, {
          length: 240,
          separator: /.? +/,
        })
      : DEFAULT_DESCRIPTION

  // const image = has(post, "featuredImage")
  //   ? BASE_IMAGE + post.featuredImage
  //   : DEFAULT_IMAGE
</script>

<svelte:head>
  <title>{t}</title>
  <meta name="twitter:card" content="summary_large_image" />
  <!-- <meta name="twitter:url" content={url} />
    <meta property="og:url" content={url} /> -->
  <meta property="og:type" content="article" />
  <meta property="twitter:title" content={t} />
  <meta property="twitter:description" content={d} />
  <meta property="og:title" content={t} />
  <meta property="description" content={d} />
  <meta property="og:description" content={d} />
  <!-- <meta property="image" content={image} />
    <meta property="og:image" content={image} />
    <meta property="twitter:image" content={image} /> -->
  <meta property="og:site_name" content="Plattform KcSyd" />
</svelte:head>
