import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 py-12 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div className="space-y-4">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">AdoptMe</p>
          <p className="mt-2 max-w-xs leading-relaxed">
            A responsible pet marketplace for verified-style listings, welfare-first adoption workflows, escrow-aware checkout, and safer exchanges.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700" href="/sell">
              List a pet
            </Link>
            <Link className="rounded-full border border-zinc-300 px-4 py-2 text-xs font-semibold text-zinc-800 hover:bg-white dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900" href="/login">
              Login
            </Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">Platform</p>
          <ul className="mt-2 space-y-2">
            <li>
              <Link className="hover:text-emerald-700 dark:hover:text-emerald-400" href="/marketplace">
                Marketplace
              </Link>
            </li>
            <li>
              <Link className="hover:text-emerald-700 dark:hover:text-emerald-400" href="/sell">
                Sell or exchange
              </Link>
            </li>
            <li>
              <Link className="hover:text-emerald-700 dark:hover:text-emerald-400" href="/adoption">
                Adoption center
              </Link>
            </li>
            <li>
              <Link className="hover:text-emerald-700 dark:hover:text-emerald-400" href="/donations">
                Donate
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">Categories</p>
          <ul className="mt-2 space-y-2">
            <li>
              <Link className="hover:text-emerald-700 dark:hover:text-emerald-400" href="/marketplace?type=SALE">
                Buy / sell
              </Link>
            </li>
            <li>
              <Link className="hover:text-emerald-700 dark:hover:text-emerald-400" href="/marketplace?type=EXCHANGE">
                Exchange
              </Link>
            </li>
            <li>
              <Link className="hover:text-emerald-700 dark:hover:text-emerald-400" href="/marketplace?type=ADOPTION">
                Adoption
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">Trust &amp; safety</p>
          <ul className="mt-2 space-y-2">
            <li>
              <Link className="hover:text-emerald-700 dark:hover:text-emerald-400" href="/support">
                Help center
              </Link>
            </li>
            <li>
              <Link className="hover:text-emerald-700 dark:hover:text-emerald-400" href="/admin">
                Admin console
              </Link>
            </li>
            <li>Health records and microchip details</li>
            <li>Seller attestation and moderation-ready intake</li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl px-4 text-xs text-zinc-500 sm:px-6">
        Escrow, compliance, and animal welfare rules vary by region. AdoptMe starter code is a foundation — engage legal counsel before launch.
      </p>
    </footer>
  );
}
