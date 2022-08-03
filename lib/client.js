import sanityClient from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';


export const client = sanityClient({
  projectId: "7p20qjpa",
  dataset: 'production',
  apiVersion: '2022-08-02',
  useCdn:true,
  token:
  "sk4oeAsFd7ybWNiuNrw7YySiAKU6kZ0lHoVKmDRey60zhynHLSu6IKRNylDettJ4VORL42HPU2lzsyamkFOr3xHt7mhLKgfsWgqtkzqapNl8BqykOYuRuM9QWkKsvI653Solr3dY8hhFbjEPqjEJWvkkJnNIaOOkhYiEmFVxkiAZNw2l0LMU"
})

const builder = ImageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)