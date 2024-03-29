<script lang="ts">
  import { languageStore, categories } from "$lib/stores"
  import { Language } from "$lib/types"
  import type { Field, PostType, Tag, Title } from "./types"
  import { FieldType } from "./types"
  export let formId: string
  export let postTypes: PostType[] = []
  export let fields: Field[]
  export let title: Title
  export let maxImages = 5
  export let inverted = false
  export let simple = false

  let visibleImages = 1
  let activePostType = "artist"

  const FORMSPARK_ACTION_URL = "https://submit-form.com/" + formId

  let uploads: number[] = []

  for (let i = 0; i < maxImages; i++) {
    uploads.push(i + 1)
  }

  const addUploadField = () => {
    if (visibleImages < maxImages) {
      visibleImages++
    }
  }

  const removeUploadField = () => {
    if (visibleImages > 1) {
      visibleImages--
    }
  }

  let tags: Tag[] = []
  $: tags =
    postTypes.length === 0 ? $categories["event"] : $categories[activePostType]
</script>

<!-- <form on:submit|preventDefault={onSubmit}> -->
<form action={FORMSPARK_ACTION_URL} class:inverted>
  <div class="title">
    {$languageStore === Language.English ? title.en : title.se}
  </div>
  <!-------------------------------------->
  <div class="faq">
    {#if $languageStore === Language.English}
      For questions, see <a href="/om#faq" data-sveltekit-preload-data>FAQ</a>
    {:else}
      Vid frågor, se <a href="/om#faq" data-sveltekit-preload-data>FAQ</a>
    {/if}
  </div>
  <!-------------------------------------->
  <div class="divider" />
  <!-- TYP -->
  {#if postTypes && postTypes.length > 0}
    <div class="form-section">
      <fieldset>
        {#each postTypes as type, i}
          <div class="radio-container">
            <input
              bind:group={activePostType}
              type="radio"
              name="type"
              id={type.name}
              value={type.name}
              checked={i === 0}
            />
            <label for={type.name}>
              {$languageStore === Language.English
                ? type.label.en
                : type.label.se}
            </label>
          </div>
        {/each}
      </fieldset>
    </div>
    <!-------------------------------------->
    <div class="divider" />
  {/if}
  <!-- FIELDS -->
  {#each fields as field (field.name)}
    {#if field.exclusiveTo === undefined || field.exclusiveTo === activePostType}
      <div class="form-section">
        <label for={field.name}>
          {$languageStore === Language.English
            ? field.label.en
            : field.label.se}{field.required ? "*" : ""}
        </label>
        {#if field.type === FieldType.Text}
          <input
            type="text"
            id={field.name}
            name={field.name}
            required={field.required}
            placeholder={field.placeholder
              ? $languageStore === Language.English
                ? field.placeholder.en
                : field.placeholder.se
              : ""}
          />
        {:else if field.type === FieldType.Email}
          <input
            type="email"
            id={field.name}
            name={field.name}
            required={field.required}
          />
        {:else if field.type === FieldType.Url}
          <input
            type="url"
            id={field.name}
            name={field.name}
            required={field.required}
          />
        {:else if field.type === FieldType.DateTime}
          <input
            type="datetime-local"
            id={field.name}
            name={field.name}
            required={field.required}
          />
        {:else if field.type === FieldType.TextArea}
          <textarea
            id={field.name}
            name={field.name}
            required={field.required}
            placeholder={field.placeholder
              ? $languageStore === Language.English
                ? field.placeholder.en
                : field.placeholder.se
              : ""}
          />
        {/if}
      </div>
    {/if}
  {/each}
  <!-------------------------------------->
  <div class="divider" />
  <!-- TAGS-->
  {#if !simple}
    {#if tags && tags.length > 0}
      <div class="form-section">
        <fieldset>
          {#each tags as tag, i (tag.id)}
            <div class="checkbox-container">
              <input type="checkbox" name={tag.id} value={tag.id} />
              <label for={tag.id}>
                {$languageStore === Language.English
                  ? tag.label.eng
                  : tag.label.sve}
              </label>
            </div>
          {/each}
        </fieldset>
      </div>
      <!-------------------------------------->
      <div class="divider" />
    {/if}
    <!-- UPLOADS -->
    {#each uploads as upload, i (upload)}
      <div class="upload-container" class:visible={i < visibleImages}>
        <div class="form-section">
          <label for={`upload-${upload}-file`}>
            {$languageStore === Language.English
              ? "Image " + (i + 1)
              : "Bild " + (i + 1)}
          </label>
          <!-- svelte-ignore a11y-unknown-role -->
          <input
            type="hidden"
            id={`upload-${upload}-file`}
            name={`upload[${upload}].file`}
            role="uploadcare-uploader"
            data-public-key="cc687b96511581c9f7b5"
            required={i === 0}
          />
          {#if i === 0}
            <div class="form-section required">
              {$languageStore === Language.English
                ? "* Upload at least one image"
                : "* Ladda upp minst en bild"}
            </div>
          {/if}
          <div class="form-section max-file-size">
            {$languageStore === Language.English
              ? "(Max file size: 5MB)"
              : "(Max filstorlek: 5MB)"}
          </div>
          <div class="form-section">
            <label for={`upload-${upload}-caption`}>
              {$languageStore === Language.English
                ? "Caption for image " + (i + 1)
                : "Bildtext för bild " + (i + 1)}
            </label>
            <input
              type="text"
              id={`upload-${upload}-caption`}
              name={`upload[${upload}].caption`}
            />
          </div>
        </div>
      </div>
    {/each}
    <div class="upload-controls">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="control remove-image"
        class:disabled={visibleImages === 1}
        on:click={removeUploadField}
      >
        {$languageStore === Language.English ? "- Image " : "- Bild "}
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="control add-image"
        class:disabled={visibleImages === maxImages}
        on:click={addUploadField}
      >
        {$languageStore === Language.English ? "+ Image " : "+ Bild "}
      </div>
    </div>
    <!-------------------------------------->
    <div class="divider" />
    <!-- NEWSLETTER -->
    <fieldset>
      <div class="newsletter">
        {$languageStore === Language.English
          ? "Do you want to receive the newsletter?"
          : "Vill du prenumerera på vårt nyhetsbrev?"}
      </div>
      <div class="radio-container">
        <input
          type="radio"
          name="newsletter"
          id="newsletter-yes"
          value="yes"
          checked={true}
        />
        <label for="newsletter-yes">
          {$languageStore === Language.English ? "Yes" : "Ja"}
        </label>
        <input type="radio" name="newsletter" id="newsletter-no" value="no" />
        <label for="newsletter-no">
          {$languageStore === Language.English ? "No" : "Nej"}
        </label>
      </div>
    </fieldset>
    <div class="divider" />
  {/if}
  <!-- SUBMIT -->
  <div class="form-section">
    <button type="submit">
      {$languageStore === Language.English ? "Submit " : "Skicka in"}
    </button>
  </div>
</form>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  form {
    margin-left: 20px;
    margin-right: 20px;
    padding-bottom: 10px;

    @include screen-size("small") {
      margin-left: 10px;
      margin-right: 10px;
    }

    .divider {
      margin-top: 15px;
      height: 1px;
      width: 100%;
      background: currentColor;
    }

    label {
      display: block;
      font-family: $COMPRESSED_STACK;
      font-size: $FONT_SIZE_MEDIUM;
      text-transform: uppercase;
      user-select: none;
    }

    .title {
      font-family: $COMPRESSED_STACK;
      font-size: $FONT_SIZE_MEDIUM;
      text-transform: uppercase;
      height: 70px;
      display: flex;
      align-items: center;
      user-select: none;
    }

    .faq {
      font-family: $COMPRESSED_STACK;
      font-size: $FONT_SIZE_MEDIUM;
      padding-bottom: 10px;
    }

    .newsletter {
      font-family: $COMPRESSED_STACK;
      font-size: $FONT_SIZE_MEDIUM;
      padding-bottom: 10px;
      padding-top: 10px;
    }

    fieldset {
      border: unset;
      padding: 0;
      margin: 0;

      .radio-container {
        display: grid;
        grid-template-columns: 1em auto;
        gap: 0.5em;

        input[type="radio"] {
          /* Add if not using autoprefixer */
          -webkit-appearance: none;
          appearance: none;
          /* For iOS < 15 to remove gradient background */
          background-color: $grey;
          /* Not removed via appearance */
          margin: 0;
          font: inherit;
          color: currentColor;
          width: 1.15em;
          height: 1.15em;
          border: 0.15em solid currentColor;
          border-radius: 50%;
          transform: translateY(0.3em);
          display: grid;
          place-content: center;
        }

        input[type="radio"]::before {
          content: "";
          width: 0.65em;
          height: 0.65em;
          border-radius: 50%;
          transform: scale(0);
          box-shadow: inset 1em 1em $black;
        }

        input[type="radio"]:checked::before {
          transform: scale(1);
        }

        // input[type="radio"]:focus {
        //   outline: max(2px, 0.15em) solid currentColor;
        //   outline-offset: max(2px, 0.15em);
        // }

        label {
          display: inline;
          user-select: none;
        }
      }

      .checkbox-container {
        display: grid;
        grid-template-columns: 1em auto;
        gap: 0.5em;

        input[type="radio"] {
          /* Add if not using autoprefixer */
          -webkit-appearance: none;
          appearance: none;
          /* For iOS < 15 to remove gradient background */
          background-color: #fff;
          /* Not removed via appearance */
          margin: 0;
          font: inherit;
          color: currentColor;
          width: 1.15em;
          height: 1.15em;
          border: 0.15em solid currentColor;
          border-radius: 50%;
          transform: translateY(0.3em);
          display: grid;
          place-content: center;
        }

        input[type="radio"]::before {
          content: "";
          width: 0.65em;
          height: 0.65em;
          border-radius: 50%;
          transform: scale(0);
          box-shadow: inset 1em 1em $black;
        }

        input[type="radio"]:checked::before {
          transform: scale(1);
        }

        // input[type="radio"]:focus {
        //   outline: max(2px, 0.15em) solid currentColor;
        //   outline-offset: max(2px, 0.15em);
        // }

        label {
          display: inline;
          user-select: none;
        }
      }
    }

    .form-section {
      margin-top: 15px;

      &.max-file-size {
        font-family: $MONO_STACK;
        font-size: $FONT_SIZE_NORMAL;
      }
    }

    input {
      width: 100%;
      line-height: 1.5em;
      font-size: $FONT_SIZE_MEDIUM;
      font-family: $REGULAR_STACK;
      padding: 5px;
      border-radius: 10px;
      border: 1px solid currentColor;
      outline-color: currentColor;
      background: $grey;
    }

    textarea {
      width: 100%;
      line-height: 1.5em;
      font-size: $FONT_SIZE_NORMAL;
      font-family: $REGULAR_STACK;
      padding: 5px;
      border-radius: 10px;
      border: 1px solid currentColor;
      outline-color: currentColor;
      min-height: 200px;
      background: $grey;
    }

    button[type="submit"] {
      width: 100%;
      line-height: 1.5em;
      font-size: $FONT_SIZE_MEDIUM;
      font-family: $COMPRESSED_STACK;
      text-transform: uppercase;
      padding: 5px;
      border-radius: 10px;
      cursor: pointer;
      margin-top: 20px;
      border: 1px solid $black;
      background: $grey;
      color: $black;

      &:hover {
        background: $black;
        color: $grey;
      }
    }

    .upload-container {
      display: none;

      &.visible {
        display: block;
      }
    }

    .upload-controls {
      margin-top: 15px;
      width: 100%;
      display: flex;
      justify-content: flex-end;

      .control {
        padding: 10px 20px;
        border-radius: 10px;
        background: $black;
        color: $grey;
        user-select: none;
        cursor: pointer;
        font-family: $COMPRESSED_STACK;
        font-size: $FONT_SIZE_MEDIUM;
        text-transform: uppercase;

        &.disabled {
          opacity: 0.3;
          pointer-events: none;
        }

        &.remove-image {
          margin-right: 10px;
        }
      }
    }

    &.inverted {
      color: $grey;

      input {
        background: $black;
        color: $grey;
        color-scheme: dark;
      }

      button[type="submit"] {
        border: 1px solid $grey;
        background: $black;
        color: $grey;

        &:hover {
          background: $grey;
          color: $black;
        }
      }

      textarea {
        background: $black;
        color: $grey;
      }

      .upload-controls {
        .control {
          background: $grey;
          color: $black;
        }
      }
    }
  }

  :global(.uploadcare--widget__button_type_open) {
    background-color: $grey;
    color: $black;
    border: 1px solid $black;
    cursor: pointer;
    transition: unset;
    font-family: $REGULAR_STACK;
  }

  :global(.uploadcare--widget__button_type_open:hover) {
    background-color: $black;
    color: $grey;
  }

  :global(.inverted .uploadcare--widget__button_type_open) {
    background-color: $black;
    color: $grey;
    border: 1px solid $grey;
    cursor: pointer;
    transition: unset;
    font-family: $REGULAR_STACK;
  }

  :global(.inverted .uploadcare--widget__button_type_open:hover) {
    background-color: $grey;
    color: $black;
  }
</style>
