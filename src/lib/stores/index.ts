import { writable, derived, type Readable } from "svelte/store";
import { Language } from "$lib/types";

// --- UI
export const languageStore = writable(Language.Swedish);
export const menuActive = writable(false);

// --- TYPES
export const activeTypes = writable([] as string[]);

// --- TAGS
export const activeTags = writable([] as string[]);

// --- POSTS
export const rawPosts = writable([]);

// --- DERIVED
export const activeTypePosts = derived([rawPosts, activeTypes], ([$rawPosts, $activeTypes]) => {
    return $rawPosts.filter(p => $activeTypes.includes(p.type))
})

export const filteredPosts = derived([activeTypePosts, activeTags], ([$activeTypePosts, $activeTags]) => {
    const intersection = (arr1: string[], arr2: string[]) => arr1.some(r => arr2.includes(r))
    if ($activeTags.length === 0) return $activeTypePosts
    return $activeTypePosts.filter(p => intersection($activeTags, p.tags_sve))
})

export const allTags: Readable<string[]> = derived([rawPosts], ([$rawPosts]) => {
    // Get all tags from posts, filter out undefined, make unique
    return Array.from(new Set($rawPosts.flatMap(p => p.tags_sve).filter(t => t !== undefined)));
});

export const activeTypeTags: Readable<string[]> = derived([activeTypePosts], ([$activeTypePosts]) => {
    // Get all tags from posts of the active type, filter out undefined, make unique
    return Array.from(new Set($activeTypePosts.flatMap(p => p.tags_sve).filter(t => t !== undefined)));
});

export const urlPrefix: Readable<string> = derived([languageStore], ([$languageStore]) => {
    return $languageStore === Language.English ? "/en/" : "/"
})

// const tags =
// language === Language.English
//   ? $filteredPosts.flatMap(p => p.tags_eng).filter(t => t !== undefined)
//   : $filteredPosts.flatMap(p => p.tags_sve).filter(t => t !== undefined)