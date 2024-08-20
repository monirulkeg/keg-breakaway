// import { useRouter } from "next/router";
// import { SiteStaticDataHandler } from "@/handlers/site-static-data-handler";
// import { useEffect, useState } from "react";
// import { Site } from "@/types/site";

// export default function Page() {
//   const router = useRouter();
//   const { slug } = router.query;
//   const [site, setSite] = useState<Site>();

//   useEffect(() => {
//     const fetchSite = async () => {
//       try {
//         if (!slug) return;
//         const site = await SiteStaticDataHandler.getSite(slug as string);
//         setSite(site);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchSite();
//   }, [slug]);

//   return (
//     <div>
//       <p>Site id: {site?._id}</p>
//       <p>Site name: {site?.name}</p>
//       <p>Site slogan: {site?.slogan}</p>
//     </div>
//   );
// }

import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { SiteStaticDataHandler } from "@/handlers/site-static-data-handler";
import { Site } from "@/types/site";
import TableView from "@/components/table-view";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export const getStaticPaths = (async () => {
  const sites = await SiteStaticDataHandler.getSites();
  const pathData = sites.map((site) => {
    return { params: { slug: site.slug } };
  });
  return {
    paths: pathData,
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context: any) => {
  const { slug } = context.params;
  const site = await SiteStaticDataHandler.getSite(slug);
  if (!site) {
    return { notFound: true };
  }
  return { props: { site } };
}) satisfies GetStaticProps<{
  site: Site;
}>;

export default function Page({
  site,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <p>{site.name}</p>
    </main>
  );
}
