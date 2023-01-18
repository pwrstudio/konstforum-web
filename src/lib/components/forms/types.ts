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
    placeholder?: {
        se: string
        en: string
    },
    required: boolean,
    exclusiveTo?: string
}

export type PostType = {
    name: string
    label: {
        se: string
        en: string
    }
}

export type Tag = {
    label: {
        sve: string
        eng: string
    },
    id: string
}

export type TagsList = {
    [id: string]: Tag[];
}

export type Title = {
    se: string
    en: string
}
