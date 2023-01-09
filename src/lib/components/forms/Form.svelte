<script lang="ts">
  import { languageStore } from "$lib/stores"
  import { Language } from "$lib/types"
  import type { Field, PostType, Tag } from "./types"
  import { FieldType } from "./types"
  export let formId: string
  export let postTypes: PostType[] = []
  export let fields: Field[]
  export let tags: Tag[]
  export let title: string
  export let maxImages = 5
  export let inverted = false

  let visibleImages = 1

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
</script>

<!-- <form on:submit|preventDefault={onSubmit}> -->
<form action={FORMSPARK_ACTION_URL} class:inverted>
  <div class="title">
    {title}
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
  {#each fields as field}
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
        <textarea id={field.name} name={field.name} required={field.required} />
      {/if}
    </div>
  {/each}
  <!-------------------------------------->
  <div class="divider" />
  <!-- TAGS-->
  {#if tags && tags.length > 0}
    <div class="form-section">
      <fieldset>
        {#each tags as tag, i}
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
  {#each uploads as upload, i}
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
        />
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
  <!-- SUBMIT -->
  <div class="form-section">
    <button type="submit">Skicka in</button>
  </div>
</form>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  form {
    margin-left: 20px;
    margin-right: 20px;
    padding-bottom: 10px;

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
      background: $white;
      color: $black;

      &:hover {
        background: $black;
        color: $white;
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
        color: $white;
        user-select: none;
        cursor: pointer;

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
      color: $white;

      input {
        background: $black;
        color: $white;
        color-scheme: dark;
      }

      button[type="submit"] {
        border: 1px solid $white;
        background: $black;
        color: $white;

        &:hover {
          background: $white;
          color: $black;
        }
      }

      textarea {
        background: $black;
        color: $white;
      }

      .upload-controls {
        .control {
          background: $white;
          color: $black;
        }
      }
    }
  }

  :global(.uploadcare--widget__button_type_open) {
    background-color: $white;
    color: $black;
    border: 1px solid $black;
    cursor: pointer;
    transition: unset;
    font-family: $REGULAR_STACK;
  }

  :global(.uploadcare--widget__button_type_open:hover) {
    background-color: $black;
    color: $white;
  }

  :global(.inverted .uploadcare--widget__button_type_open) {
    background-color: $black;
    color: $white;
    border: 1px solid $white;
    cursor: pointer;
    transition: unset;
    font-family: $REGULAR_STACK;
  }

  :global(.inverted .uploadcare--widget__button_type_open:hover) {
    background-color: $white;
    color: $black;
  }
</style>
