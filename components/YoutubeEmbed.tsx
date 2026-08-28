interface YoutubeEmbedProps {
  videoId: string;
  title: string;
}

export default function YoutubeEmbed({ videoId, title }: YoutubeEmbedProps) {
  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
        title={title}
        className="absolute top-0 left-0 w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
