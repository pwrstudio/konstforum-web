<script lang="ts">
  import { urlFor } from "$lib/modules/sanity"
  export let imageDyad: any = {}
  export let caption: string = ""
  export let width: number = 0
  export let height: number = 0

  let url = ""
  let imageObj = imageDyad.dither ? imageDyad.dither : imageDyad.bild

  if (width > 0 && height > 0) {
    url = urlFor(imageObj)
      .width(width)
      .height(height)
      .auto("format")
      .saturation(-100)
      .url()
  } else if (width > 0) {
    url = urlFor(imageObj).width(width).auto("format").saturation(-100).url()
  } else if (height > 0) {
    url = urlFor(imageObj).height(height).auto("format").saturation(-100).url()
  } else {
    url = urlFor(imageObj).auto("format").saturation(-100).url()
  }
</script>

<img src={url} alt={caption} draggable="false" />

<style lang="scss">
  img {
    max-width: 100%;
  }
</style>
