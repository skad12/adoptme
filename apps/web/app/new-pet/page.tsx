import Link from "next/link";
import { ArrowRight, BookOpen, HeartHandshake, Scissors, GraduationCap, Stethoscope, Sun } from "lucide-react";
import { PetTypeNav } from "@/components/shop/pet-type-nav";
import { Card } from "@/components/ui/card";
import { fetchTaxonomy } from "@/lib/catalog";

export default async function NewPetPage() {
  const { petTypes } = await fetchTaxonomy();

  const services = [
    { icon: GraduationCap, title: "Training", body: "Fun, effective group & private classes", href: "/services/training" },
    { icon: Scissors, title: "Grooming", body: "Expert stylists for all breeds", href: "/services/grooming" },
    { icon: Stethoscope, title: "Veterinary Care", body: "Trusted vets at your local store", href: "/services/veterinary-care" },
    { icon: Sun, title: "Doggie Day Camp", body: "Games & exercise for body & mind", href: "/services/doggie-day-camp" },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:px-6">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Hello, new pet parent!</h1>
        <p className="mx-auto max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Find everything you need for raising a happy, healthy best friend — products, advice, adoption, and services.
        </p>
      </div>

      <PetTypeNav petTypes={petTypes} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {petTypes.slice(0, 6).map((pet) => (
          <Card key={pet.slug} className="space-y-3 p-5">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">New {pet.name.toLowerCase()} essentials</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{pet.description}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={`/shop/${pet.slug}`} className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Shop supplies →
              </Link>
              <Link href={`/learn?petType=${pet.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                <BookOpen className="h-3.5 w-3.5" /> Guides
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Adoption resources</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="space-y-2 p-5">
            <HeartHandshake className="h-6 w-6 text-emerald-600" />
            <h3 className="font-semibold">Adopt at AdoptMe</h3>
            <p className="text-sm text-zinc-600">We partner with local rescues & shelters.</p>
            <Link href="/adoption" className="text-sm font-semibold text-emerald-700">Learn more →</Link>
          </Card>
          <Card className="space-y-2 p-5">
            <h3 className="font-semibold">Find adoptable pets</h3>
            <p className="text-sm text-zinc-600">Browse adoption listings in the marketplace.</p>
            <Link href="/marketplace?type=ADOPTION" className="text-sm font-semibold text-emerald-700">Browse →</Link>
          </Card>
          <Card className="space-y-2 p-5">
            <h3 className="font-semibold">In-store adoption centers</h3>
            <p className="text-sm text-zinc-600">Meet adoptable pets at a store near you.</p>
            <Link href="/stores" className="text-sm font-semibold text-emerald-700">Find store →</Link>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Essential services</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc) => (
            <Card key={svc.title} className="flex flex-col gap-3 p-5">
              <svc.icon className="h-6 w-6 text-emerald-600" />
              <h3 className="font-semibold">{svc.title}</h3>
              <p className="flex-1 text-sm text-zinc-600">{svc.body}</p>
              <Link href={svc.href} className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                Book now <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
