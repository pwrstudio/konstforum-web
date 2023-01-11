import { loadData } from "$lib/modules/sanity.js"
// import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const catagoriesEvent = await loadData("*[_id == 'categories-event'][0]")
    return { catagoriesEvent };
}