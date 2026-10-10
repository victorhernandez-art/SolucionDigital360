'use client';

import Image from 'next/image';
import { Play, ExternalLink, CheckCircle2, Film } from 'lucide-react';

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
  const handleOpenVideo = () => {
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      aria-labelledby="video-demostracion-titulo"
      className="bg-slate-100/90 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm overflow-hidden relative"
    >
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Columna de Texto y Detalles (7 columnas en escritorio) */}
        <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            <Film className="w-3.5 h-3.5 text-rose-600" />
            <span>Video Demostración Oficial · Reel en Facebook</span>
          </div>

          <div className="space-y-2">
            <h2
              id="video-demostracion-titulo"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
            >
              Mira la Herramienta en Acción Real
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Aprende en menos de 1 minuto cómo descargar canciones de YouTube de manera simultánea sin publicidad, eligiendo la mejor calidad de audio o video.
            </p>
          </div>

          {/* Puntos destacados del video */}
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 max-w-lg mx-auto lg:mx-0 text-left">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Demostración de extracción simultánea de <strong>3 canciones a la vez</strong>.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Elección rápida de formato entre <strong>Audio MP3</strong> y <strong>Video MP4</strong>.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Comprobación de descarga limpia <strong>sin ventanas publicitarias ni virus</strong>.</span>
            </li>
          </ul>

          {/* Botones de Acción */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-sm transition-all shadow-md shadow-rose-600/20 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Reproducir Video en Facebook</span>
            </a>

            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20"
            >
              {/* Icono de Facebook */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Abrir Reel Oficial</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-75" />
            </a>
          </div>

          <p className="text-[11px] text-slate-500 leading-tight">
            * Para garantizar la reproducción sin restricciones de copyright musical, el video se abre de forma oficial directamente en Facebook.
          </p>
        </div>

        {/* Columna del Reproductor / Portada en Marco Móvil (5 columnas en escritorio) */}
        <div className="lg:col-span-5 flex justify-center">
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative w-full max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden border-2 border-slate-300 shadow-xl bg-slate-900 group cursor-pointer"
            aria-label="Abrir video de demostración en Facebook"
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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

            {/* Botón Central de Play */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-2xl shadow-rose-600/50 group-hover:scale-110 group-hover:bg-rose-500 transition-all duration-300">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
            </div>

            {/* Etiqueta inferior */}
            <div className="absolute bottom-4 left-4 right-4 text-center space-y-1">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-black/70 text-rose-300 backdrop-blur-sm border border-rose-500/30">
                ▶ Haz clic para ver en Facebook
              </span>
              <p className="text-[11px] text-slate-200 font-medium line-clamp-2">
                Demostración oficial de YT Downloader en Facebook
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
