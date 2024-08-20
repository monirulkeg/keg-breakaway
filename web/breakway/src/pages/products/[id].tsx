import client, { getProducts } from "@/client";
import { SiteStaticDataHandler } from "@/handlers/site-static-data-handler";
import { Product } from "@/types/product";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticPaths = (async () => {
  const products = await getProducts();
  const pathsData = products.map((p) => ({ params: { id: p._id } }));

  return { paths: pathsData, fallback: false };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context: any) => {
  const { id } = context.params;
  const product = await SiteStaticDataHandler.getProduct(id);
  if (!product) {
    return { notFound: true };
  }
  return { props: { product } };
}) satisfies GetStaticProps<{
  product: Product;
}>;

export default function ProductPage({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <p>{product.name}</p>
    </main>
  );
}
