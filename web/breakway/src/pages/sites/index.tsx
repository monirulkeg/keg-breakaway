import { getSites } from "@/client";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import TableView from "@/components/table-view";
import { Site } from "@/types/site";
import { SiteStaticDataHandler } from "@/handlers/site-static-data-handler";

export const getServerSideProps = (async () => {
  const sites: Site[] = await getSites();
  return { props: { sites } };
}) satisfies GetServerSideProps<{ sites: Site[] }>;

export default function Sites({
  sites,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <div className="flex flex-row">
        <div className="grow">
          <TableView
            title="Site table"
            data={sites}
            columns={["name", "slug"]}
            linkedColumn={["name", "slug"]}
            linkItemKey="slug"
            route="/sites"
            keyExtractor={(site) => site._id}
          />
        </div>
      </div>
    </main>
  );
}
