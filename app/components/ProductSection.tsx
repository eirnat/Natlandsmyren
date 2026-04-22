import { ProduktKort } from "./ProduktKort";
import { getGardsutsalgProdukter } from "../../src/sanity/lib/home-data";

export async function ProductSection() {
  const produkter = await getGardsutsalgProdukter();
  const synligeProdukter = produkter.slice(0, 3);
  if (synligeProdukter.length === 0) return null;

  return (
    <section
      className="mt-16 sm:mt-20 md:mt-24"
      aria-labelledby="gardsutsalg-heading"
    >
      <h2
        id="gardsutsalg-heading"
        className="mb-10 text-center font-display text-4xl font-black leading-tight tracking-tight text-moss antialiased sm:mb-12 sm:text-5xl md:text-6xl"
      >
        Fra Gårdsutsalget
      </h2>
      <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8">
        {synligeProdukter.map((p) => (
          <li key={p._id}>
            <ProduktKort produkt={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
