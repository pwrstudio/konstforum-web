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

  const tags = [
    {
      label: {
        sve: "Open call",
        eng: "Open call",
      },
      value: "open-call",
    },
    {
      label: {
        sve: "Vernissage",
        eng: "Opening",
      },
      value: "vernissage",
    },
    {
      label: {
        sve: "Finissage",
        eng: "closing event",
      },
      value: "finissage",
    },
    {
      label: {
        sve: "Performance",
        eng: "Performance",
      },
      value: "performance",
    },
    {
      label: {
        sve: "Workshop",
        eng: "Workshop",
      },
      value: "Workshop",
    },
    {
      label: {
        sve: "Läsning",
        eng: "Reading",
      },
      value: "läsning",
    },
    {
      label: {
        sve: "Föreläsning",
        eng: "Lecture",
      },
      value: "föreläsning",
    },
    {
      label: {
        sve: "Konstnärssamtal",
        eng: "Artist Talk",
      },
      value: "konstnärssamtal",
    },
  ]

  const title = "Nytt evenemang?"

  const maxImages = 5

  const inverted = true
</script>

<Form {formId} {fields} {tags} {title} {maxImages} {inverted} />
