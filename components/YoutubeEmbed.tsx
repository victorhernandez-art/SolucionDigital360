'use client';

import { ExternalLink, Play } from 'lucide-react';
import { useState } from 'react';

interface YoutubeEmbedProps {
  videoId?: string;
  title: string;
  channelUrl?: string;
}

export default function YoutubeEmbed({
  videoId,
  title,
  channelUrl = "https://www.youtube.com/@Soluci%C3%B3nDigital360"
}: YoutubeEmbedProps) {
  const [playing, setPlaying] = useState(false);

  if (!videoId) return null;

  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="space-y-3">
      {/* Reproductor con portada */}
      <div className="max-w-3xl mx-auto">
        <div
          className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black cursor-pointer group"
          style={{ paddingBottom: '56.25%' /* 16:9 */ }}
          onClick={() => !playing && setPlaying(true)}
        >
          {!playing ? (
            <>
              {/* Portada del video */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnail}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Botón de play centrado */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center shadow-2xl shadow-red-600/50 transition-all duration-200 group-hover:scale-110">
                  <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white text-white ml-1" />
                </div>
              </div>

            </>
          ) : (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&color=white&autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
      </div>

      {/* Enlace discreto al canal */}
      <div className="text-center">
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-red-600 text-xs font-medium transition-colors group"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span>Ver más videos en @SoluciónDigital360</span>
          <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>
    </div>
  );
}
