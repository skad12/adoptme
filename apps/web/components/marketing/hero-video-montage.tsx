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
  {
    label: "Puppy run",
    src: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
  },
];

export function HeroVideoMontage() {
  return (
    <div className="hero-montage absolute inset-0 overflow-hidden bg-zinc-950">
      {clips.map((clip, index) => (
        <video
          key={clip.src}
          aria-label={clip.label}
          className="hero-montage-clip absolute inset-0 h-full w-full object-cover"
          style={{ animationDelay: `${index * 8}s`, animationDuration: `${clips.length * 8}s` }}
          src={clip.src}
          autoPlay
          muted
          loop
          playsInline
          preload={index === 0 ? "auto" : "metadata"}
        />
      ))}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_70%_30%,rgb(255_209_0_/_0.12),transparent_42%)]"
      />
    </div>
  );
}
