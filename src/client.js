import sanityClient from "@sanity/client";

export default sanityClient({
    projectId: "h03rjml9",
    dataset: "production",
    apiVersion: "2021-10-10",
    useCdn: true,
});
