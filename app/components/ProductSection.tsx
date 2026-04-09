import { ProduktKort } from "./ProduktKort";
import { getGardsutsalgProdukter } from "../../src/sanity/lib/home-data";

export async function ProductSection() {
  const produkter = await getGardsutsalgProdukter();
  if (produkter.length === 0) return null;

  return (
    <section
      className="mt-16 sm:mt-20 md:mt-24"
      aria-labelledby="gardsutsalg-heading"
    >
      <h2
        id="gardsutsalg-heading"
        className="mb-10 text-center font-sans text-3xl font-black leading-tight tracking-tight text-white antialiased drop-shadow-[0_4px_28px_rgba(0,0,0,0.55)] sm:mb-12 sm:text-4xl md:text-5xl"
      >
        Fra Gårdsutsalget
      </h2>
      <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8">
        {produkter.map((p) => (
          <li key={p._id}>
            <ProduktKort produkt={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
