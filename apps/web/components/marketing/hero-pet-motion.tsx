"use client";

import { Bone, Cat, Dog, PawPrint, Rabbit } from "lucide-react";

const motifs = [
  { Icon: PawPrint, className: "left-[8%] top-[18%] size-8 text-white/25", delay: "0s", duration: "6.5s" },
  { Icon: Dog, className: "right-[12%] top-[22%] size-9 text-amber-200/30", delay: "1.2s", duration: "7.2s" },
  { Icon: Cat, className: "left-[18%] bottom-[24%] size-8 text-rose-200/30", delay: "0.6s", duration: "5.8s" },
  { Icon: Bone, className: "right-[22%] bottom-[28%] size-7 text-yellow-200/25", delay: "2s", duration: "6.8s" },
  { Icon: Rabbit, className: "left-[42%] top-[12%] size-7 text-emerald-100/25", delay: "1.6s", duration: "8s" },
  { Icon: PawPrint, className: "right-[6%] top-[48%] size-6 text-white/20", delay: "0.3s", duration: "5.4s" },
  { Icon: PawPrint, className: "left-[6%] top-[55%] size-10 text-white/15", delay: "2.4s", duration: "7.6s" },
];

/** Soft pet motifs that float over the hero video — decorative only. */
export function HeroPetMotion() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden>
      {motifs.map(({ Icon, className, delay, duration }, i) => (
        <span
          key={`${className}-${i}`}
          className={`hero-paw absolute ${className}`}
          style={{ animationDelay: delay, animationDuration: duration }}
        >
          <Icon className="h-full w-full" strokeWidth={1.5} />
        </span>
      ))}
      <span className="hero-paw-trail absolute left-[10%] top-[70%] h-3 w-3 rounded-full bg-[var(--ui-accent)]/40" style={{ animationDelay: "0.4s" }} />
      <span className="hero-paw-trail absolute left-[18%] top-[74%] h-2.5 w-2.5 rounded-full bg-white/30" style={{ animationDelay: "0.9s" }} />
      <span className="hero-paw-trail absolute left-[25%] top-[77%] h-2 w-2 rounded-full bg-[var(--ui-accent)]/50" style={{ animationDelay: "1.4s" }} />
    </div>
  );
}
