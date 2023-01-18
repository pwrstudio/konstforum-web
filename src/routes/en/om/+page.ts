import { loadData } from "$lib/modules/sanity.js"
// import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const posts = await loadData("*[_id in ['about', 'faq', 'kontakt']]")
    return {
        posts
    };
}