import sanityClient from "@sanity/client";

export default sanityClient({
    projectId: "ocl05k0f",
    dataset: "production",
    apiVersion: "2021-10-10",
    useCdn: true,
});
