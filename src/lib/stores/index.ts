import { writable, derived, type Readable } from "svelte/store";
import { Language, type Post } from "$lib/types";
import { shuffleArray, intersection } from "$lib/utils";

// --- UI
export const menuActive = writable(false);
export const focusedPost = writable("");
export const mapMode = writable(false);
export const searchInputActive = writable(false);
export const isSearch = writable(false);
export const searchTerm = writable("");
export const activeEventSlug = writable("");
export const categories = writable({})

// --- LANGUAGE
export const languageStore = writable(Language.Swedish);
export const urlPrefix: Readable<string> = derived([languageStore], ([$languageStore]) => {
    return $languageStore === Language.English ? "/en/" : "/"
})

// --- TYPES
export const activeTypes = writable([] as string[]);

// --- TAGS
export const activeTags = writable([] as string[]);

// --- POSTS
export const rawPosts = writable([] as Post[]);

// --- EVENT TYPES
export const activeEventTypes = writable([] as string[]);

// --- POSTS
export const rawEvents = writable([]);

// --- DERIVED: POST
export const activeTypePosts = derived([rawPosts, activeTypes], ([$rawPosts, $activeTypes]) => {
    return $rawPosts.filter(p => $activeTypes.includes(p.type))
})

export const filteredPosts = derived([activeTypePosts, activeTags, languageStore], ([$activeTypePosts, $activeTags, $languageStore]) => {
    if ($activeTags.length === 0) return $activeTypePosts
    return $activeTypePosts.filter(p => intersection($activeTags, $languageStore === Language.English ? p.tags_eng ?? [] : p.tags_sve ?? []))
})

export const splitPosts = derived([filteredPosts], ([$filteredPosts]) => {
    let splitPosts = { evens: [] as Post[], odds: [] as Post[] }
    for (let i = 0; i < $filteredPosts.length; i++) {
        if (i % 2 === 0) {
            splitPosts.evens.push($filteredPosts[i]);
        } else {
            splitPosts.odds.push($filteredPosts[i]);
        }
    }

    const seed = new Date().getMinutes();
    splitPosts.evens = shuffleArray(splitPosts.evens, seed)
    splitPosts.odds = shuffleArray(splitPosts.odds, seed)

    return splitPosts;
})

// --- DERIVED: TAG
export const allTags: Readable<string[]> = derived([rawPosts, languageStore], ([$rawPosts, $languageStore]) => {
    // Get all tags from posts, filter out undefined, make unique
    return Array.from(new Set($rawPosts.flatMap(p => $languageStore === Language.English ? p.tags_eng : p.tags_sve).filter(t => t !== undefined)));
});

export const activeTypeTags: Readable<string[]> = derived([activeTypePosts, languageStore], ([$activeTypePosts, $languageStore]) => {
    // Get all tags from posts of the active type, filter out undefined, make unique
    return Array.from(new Set($activeTypePosts.flatMap(p => $languageStore === Language.English ? p.tags_eng : p.tags_sve).filter(t => t !== undefined)));
});

// --- DERIVED: EVENT
export const activeTypeEvents = derived([rawEvents, activeEventTypes], ([$rawEvents, $activeEventTypes]) => {
    return $rawEvents.filter(e => $activeEventTypes.includes(e.type))
})

export const filteredEvents = derived([rawEvents, activeTypeEvents], ([$rawEvents, $activeTypeEvents]) => {
    return $activeTypeEvents
})