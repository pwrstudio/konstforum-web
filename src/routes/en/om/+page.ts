import { loadData } from "$lib/modules/sanity.js"
// import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const post = await loadData("*[_id == 'about'][0]")
    return {
        post
    };
}