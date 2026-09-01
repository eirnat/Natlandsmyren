import { ProduktKort } from "./ProduktKort";
import { getGardsutsalgProdukter } from "../../src/sanity/lib/home-data";

export async function ProductSection() {
  const produkter = await getGardsutsalgProdukter();
  const synligeProdukter = produkter.slice(0, 3);
  if (synligeProdukter.length === 0) return null;

  return (
    <section
      className="mt-[var(--space-5)]"
      aria-labelledby="gardsutsalg-heading"
    >
      <h2
        id="gardsutsalg-heading"
        className="mb-[var(--space-3)] text-center font-display text-section font-semibold text-foreground"
      >
        Fra Gårdsutsalget
      </h2>
      <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
        {synligeProdukter.map((p) => (
          <li key={p._id}>
            <ProduktKort produkt={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
