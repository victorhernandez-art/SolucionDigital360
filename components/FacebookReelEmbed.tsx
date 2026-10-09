'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, ExternalLink, Sparkles, CheckCircle2, Film } from 'lucide-react';

interface FacebookReelEmbedProps {
  videoUrl?: string;
  title?: string;
  coverImage?: string;
}

export default function FacebookReelEmbed({
  videoUrl = 'https://www.facebook.com/reel/2226372958286827',
  title = 'Demostración en Video: Descarga música y videos con YT Downloader',
  coverImage = '/yt-downloader-reel-cover.jpg',
}: FacebookReelEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // URL del plugin de Facebook oficial para incrustar el video/reel
  const encodedUrl = encodeURIComponent(videoUrl);
  const embedSrc = `https://www.facebook.com/plugins/video.php?height=580&href=${encodedUrl}&show_text=false&width=326&t=0`;

  return (
    <section
      aria-labelledby="video-demostracion-titulo"
      className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden relative"
    >
      {/* Resplandor decorativo de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Columna de Texto y Detalles (7 columnas en escritorio) */}
        <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <Film className="w-3.5 h-3.5 text-rose-400" />
            <span>Video Demostración Oficial · Reel en Vivo</span>
          </div>

          <div className="space-y-2">
            <h2
              id="video-demostracion-titulo"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight"
            >
              Mira la Herramienta en Acción Real
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Aprende en menos de 1 minuto cómo descargar canciones de YouTube de manera simultánea sin publicidad, eligiendo la mejor calidad de audio o video.
            </p>
          </div>

          {/* Puntos destacados del video */}
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 max-w-lg mx-auto lg:mx-0 text-left">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Demostración de extracción simultánea de <strong>3 canciones a la vez</strong>.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Elección rápida de formato entre <strong>Audio MP3</strong> y <strong>Video MP4</strong>.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Comprobación de descarga limpia <strong>sin ventanas publicitarias ni virus</strong>.</span>
            </li>
          </ul>

          {/* Botones de Acción */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-bold text-sm transition-all shadow-lg shadow-rose-600/30 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isPlaying ? 'Reiniciar Video' : 'Ver Video Aquí'}</span>
            </button>

            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/25"
            >
              {/* Icono de Facebook */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Abrir en Facebook</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-75" />
            </a>
          </div>
        </div>

        {/* Columna del Reproductor de Video en Marco Móvil / Reel (5 columnas en escritorio) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-black group">
            {!isPlaying ? (
              <div
                onClick={() => setIsPlaying(true)}
                className="relative w-full h-full cursor-pointer overflow-hidden"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setIsPlaying(true);
                  }
                }}
                aria-label="Reproducir video demostración"
              >
                {/* Portada del video */}
                <Image
                  src={coverImage}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />

                {/* Sombra / Degradado */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Botón Central de Play */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-2xl shadow-rose-600/50 group-hover:scale-110 group-hover:bg-rose-500 transition-all duration-300">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                </div>

                {/* Etiqueta inferior */}
                <div className="absolute bottom-4 left-4 right-4 text-center space-y-1">
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-black/70 text-rose-300 backdrop-blur-sm border border-rose-500/30">
                    ▶ Haz clic para reproducir
                  </span>
                  <p className="text-[11px] text-slate-300 font-medium line-clamp-2">
                    Demostración oficial de YT Downloader en Facebook
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full bg-black">
                <iframe
                  src={embedSrc}
                  className="w-full h-full border-0"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  title={title}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
