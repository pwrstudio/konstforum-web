export const enum FieldType {
    Text,
    Email,
    TextArea,
    Url,
    DateTime
}

export type Field = {
    type: FieldType
    name: string
    label: {
        se: string
        en: string
    },
    required: boolean
}

export type PostType = {
    name: string
    label: {
        se: string
        en: string
    }
}

export type UploadType = {
    file: string
    caption: string
}