import { loadData } from "$lib/modules/sanity.js"
// import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const events = await loadData("*[_type == 'event'] | order(_createdAt desc)")
    return { events };
}