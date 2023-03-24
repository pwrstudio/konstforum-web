<script lang="ts">
  import { fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { menuActive, languageStore } from "$lib/stores"
  import { onMount } from "svelte"
  import Hamburger from "$lib/components/Hamburger.svelte"
  import Metadata from "$lib/components/Metadata.svelte"
  import { renderBlockText, toPlainText } from "$lib/modules/sanity.js"
  import { Language } from "$lib/types"
  export let data
  const { posts } = data

  let title: string
  let content: string
  let description: string

  $: title =
    $languageStore === Language.English ? "About Konstforum" : "Om Konstforum"

  $: content =
    $languageStore === Language.English
      ? posts[0].content_eng.content
      : posts[0].content_sve.content

  $: description =
    $languageStore === Language.English
      ? toPlainText(posts[0].content_eng.content)
      : toPlainText(posts[0].content_sve.content)

  const openMenu = () => {
    menuActive.set(true)
  }

  onMount(async () => {
    menuActive.set(false)
  })
</script>

<Metadata {title} {description} />

{#if !$menuActive}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span on:click={openMenu}>
    <Hamburger />
  </span>
{/if}

<div class="default-page">
  <div class="inner" in:fade={{ easing: quadOut, duration: 400 }}>
    <div class="content">
      {#each posts as post (post._id)}
        <!-- CENTER -->
        <div class="center" id={post._id}>
          <h2>
            {$languageStore === Language.English ? post.title_eng : post.title}
          </h2>
          <div>
            {@html renderBlockText(
              $languageStore === Language.English
                ? post.content_eng.content
                : post.content_sve.content
            )}
          </div>
          {#if post._id === "kontakt"}
            <!-- Begin Mailchimp Signup Form -->
            <form
              action="https://konstforumiskane.us21.list-manage.com/subscribe/post?u=0a06fef657ef359d9d17194a1&amp;id=3cccc613d4&amp;f_id=0051f5e1f0"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              class="validate"
              target="_blank"
              novalidate
            >
              <div id="mc_embed_signup_scroll">
                <h2>
                  {$languageStore === Language.English
                    ? "Newsletter"
                    : "Nyhetsbrev"}
                </h2>
                <div class="mc-field-group">
                  <label for="mce-EMAIL">
                    {$languageStore === Language.English
                      ? "Email address"
                      : "Emailadress"}
                  </label>
                  <input
                    type="email"
                    value=""
                    name="EMAIL"
                    class="required email"
                    id="mce-EMAIL"
                    required
                  />
                  <span id="mce-EMAIL-HELPERTEXT" class="helper_text" />
                </div>
                <div id="mce-responses" class="clear foot">
                  <div
                    class="response"
                    id="mce-error-response"
                    style="display:none"
                  />
                  <div
                    class="response"
                    id="mce-success-response"
                    style="display:none"
                  />
                </div>
                <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div
                  style="position: absolute; left: -5000px;"
                  aria-hidden="true"
                >
                  <input
                    type="text"
                    name="b_0a06fef657ef359d9d17194a1_3cccc613d4"
                    tabindex="-1"
                    value=""
                  />
                </div>
                <div class="optionalParent">
                  <div class="clear foot">
                    <input
                      type="submit"
                      value={$languageStore === Language.English
                        ? "Subscribe"
                        : "Prenumerera"}
                      name="subscribe"
                      id="mc-embedded-subscribe"
                      class="button"
                    />
                  </div>
                </div>
              </div>
            </form>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .default-page {
    width: 100vw;
    background: $white;
    color: $black;
    height: 100vh;
    font-family: $REGULAR_STACK;
    font-size: $FONT_SIZE_LARGE;

    @include screen-size("small") {
      overflow-y: auto;
    }

    .inner {
      margin-left: auto;
      margin-right: auto;
      padding-top: 70px;

      h2 {
        font-family: $COMPRESSED_STACK;
        font-size: $FONT_SIZE_SEMI;
        text-transform: uppercase;
      }

      .content {
        height: calc(100vh - 60px);
        overflow-y: auto;

        .button {
          padding: 10px 10px;
          border: 1px solid $black;
          border-radius: 10px;
          font-family: $EXPANDED_STACK;
          font-size: $FONT_SIZE_SMALL;
          display: inline-block;
          cursor: pointer;
          text-decoration: none;
          text-transform: uppercase;
          user-select: none;
          margin-right: 5px;
          background: transparent;

          &:hover {
            text-decoration: underline;
          }
        }

        label {
          display: block;
          margin-bottom: 10px;
        }

        .email {
          display: block;
          padding: 10px 10px;
          border: 1px solid $black;
          font-size: $FONT_SIZE_MEDIUM;
          border-radius: 10px;
          display: inline-block;
          cursor: pointer;
          user-select: none;
          margin-right: 5px;
          background: transparent;
          margin-bottom: 20px;
        }

        .center {
          font-family: $REGULAR_STACK;
          font-size: $FONT_SIZE_MEDIUM;
          width: 800px;
          margin-left: auto;
          margin-right: auto;
          height: fit-content;
          margin-top: 40px;
          line-height: 1.4em;
          padding-bottom: 40px;

          @include screen-size("small") {
            width: calc(100% - 20px);
            font-size: $FONT_SIZE_NORMAL;
            margin-top: 0;
          }

          h2 {
            padding-top: 20px;

            @include screen-size("small") {
              font-size: 24px;
              padding-top: 0;
            }
          }
        }
      }
    }
  }
</style>
