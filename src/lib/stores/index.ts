import { writable, derived, type Readable } from "svelte/store";
import { Language } from "$lib/types";

// --- UI
export const menuActive = writable(false);
export const focusedPost = writable("");
export const mapMode = writable(false);
export const searchInputActive = writable(false);

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
export const rawPosts = writable([]);


// --- EVENT TYPES
export const activeEventTypes = writable([] as string[]);

// --- POSTS
export const rawEvents = writable([]);


// --- DERIVED: POST
export const activeTypePosts = derived([rawPosts, activeTypes], ([$rawPosts, $activeTypes]) => {
    return $rawPosts.filter(p => $activeTypes.includes(p.type))
})
export const filteredPosts = derived([activeTypePosts, activeTags], ([$activeTypePosts, $activeTags]) => {
    const intersection = (arr1: string[], arr2: string[]) => arr1.some(r => arr2.includes(r))
    if ($activeTags.length === 0) return $activeTypePosts
    return $activeTypePosts.filter(p => intersection($activeTags, p.tags_sve))
})
export const splitPosts = derived([filteredPosts], ([$filteredPosts]) => {
    let splitPosts = { evens: [], odds: [] }
    for (let i = 0; i < $filteredPosts.length; i++) {
        if (i % 2 === 0) {
            splitPosts.evens.push($filteredPosts[i]);
        } else {
            splitPosts.odds.push($filteredPosts[i]);
        }
    }
    return splitPosts;
})



// --- DERIVED: TAG
export const allTags: Readable<string[]> = derived([rawPosts], ([$rawPosts]) => {
    // Get all tags from posts, filter out undefined, make unique
    return Array.from(new Set($rawPosts.flatMap(p => p.tags_sve).filter(t => t !== undefined)));
});
export const activeTypeTags: Readable<string[]> = derived([activeTypePosts], ([$activeTypePosts]) => {
    // Get all tags from posts of the active type, filter out undefined, make unique
    return Array.from(new Set($activeTypePosts.flatMap(p => p.tags_sve).filter(t => t !== undefined)));
});

// --- DERIVED: EVENT
export const activeTypeEvents = derived([rawEvents, activeEventTypes], ([$rawEvents, $activeEventTypes]) => {
    return $rawEvents.filter(e => $activeEventTypes.includes(e.type))
})

export const filteredEvents = derived([rawEvents, activeEventTypes], ([$rawEvents, $activeEventTypes]) => {
    return $rawEvents
})