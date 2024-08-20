import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import TableView from "@/components/table-view";
import { SiteStaticDataHandler } from "@/handlers/site-static-data-handler";
import { Product } from "@/types/product";

export const getServerSideProps = (async () => {
  const products: Product[] = await SiteStaticDataHandler.getProducts();
  return { props: { products } };
}) satisfies GetServerSideProps<{ products: Product[] }>;

export default function Products({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <div className="flex flex-row">
        <div className="grow">
          <TableView
            title="Site table"
            data={products}
            columns={["name", "price"]}
            linkedColumn={["name"]}
            linkItemKey="_id"
            route="/products"
            keyExtractor={(site) => site._id}
          />
        </div>
      </div>
    </main>
  );
}
