<script lang="ts">
  import type { Field, PostType } from "./types"
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
        se: "Bor och är verksam i (ort):",
        en: "Based in (city):",
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
      name: "bio",
      label: {
        se: "Biografi",
        en: "Biography",
      },
      required: true,
    },
    {
      type: FieldType.TextArea,
      name: "bio-english",
      label: {
        se: "Biografi (engelska)",
        en: "Biography (english)",
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
        se: "Sociala media (Instagram, Twitter, etc...)",
        en: "Social media (Instagram, Twitter, etc...)",
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

  const title = "Var med på konstforum?"

  const maxImages = 5
</script>

<Form {formId} {fields} {postTypes} {title} {maxImages} />
