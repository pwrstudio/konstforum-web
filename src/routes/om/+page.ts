import { loadData } from "$lib/modules/sanity.js"
// import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const about = await loadData("*[_id == 'about'][0]")
    const faq = await loadData("*[_id == 'faq'][0]")
    const contact = await loadData("*[_id == 'contact'][0]")
    return {
        about, faq, contact
    };
}