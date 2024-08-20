
import {createClient, type ClientConfig} from '@sanity/client'
import { Product } from './types/product';

const config: ClientConfig = {
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,//'qdok5rd1',
    dataset: process.env.NEXT_PUBLIC_DATASET,
    useCdn: true,
    apiVersion: '2023-05-03', 
  
}
const client = createClient(config)
export default client;

export async function getProducts(query?: string) : Promise<Product[]> {
    if(query){
        return client.fetch(query)        
    } else {
        return client.fetch('*[_type == "product"]');
    }
}

export async function getSites() {
    return await client.fetch('*[_type == "site"]{_id, name, slug}');
}


export const getMockProducts = () => {
    return Promise.resolve([
      { _id: 1, name: 'First product', price: 1000 },
      { _id: 2, name: 'Second product', price: 1200 },
      { _id: 3, name: 'Third product', price: 50 },
    ]);
  };