<script lang="ts">
  import type { Field, TagsList } from "./types"
  import { FieldType } from "./types"
  import Form from "./Form.svelte"

  const formId = "B3Lv8NdO"

  const fields: Field[] = [
    {
      type: FieldType.Text,
      name: "name",
      label: {
        se: "Namn på evenemang eller projekt",
        en: "Name of the event or project",
      },
      required: true,
    },
    {
      type: FieldType.Email,
      name: "email",
      label: {
        se: "Epost (kontaktperson)",
        en: "Email",
      },
      required: true,
    },
    {
      type: FieldType.Text,
      name: "location",
      label: {
        se: "Plats",
        en: "Location",
      },
      required: true,
    },
    {
      type: FieldType.DateTime,
      name: "dateTime",
      label: {
        se: "Datum och tid",
        en: "Date and time",
      },
      required: true,
    },
    {
      type: FieldType.TextArea,
      name: "about",
      label: {
        se: "Om evenemanget",
        en: "About the event",
      },
      required: true,
    },
    {
      type: FieldType.TextArea,
      name: "about-english",
      label: {
        se: "Om evenemanget (engelska)",
        en: "About the event (English)",
      },
      required: true,
    },
    {
      type: FieldType.Url,
      name: "website",
      label: {
        se: "Hemsida",
        en: "Website",
      },
      required: false,
    },
    {
      type: FieldType.Text,
      name: "socialMedia",
      label: {
        se: "Sociala media (Instagram, Twitter, etc...)",
        en: "Social media (Instagram, Twitter, etc...)",
      },
      required: false,
    },
  ]

  const title = "Nytt evenemang?"

  const maxImages = 5

  const inverted = true
</script>

<Form {formId} {fields} {title} {maxImages} {inverted} />
