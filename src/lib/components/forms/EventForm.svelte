<script lang="ts">
  import type { Field } from "./types"
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
      type: FieldType.Text,
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
      type: FieldType.Text,
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
      type: FieldType.Text,
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
