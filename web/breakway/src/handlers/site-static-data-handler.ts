import client from "@/client";
import { Product } from "@/types/product";
import { Site } from "@/types/site";

export class SiteStaticDataHandler {
    static async getSites(): Promise<Site[]>{
        return client.fetch('*[_type == "site"]');
    }

    static async getSite(slug: string): Promise<Site> {
        if (!slug) {
            return Promise.reject(new Error("Slug parameter is required and cannot be empty."));
        }
        const query = `*[_type == "site" && slug == $slug][0]{...}`;
        return client.fetch(query, { slug });
    }

    static async getProducts(query?: string) : Promise<Product[]> {
        if(query) {
            return client.fetch(query)        
        } else {
            return client.fetch('*[_type == "product"]');
        }
    }

    static async getProduct(id: string): Promise<Product> {
        if (!id) {
            return Promise.reject(new Error("Slug parameter is required and cannot be empty."));
        }
        const query = `*[_type == "product" && _id == $id][0]{...}`;
        return client.fetch(query, { id });
    }

  }