import { loadData } from "$lib/modules/sanity.js"
// import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const event = await loadData("*[_type == 'event' && slug.current == $slug][0]", { slug: params.slug })
    return { event };
}