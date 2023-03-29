import { loadData } from "$lib/modules/sanity.js"
// import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const posts = await loadData("*[_type == 'news'] | order(_createdAt desc)")
    return {
        posts
    };
}