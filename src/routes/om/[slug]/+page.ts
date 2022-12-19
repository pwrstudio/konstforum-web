import { loadData } from "$lib/modules/sanity.js"
// import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    console.log(params)
    const post = await loadData("*[_id == $slug][0]", { slug: params.slug })
    return { post };
}