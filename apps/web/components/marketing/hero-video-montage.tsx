const clips = [
  {
    label: "Dog play",
    src: "https://videos.pexels.com/video-files/9252757/9252757-hd_1080_1920_30fps.mp4",
  },
  {
    label: "Cat play",
    src: "https://videos.pexels.com/video-files/10436522/10436522-hd_1920_1080_30fps.mp4",
  },
  {
    label: "Bird perch",
    src: "https://videos.pexels.com/video-files/4793475/4793475-hd_1280_720_60fps.mp4",
  },
  {
    label: "Kitten play",
    src: "https://videos.pexels.com/video-files/855282/855282-hd_1280_720_25fps.mp4",
  },
];

export function HeroVideoMontage() {
  return (
    <div className="hero-montage relative aspect-4/3 overflow-hidden rounded-4xl bg-zinc-950 shadow-2xl shadow-emerald-950/30">
      {clips.map((clip, index) => (
        <video
          key={clip.src}
          aria-label={clip.label}
          className="hero-montage-clip absolute inset-0 h-full w-full object-cover"
          style={{ animationDelay: `${index * 8}s` }}
          src={clip.src}
          autoPlay
          muted
          loop
          playsInline
          preload={index === 0 ? "auto" : "metadata"}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgb(16_185_129/0.22),transparent_32%),linear-gradient(to_top,rgb(9_9_11/0.92),rgb(9_9_11/0.08)_58%,rgb(9_9_11/0.2))]" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between">
        <div className="flex gap-1.5">
          {clips.map((clip, index) => (
            <span key={clip.label} className="hero-montage-tick h-1.5 w-10 rounded-full bg-white/25" style={{ animationDelay: `${index * 8}s` }} />
          ))}
        </div>
        <span className="rounded-full bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
          32s montage
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Real pet moments</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Owners, pets, and safer handovers.</h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-200">
          A joined sequence of dogs, cats, birds, and playful companion moments for a warmer marketplace first impression.
        </p>
      </div>
    </div>
  );
}
