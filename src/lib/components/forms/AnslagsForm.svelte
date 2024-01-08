<script lang="ts">
  import type { Field, Title } from "./types"
  import { FieldType } from "./types"
  import Form from "./Form.svelte"

  const formId = "850g86O8H"

  const fields: Field[] = [
    {
      type: FieldType.Text,
      name: "name",
      label: {
        se: "Namn/organisation",
        en: "Name/organization",
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
      type: FieldType.TextArea,
      name: "message",
      label: {
        se: "Anslagstext",
        en: "Message",
      },
      placeholder: {
        se: "Fri text (max 50 ord)",
        en: "Free text (maximum 50 words)",
      },
      required: true,
    },
  ]
  const title: Title = {
    se: "Nytt anslag?",
    en: "New message?",
  }

  const maxImages = 0

  const inverted = true

  const simple = true
</script>

<Form {formId} {fields} {title} {maxImages} {inverted} {simple} />
