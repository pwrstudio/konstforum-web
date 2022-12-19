<script lang="ts">
  import { Swiper, SwiperSlide } from "swiper/svelte"
  import "swiper/css"
  import Image from "$lib/components/Image.svelte"
  import { Language } from "$lib/types"
  import SmallArrowLeft from "$lib/graphics/SmallArrowLeft.svelte"
  import SmallArrowRight from "$lib/graphics/SmallArrowRight.svelte"
  export let language: Language
  export let slides: any[]
</script>

<Swiper spaceBetween={50} slidesPerView={1} loop={true}>
  {#each slides as slide}
    {@const caption =
      (language === Language.English
        ? slide.bildtext_eng
        : slide.bildtext_sve) || ""}
    <SwiperSlide>
      <div class="inner">
        <div class="image">
          <Image imageDyad={slide} {caption} />
        </div>
        <div class="caption">
          <div class="arrow"><SmallArrowLeft /></div>
          <div>{caption}</div>
          <div class="arrow"><SmallArrowRight /></div>
        </div>
      </div>
    </SwiperSlide>
  {/each}
</Swiper>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .inner {
    width: 100%;
    height: calc(100% - 20px);
    font-family: $MONO_STACK;
    font-size: $FONT_SIZE_SMALL;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    color: $white;

    @include screen-size("small") {
      height: auto;
      padding-bottom: 10px;
    }

    img {
      max-width: 100%;
    }

    .caption {
      margin-top: 20px;
      width: 100%;
      text-align: center;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      .arrow {
        height: 8px;
        width: 8px;
      }
    }
  }

  :global(.swiper) {
    height: 100%;
  }

  :global(.inner img) {
    max-width: 100%;
  }
</style>
