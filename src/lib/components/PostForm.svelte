<script lang="ts">
  const FORMSPARK_ACTION_URL = "https://submit-form.com/zl71ZJW3"

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
        se: "Namn",
        en: "Name",
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
        se: "Bor och är verksam i (ort):",
        en: "Based in (city):",
      },
      required: true,
    },
    {
      type: FieldType.TextArea,
      name: "bio",
      label: {
        se: "Biografi",
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

  const postTypes = [
    {
      name: "artist",
      label: {
        se: "Konstnär",
        en: "Artist",
      },
    },
    {
      name: "organisation",
      label: {
        se: "Organisation",
        en: "Organisation",
      },
    },
    {
      name: "participant",
      label: {
        se: "Verksam",
        en: "Participant",
      },
    },
    {
      name: "project",
      label: {
        se: "Projekt",
        en: "Project",
      },
    },
  ]
</script>

<!-- <form on:submit|preventDefault={onSubmit}> -->
<form action={FORMSPARK_ACTION_URL}>
  <!-- TYP -->
  <div class="form-section">
    <fieldset>
      <legend>Var med på konstforum?</legend>
      {#each postTypes as type, i}
        <div>
          <input
            type="radio"
            name="type"
            id={type.name}
            value={type.name}
            checked={i === 0}
          />
          <label for={type.name}>{type.label.se}</label>
        </div>
      {/each}
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
      border: 1px solid $black;
    }

    textarea {
      width: 100%;
      line-height: 1.5em;
      font-size: $FONT_SIZE_MEDIUM;
      font-family: $REGULAR_STACK;
      padding: 5px;
      border-radius: 10px;
      border: 1px solid $black;
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
