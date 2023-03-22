<script lang="ts">
  import type { Field, Title } from "./types"
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
      name: "startDateTime",
      label: {
        se: "Start: datum och tid",
        en: "Start: date and time",
      },
      required: true,
    },
    {
      type: FieldType.DateTime,
      name: "endDateTime",
      label: {
        se: "Slut: Datum och tid",
        en: "End: date and time",
      },
      required: false,
    },
    // {
    //   type: FieldType.TextArea,
    //   name: "description",
    //   label: {
    //     se: "Beskrivning (svenska)",
    //     en: "Description (swedish)",
    //   },
    //   placeholder: {
    //     se: "(max 300 ord)",
    //     en: "(maximum 300 words)",
    //   },
    //   required: true,
    // },
    // {
    //   type: FieldType.TextArea,
    //   name: "description-english",
    //   label: {
    //     se: "Beskrivning (engelska)",
    //     en: "Description (english)",
    //   },
    //   placeholder: {
    //     se: "(max 300 ord)",
    //     en: "(maximum 300 words)",
    //   },
    //   required: true,
    // },
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
        se: "Sociala media länkar (Instagram, Twitter, etc...)",
        en: "Social media links (Instagram, Twitter, etc...)",
      },
      required: false,
    },
  ]

  const title: Title = {
    se: "Nytt evenemang?",
    en: "New event?",
  }

  const maxImages = 5

  const inverted = true
</script>

<Form {formId} {fields} {title} {maxImages} {inverted} />
