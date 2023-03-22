import { loadData } from "$lib/modules/sanity.js"
// import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const posts = await loadData("*[_type == 'post'] | order(_createdAt desc)")
    const events = await loadData("*[_type == 'event'] | order(time desc)")
    const categoriesEvent = await loadData("*[_id == 'categories-event'][0]")
    const categoriesArtist = await loadData("*[_id == 'categories-artist'][0]")
    const categoriesOrganisation = await loadData("*[_id == 'categories-organisation'][0]")
    const categoriesParticipant = await loadData("*[_id == 'categories-participant'][0]")
    const categoriesProject = await loadData("*[_id == 'categoeries-project'][0]")

    return {
        posts,
        events,
        categoriesEvent,
        categoriesArtist,
        categoriesOrganisation,
        categoriesParticipant,
        categoriesProject
    };
}