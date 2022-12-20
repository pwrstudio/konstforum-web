import { loadData } from "$lib/modules/sanity.js"
// import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const posts = await loadData("*[_type == 'post'] | order(_createdAt desc)")
    const events = await loadData("*[_type == 'event'] | order(_createdAt desc)")

    return {
        posts,
        events
    };
}