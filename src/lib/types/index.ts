export enum MainPageType {
    Landing,
    Listing,
    Single
}

export enum Language {
    Swedish,
    English
}

export enum UIColor {
    Black,
    White
}

export interface AboutPageType {
    title: string
    title_eng: string
    intro_sve: any
    intro_eng: any
    content_sve: any
    content_eng: any
}

export interface ContactPageType {
    info_sve: any
    info_eng: any
    content_sve: any
    content_eng: any
}

export interface ProjectType {
    _id: string
    title: string
    title_eng: string
    content_sve: any
    content_eng: any
    layout: string
    tidskategori: string
    kategori_sve: string
    kategori_eng: string
    rubriktext_sve: string
    rubriktext_eng: string
    mainImage: any
    slug: {
        type: "slug"
        current: string
    }
    bildspel?: any[]
}

export interface ArtistType {
    _id: string
    title: string
    title_eng: string
    content_sve: any
    content_eng: any
    tidskategori: string
    nationalitet: string
    konstnarer: string[]
    mainImage: any
    slug: {
        type: "slug"
        current: string
    }
}

export interface ArtistsType {
    [index: number]: ArtistType
}

export interface MenuItem {
    title: { sve: string, eng: string }
    link: string
}

