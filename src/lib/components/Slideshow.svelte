<script lang="ts">
  import { Swiper, SwiperSlide } from "swiper/svelte"
  import "swiper/css"
  import { Language } from "$lib/types"
  import Image from "$lib/components/Image.svelte"
  import SmallArrowLeft from "$lib/graphics/SmallArrowLeft.svelte"
  import SmallArrowRight from "$lib/graphics/SmallArrowRight.svelte"
  export let language: Language
  export let projects: any[]
  const urlPrefix = language === Language.English ? "/en/" : "/"
</script>

<Swiper spaceBetween={50} slidesPerView={1} loop={true}>
  {#each projects as project}
    <SwiperSlide>
      <a
        class="inner"
        href={urlPrefix + "projekt/"}
        data-sveltekit-preload-data
      >
        <Image
          imageDyad={project.mainImage}
          caption="{project.title}}"
          width={600}
        />
        <div class="caption">
          <div class="first-row">PÅGÅENDE PROJEKT</div>
          <div class="second-row">
            <div class="arrow"><SmallArrowLeft /></div>
            <div>
              {project.title}
            </div>
            <div class="arrow"><SmallArrowRight /></div>
          </div>
        </div>
      </a>
    </SwiperSlide>
  {/each}
</Swiper>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .inner {
    width: 100%;
    height: calc(50vh - 70px);
    font-family: $ATLAS_STACK;
    font-size: $FONT_SIZE_SMALL;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    color: $white;

    img {
      max-height: calc(100% - 40px);
      max-width: 90%;
      user-select: none;
    }

    .caption {
      width: 100%;
      text-align: center;
      user-select: none;

      .second-row {
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        .arrow {
          height: 7px;
          width: 7px;
        }
      }
    }
  }

  :global(.swiper) {
    height: 100%;
  }

  :global(.swiper .inner img) {
    max-height: calc(100% - 40px);
    max-width: 90%;
    user-select: none;
  }
</style>
