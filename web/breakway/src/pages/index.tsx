import Header from "@/components/header";
import Column from "@/components/column";
import { useEffect, useState } from "react";
import { getMockProducts, getProducts, getSites } from "@/client";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Product } from "@/types/product";
import TableView from "@/components/table-view";
import { Site } from "@/types/site";

type Results = {
  products: Product[];
  sites: Site[];
};

export const getServerSideProps = (async () => {
  const products: Product[] = await getProducts(
    '*[_type == "product"][0...6]{_id, name, price}'
  );
  const sites: Site[] = await getSites();
  const results: Results = { products: products, sites: sites };

  return { props: { results } };
}) satisfies GetServerSideProps<{ results: Results }>;

export default function Home({
  results,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const products = results?.products || [];
  const sites = results?.sites || [];

  return (
    <main>
      <div className="flex flex-row">
        <div className="basis-1/3">
          <Column>
            <TableView
              title="Site table"
              data={sites}
              columns={["name", "slug"]}
              linkedColumn={["slug"]}
              linkItemKey="slug"
              route="/sites"
              keyExtractor={(site) => site._id}
            />
          </Column>
        </div>
        <div className="basis-1/3">
          <Column>
            <TableView
              title="Product table"
              data={products}
              columns={["name", "price"]}
              keyExtractor={(product) => product._id}
            />
          </Column>
        </div>
        <div className="basis-1/3">
          <Column>
            <div>Third column</div>
          </Column>
        </div>
      </div>
    </main>
  );
}
