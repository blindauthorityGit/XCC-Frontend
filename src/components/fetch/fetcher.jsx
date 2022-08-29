import sanityClient from "../../client";
import imageUrlBuilder from "@sanity/image-url";

async function youtubeFetcher() {
    const res = await sanityClient.fetch(
        `*[_type == 'youtube']
      `
    );
    return res;
}

export default youtubeFetcher;
