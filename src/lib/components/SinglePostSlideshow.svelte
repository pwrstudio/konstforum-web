<script lang="ts">
  import { Swiper, SwiperSlide } from "swiper/svelte"
  import { Pagination } from "swiper"
  import "swiper/css"
  import "swiper/css/pagination"
  import Image from "$lib/components/Image.svelte"
  import { Language, type ImageDyad } from "$lib/types"
  import SmallArrowLeft from "$lib/graphics/SmallArrowLeft.svelte"
  import SmallArrowRight from "$lib/graphics/SmallArrowRight.svelte"
  export let language: Language
  export let slides: ImageDyad[]
</script>

<Swiper
  pagination={true}
  modules={[Pagination]}
  spaceBetween={50}
  slidesPerView={1}
  loop={true}
>
  {#each slides as slide (slide._key)}
    {@const caption =
      (language === Language.English
        ? slide.bild?.bildtext_eng
        : slide.bild?.bildtext_sve) ?? ""}
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
    user-select: none;
    cursor: grab;

    @include screen-size("small") {
      height: auto;
      padding-bottom: 10px;
    }

    img {
      max-width: 100%;
      user-select: none;
      mix-blend-mode: multiply;

      @include screen-size("small") {
        max-height: 400px;
      }
    }

    .caption {
      margin-bottom: 30px;
      width: 100%;
      text-align: center;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      color: $black;

      .arrow {
        height: 8px;
        width: 8px;
      }
    }
  }

  :global(.swiper) {
    height: 100%;
    --swiper-theme-color: black;
  }

  :global(.inner img) {
    max-width: 100%;
    max-height: 80vh;

    @include screen-size("small") {
      max-height: 400px;
    }
  }
</style>
