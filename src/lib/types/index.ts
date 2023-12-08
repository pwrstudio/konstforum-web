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

type Span = {
    _key: string;
    _type: 'span';
    marks: any[];
    text: string;
};

export type Block = {
    _type: 'block';
    style: string;
    _key: string;
    markDefs: any[];
    children: Span[];
};

type LimitedEditor = {
    _type: 'limitedEditor';
    content: Block[];
};

type Link = {
    url: string;
    _type: 'link';
    _key: string;
    title: string;
};

type ImageAsset = {
    _ref: string;
    _type: 'reference';
};

export type Image = {
    _key?: string
    _type: 'image';
    asset: ImageAsset;
    bildtext_sve?: string;
    bildtext_eng?: string;
};

export type ImageDyad = {
    _key?: string
    _type: 'imageDyad';
    bild: Image;
    dither: Image;
};

type Slug = {
    current: string;
    _type: 'slug';
};

export type Post = {
    content_sve: LimitedEditor;
    emailAddress: string;
    tags_sve: string[];
    socialMediaLinks: Link[];
    locationText_eng: string;
    locationText_sve: string;
    _id: string;
    _updatedAt: string;
    slug: Slug;
    shortText_sve: LimitedEditor;
    title_eng: string;
    website: string;
    _rev: string;
    type: string;
    tags_eng: string[];
    mainImage: ImageDyad;
    _createdAt: string;
    shortText_eng: LimitedEditor;
    visibility: 'public' | 'private';
    _type: 'post';
    content_eng: LimitedEditor;
    title: string;
};

