import sanityClient from '@sanity/client';

export const client = sanityClient({
    projectId: 'x3om3fk0',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: false, // this is set to false because we are going to be fetching new video data each time we reload the page.
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
