<script lang="ts">
  import type { Field, PostType, Title } from "./types"
  import { FieldType } from "./types"
  import Form from "./Form.svelte"

  const formId = "zl71ZJW3"

  const fields: Field[] = [
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
      type: FieldType.Email,
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
        se: "Bor och är verksam i (postnummer, ort):",
        en: "Based in (postcode, city):",
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
      exclusiveTo: "project",
    },
    {
      type: FieldType.TextArea,
      name: "description",
      label: {
        se: "Beskrivning (svenska)",
        en: "Description (swedish)",
      },
      placeholder: {
        se: "(max 300 ord)",
        en: "(maximum 300 words)",
      },
      required: true,
    },
    {
      type: FieldType.TextArea,
      name: "description-english",
      label: {
        se: "Beskrivning (engelska)",
        en: "Description (english)",
      },
      placeholder: {
        se: "(max 300 ord)",
        en: "(maximum 300 words)",
      },
      required: true,
    },
    {
      type: FieldType.Text,
      name: "openingHours",
      label: {
        se: "Öppettider",
        en: "Opening hours",
      },
      required: false,
      exclusiveTo: "organisation",
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
        se: "Sociala media länkar (Instagram, Twitter, etc...)",
        en: "Social media links (Instagram, Twitter, etc...)",
      },
      required: false,
    },
  ]

  const postTypes: PostType[] = [
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
        en: "Professionals",
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

  const title: Title = {
    se: "Var med på konstforum?",
    en: "Want to join Konstforum?",
  }

  const maxImages = 5
</script>

<Form {formId} {fields} {postTypes} {title} {maxImages} />
