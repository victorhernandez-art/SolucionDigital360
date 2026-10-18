'use client';

import { ExternalLink, Play, Tv, Sparkles } from 'lucide-react';
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

  // Si no hay videoId configurado, mostrar invitación oficial destacada al canal de YouTube
  if (!videoId) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-red-950/40 border border-slate-800 p-8 sm:p-10 text-center shadow-xl space-y-6">
          {/* Acentos de luz sutiles */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wide">
            <Tv className="w-3.5 h-3.5" />
            <span>Video Tutorial Oficial en Producción</span>
          </div>

          {/* Título y Explicación */}
          <div className="space-y-2.5 max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Demostraciones y Tutoriales en Video
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Estamos preparando la guía paso a paso y demostración técnica oficial en video. En lo que subimos el video tutorial, te invitamos a visitar nuestro canal oficial en YouTube para conocer demostraciones y novedades de nuestros sistemas.
            </p>
          </div>

          {/* Botón CTA Destacado al Canal Oficial */}
          <div className="pt-2">
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-red-600/30 transition-all hover:scale-105 group"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>Visitar Canal Oficial de YouTube</span>
              <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    );
  }

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
