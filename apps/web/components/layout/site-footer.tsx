import Link from "next/link";
import { PawPrint } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--ui-border)] bg-[color-mix(in_srgb,var(--ui-surface-solid)_88%,transparent)] py-14 text-sm text-[var(--ui-muted)] backdrop-blur-sm">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--ui-primary)]/40 to-transparent"
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-5">
          <Link href="/" className="inline-flex items-center gap-2.5 font-semibold text-[var(--ui-ink)]">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--ui-primary)] to-[var(--ui-primary-bright)] text-white shadow-md shadow-[color-mix(in_srgb,var(--ui-primary)_30%,transparent)]">
              <PawPrint className="h-5 w-5" aria-hidden />
            </span>
            AdoptMe
          </Link>
          <p className="max-w-xs leading-relaxed">
            Shop, adopt, and book pet services across Nigeria — supplies, marketplace listings, welfare-first adoption, and expert care.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link className="ui-btn-primary inline-flex rounded-full px-4 py-2 text-xs font-semibold" href="/shop">
              Shop now
            </Link>
            <Link
              className="inline-flex rounded-full border border-[var(--ui-border-strong)] bg-[var(--ui-surface-solid)] px-4 py-2 text-xs font-semibold text-[var(--ui-ink)] transition hover:bg-[var(--ui-primary-soft)]"
              href="/rewards"
            >
              PawRewards
            </Link>
          </div>
        </div>
        <FooterCol
          title="Shop"
          links={[
            ["/shop/dog", "Dog"],
            ["/shop/cat", "Cat"],
            ["/shop/fish", "Fish"],
            ["/shop/bird", "Bird"],
            ["/shop/reptile", "Reptile"],
            ["/shop/small-pet", "Small Pet"],
          ]}
        />
        <FooterCol
          title="Services"
          links={[
            ["/services/grooming", "Grooming"],
            ["/services/training", "Training"],
            ["/services/doggie-day-camp", "Doggie Day Camp"],
            ["/services/veterinary-care", "Veterinary Care"],
            ["/stores", "Find a store"],
          ]}
        />
        <FooterCol
          title="Marketplace"
          links={[
            ["/marketplace?type=SALE", "Buy / sell"],
            ["/marketplace?type=ADOPTION", "Adoption"],
            ["/marketplace?type=EXCHANGE", "Exchange"],
            ["/new-pet", "New pet parent"],
            ["/learn", "Learning center"],
          ]}
        />
        <FooterCol
          title="Help & rewards"
          links={[
            ["/support", "Help center"],
            ["/rewards", "PawRewards program"],
            ["/donations", "Donate"],
            ["/adoption", "Adoption"],
            ["/dashboard", "Dashboard"],
          ]}
        />
      </div>
      <p className="mx-auto mt-10 max-w-7xl px-4 text-xs text-[color-mix(in_srgb,var(--ui-muted)_85%,transparent)] sm:px-6 lg:px-8">
        All prices in Nigerian Naira (₦). Animal welfare, breeding, adoption, and transfer rules vary by region.
      </p>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="ui-micro text-[var(--ui-ink)]">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map(([href, label]) => (
          <li key={href}>
            <Link className="transition hover:text-[var(--ui-primary)]" href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
