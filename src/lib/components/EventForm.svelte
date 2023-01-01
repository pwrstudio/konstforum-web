<script lang="ts">
  const FORMSPARK_ACTION_URL = "https://submit-form.com/B3Lv8NdO"

  const enum FieldType {
    Text,
    TextArea,
    Upload,
  }

  const fields = [
    {
      type: FieldType.Text,
      name: "name",
      label: {
        se: "Namn på eventet eller projektet",
        en: "Name of the event or project",
      },
      required: true,
    },
    {
      type: FieldType.Text,
      name: "email",
      label: {
        se: "Epost",
        en: "Email",
      },
      required: true,
    },
    {
      type: FieldType.Text,
      name: "location",
      label: {
        se: "Plats:",
        en: "Location:",
      },
      required: true,
    },
    {
      type: FieldType.TextArea,
      name: "about",
      label: {
        se: "Kort om evenemanget:",
        en: "Biography",
      },
      required: true,
    },
    {
      type: FieldType.Upload,
      name: "image",
      label: {
        se: "Bild",
        en: "Image",
      },
      required: true,
    },
  ]
</script>

<form action={FORMSPARK_ACTION_URL}>
  <!-- TYP -->
  <div class="form-section">
    <fieldset>
      <legend>NYTT EVENEMANG?</legend>
    </fieldset>
  </div>
  {#each fields as field}
    <div class="form-section">
      <label for={field.name}>{field.label.se}{field.required ? "*" : ""}</label
      >
      {#if field.type === FieldType.Text}
        <input
          type="text"
          id={field.name}
          name={field.name}
          required={field.required}
        />
      {:else if field.type === FieldType.TextArea}
        <textarea id={field.name} name={field.name} required={field.required} />
      {:else if field.type === FieldType.Upload}
        <!-- svelte-ignore a11y-unknown-role -->
        <input
          type="hidden"
          id={field.name}
          name={field.name}
          required={field.required}
          role="uploadcare-uploader"
          data-public-key="cc687b96511581c9f7b5"
        />
      {/if}
    </div>
  {/each}
  <!-- SUBMIT -->
  <div class="form-section">
    <button type="submit">Skicka in</button>
  </div>
</form>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  form {
    margin-left: 10px;
    margin-right: 10px;

    label {
      display: block;
      font-family: $COMPRESSED_STACK;
      font-size: $FONT_SIZE_MEDIUM;
      text-transform: uppercase;
    }

    legend {
      font-family: $COMPRESSED_STACK;
      font-size: $FONT_SIZE_MEDIUM;
      text-transform: uppercase;
    }

    fieldset {
      border: unset;
      label {
        display: inline;
      }
    }

    .form-section {
      margin-top: 10px;
    }

    input[type="text"] {
      width: 100%;
      line-height: 1.5em;
      font-size: $FONT_SIZE_MEDIUM;
      font-family: $REGULAR_STACK;
      padding: 5px;
      border-radius: 10px;
      border: 1px solid $white;
      color: $white;
      background: $black;
    }

    textarea {
      width: 100%;
      line-height: 1.5em;
      font-size: $FONT_SIZE_MEDIUM;
      font-family: $REGULAR_STACK;
      padding: 5px;
      border-radius: 10px;
      border: 1px solid $white;
      color: $white;
      background: $black;
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
    }
  }
</style>
