'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Download,
  MessageSquare,
  ShieldCheck,
  Laptop,
  Check,
  AlertTriangle,
  CheckCircle2,
  Youtube,
  ArrowRight,
  X,
  Sparkles,
  Lock,
  Loader2,
} from 'lucide-react';

interface OfficeDualDownloadBoxProps {
  downloadUrl2016: string;
  downloadUrl2013: string;
}

type OfficeVersion = '2016' | '2013';

export default function OfficeDualDownloadBox({
  downloadUrl2016,
  downloadUrl2013,
}: OfficeDualDownloadBoxProps) {
  const baseCount2016 = 185;
  const baseCount2013 = 150;
  const storageKey2016 = 'sd360_downloads_office_2016';
  const storageKey2013 = 'sd360_downloads_office_2013';

  const [count2016, setCount2016] = useState<number>(baseCount2016);
  const [count2013, setCount2013] = useState<number>(baseCount2013);
  const [selectedVersion, setSelectedVersion] = useState<OfficeVersion>('2016');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Estados de Desbloqueo (Sub2Unlock)
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(10);

  // Cerrar modal con tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Contador regresivo de 10 segundos
  useEffect(() => {
    if (!isCounting) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsCounting(false);
          setIsUnlocked(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isCounting]);

  // Sincronizar contadores de ambas versiones
  useEffect(() => {
    let localVal2016 = baseCount2016;
    let localVal2013 = baseCount2013;
    try {
      const s16 = localStorage.getItem(storageKey2016);
      if (s16) {
        const p16 = parseInt(s16, 10);
        if (!isNaN(p16) && p16 >= baseCount2016) {
          localVal2016 = p16;
          setCount2016(p16);
        }
      }
      const s13 = localStorage.getItem(storageKey2013);
      if (s13) {
        const p13 = parseInt(s13, 10);
        if (!isNaN(p13) && p13 >= baseCount2013) {
          localVal2013 = p13;
          setCount2013(p13);
        }
      }
    } catch {}

    // Fetch Office 2016
    fetch('/api/downloads?sistema=office-2016')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === 'number') {
          const highest = Math.max(data.count, localVal2016);
          setCount2016(highest);
          try {
            localStorage.setItem(storageKey2016, highest.toString());
          } catch {}
        }
      })
      .catch((err) => console.error('Error al sincronizar descargas de Office 2016:', err));

    // Fetch Office 2013
    fetch('/api/downloads?sistema=office-2013')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === 'number') {
          const highest = Math.max(data.count, localVal2013);
          setCount2013(highest);
          try {
            localStorage.setItem(storageKey2013, highest.toString());
          } catch {}
        }
      })
      .catch((err) => console.error('Error al sincronizar descargas de Office 2013:', err));
  }, [baseCount2016, baseCount2013, storageKey2016, storageKey2013]);

  // Abrir Modal para la versión seleccionada
  const handleOpenModal = (version: OfficeVersion) => {
    setSelectedVersion(version);
    setIsUnlocked(false);
    setIsCounting(false);
    setCountdown(10);
    setIsModalOpen(true);
  };

  // Clic en Suscripción
  const handleSubscribeClick = () => {
    window.open(
      'https://www.youtube.com/@SolucionDigital360?sub_confirmation=1',
      '_blank',
      'noopener,noreferrer'
    );

    if (!isUnlocked && !isCounting) {
      setCountdown(10);
      setIsCounting(true);
    }
  };

  // Ejecutar Descarga de la versión elegida
  const handleExecuteDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    const activeUrl = selectedVersion === '2016' ? downloadUrl2016 : downloadUrl2013;
    const is16 = selectedVersion === '2016';
    const currentCount = is16 ? count2016 : count2013;
    const nextCount = currentCount + 1;
    const activeStorageKey = is16 ? storageKey2016 : storageKey2013;
    const slugParam = is16 ? 'office-2016' : 'office-2013';

    // 1. Abrir descarga
    window.open(activeUrl, '_blank');

    // 2. Incrementar estado y localStorage
    if (is16) {
      setCount2016(nextCount);
    } else {
      setCount2013(nextCount);
    }
    try {
      localStorage.setItem(activeStorageKey, nextCount.toString());
    } catch {}

    // 3. Registrar en backend
    try {
      const res = await fetch('/api/downloads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sistema: slugParam }),
      });
      const data = await res.json();
      if (data && typeof data.count === 'number') {
        const finalCount = Math.max(data.count, nextCount);
        if (is16) {
          setCount2016(finalCount);
        } else {
          setCount2013(finalCount);
        }
        try {
          localStorage.setItem(activeStorageKey, finalCount.toString());
        } catch {}
      }
    } catch (err) {
      console.error('Error al registrar descarga en servidor:', err);
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tarjeta Principal de Descarga con 2 Botones */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        <div className="space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Descarga Directa Gratuita · Elige tu Versión</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Descarga Microsoft Office 2016 o 2013 Profesional
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Ambas suites cuentan con el mismo procedimiento de instalación guiado. Selecciona la versión que mejor se adapte a tu computadora:
          </p>
        </div>

        {/* Cuadrícula de 2 Opciones de Descarga */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Opción 1: Office 2016 */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-white border-2 border-indigo-200/90 shadow-sm flex flex-col justify-between space-y-5 hover:border-indigo-300 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                  Recomendado para Win 10 / 11
                </span>
                {/* Contador de Descargas 2016 */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-mono font-bold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-emerald-400">+{count2016}</span>
                  <span className="text-[10px] text-slate-400 font-sans">descargas</span>
                </div>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900">
                Microsoft Office 2016 Profesional
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Suite completa y moderna con Word, Excel, PowerPoint, Outlook y Access. Máxima compatibilidad con formatos recientes y alto rendimiento.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenModal('2016')}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/25 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Office 2016 (.RAR)</span>
            </button>
          </div>

          {/* Opción 2: Office 2013 */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/60 to-white border-2 border-amber-200/90 shadow-sm flex flex-col justify-between space-y-5 hover:border-amber-300 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  Ultra Ligero · PC Estándar
                </span>
                {/* Contador de Descargas 2013 */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-mono font-bold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-emerald-400">+{count2013}</span>
                  <span className="text-[10px] text-slate-400 font-sans">descargas</span>
                </div>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900">
                Microsoft Office 2013 Profesional
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Versión ligera y veloz con mínimo consumo de memoria RAM y procesador. Ideal para laptops básicas o equipos con recursos estándar.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenModal('2013')}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-bold text-sm transition-all shadow-lg shadow-amber-600/25 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Office 2013 (.RAR)</span>
            </button>
          </div>
        </div>

        {/* Botón de Asistencia WhatsApp */}
        <div className="text-center pt-2">
          <a
            href="https://wa.me/529611209361?text=Hola,%20tengo%20una%20duda%20sobre%20la%20instalaci%C3%B3n%20de%20Office%202016%20o%202013"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>¿Dudas con la instalación? Pedir Asistencia por WhatsApp</span>
          </a>
        </div>

        {/* Garantías y Requisitos */}
        <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Paquetes verificados y seguros</span>
          </div>
          <div className="flex items-center gap-2">
            <Laptop className="w-4 h-4 text-blue-500 shrink-0" />
            <span>Compatibles con Windows 7, 8, 10 y 11</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Orientado a licencias originales</span>
          </div>
        </div>
      </section>

      {/* Tarjeta de Descargo de Responsabilidad Oficial */}
      <section
        aria-label="Descargo de responsabilidad"
        className="relative bg-amber-50/50 border border-amber-300/80 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-sm overflow-hidden"
      >
        <div className="flex items-start gap-4">
          <div className="p-2 sm:p-2.5 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div className="space-y-3">
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-wide uppercase">
              Descargo de Responsabilidad
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              El software y herramientas listados en <strong>Solución Digital 360</strong> se publican con fines
              estrictamente informativos, educativos y de prueba. Recomendamos respetar las licencias de sus
              desarrolladores y adquirir una licencia oficial cuando corresponda.{' '}
              <strong>Solución Digital 360</strong> no es el desarrollador ni el propietario de los programas enlazados.
            </p>
            <div className="pt-2 border-t border-amber-200/80 text-amber-900 font-semibold text-xs sm:text-sm flex items-start gap-2">
              <span className="text-base shrink-0">📌</span>
              <span>
                <strong>Importante:</strong> este contenido está orientado al uso de licencias legítimas. No se
                proporcionan métodos para evadir o vulnerar la activación de Microsoft Office.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL DE DESBLOQUEO POR SUSCRIPCIÓN (SUB2UNLOCK) Y VENTA CRUZADA          */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-titulo"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Contenedor del Modal Compacto */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200 max-h-[88vh] overflow-y-auto space-y-3.5 animate-in zoom-in-95 duration-200 my-auto"
          >
            {/* Botón de Cierre (X) */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Encabezado Dinámico según Estado de Desbloqueo */}
            <div className="text-center space-y-1.5">
              <div
                className={`w-11 h-11 mx-auto rounded-xl flex items-center justify-center shadow-inner transition-colors ${
                  isUnlocked
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-amber-100 text-amber-600'
                }`}
              >
                {isUnlocked ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Lock className="w-5 h-5" />
                )}
              </div>
              <h3
                id="modal-titulo"
                className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight"
              >
                {isUnlocked
                  ? `¡Enlace de Office ${selectedVersion} desbloqueado!`
                  : `¡Descargando Office ${selectedVersion}!`}
              </h3>
            </div>

            {/* Subtexto Informativo */}
            <p className="text-center text-slate-600 text-xs sm:text-[13px] leading-snug px-1">
              {isUnlocked
                ? `Gracias por apoyar nuestro canal de YouTube. Ya puedes descargar el instalador oficial de Office ${selectedVersion}.`
                : 'Para mantener estas herramientas gratuitas, suscríbete a nuestro canal de YouTube para desbloquear tu enlace de descarga.'}
            </p>

            {/* Llamado de Suscripción: Meta Office 2021 */}
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-50/60 via-amber-50/40 to-indigo-50/60 border border-indigo-200/80 text-center space-y-1 shadow-sm">
              <div className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-indigo-700">
                <span className="text-sm">🚀</span>
                <span>¡Ayúdanos a llegar a la meta!</span>
              </div>
              <p className="text-xs font-medium text-slate-800 leading-snug">
                Suscríbete y comparte para que estés enterado de los programas que estaré publicando. Si este canal sube a más suscriptores estaré subiendo{' '}
                <strong className="text-indigo-600 font-extrabold">Office 2021 totalmente gratis Licencia original</strong>.
              </p>
            </div>

            {/* =================================================================== */}
            {/* FLUJO SUB2UNLOCK EN 2 PASOS                                         */}
            {/* =================================================================== */}
            <div className="space-y-2">
              {/* PASO 1: Botón de Suscripción en YouTube */}
              {!isUnlocked ? (
                <button
                  type="button"
                  onClick={handleSubscribeClick}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-[#FF0000] hover:bg-[#D90000] active:scale-[0.98] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-red-500/25 group cursor-pointer"
                >
                  <Youtube className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 shrink-0" />
                  <span>1. Suscribirme en YouTube para desbloquear</span>
                </button>
              ) : (
                <div className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Paso 1: Suscripción confirmada</span>
                  </span>
                  <a
                    href="https://www.youtube.com/@SolucionDigital360?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-red-600 hover:underline font-bold inline-flex items-center gap-1"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    <span>Canal oficial</span>
                  </a>
                </div>
              )}

              {/* PASO 2: Botón de Descarga Bloqueado / Verificando / Desbloqueado */}
              {!isUnlocked ? (
                isCounting ? (
                  <button
                    type="button"
                    disabled
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-800 font-bold text-xs sm:text-sm cursor-wait transition-all shadow-sm animate-pulse"
                  >
                    <Loader2 className="w-4 h-4 animate-spin text-amber-600 shrink-0" />
                    <span>Verificando suscripción... ({countdown}s)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 font-bold text-xs sm:text-sm cursor-not-allowed transition-all"
                  >
                    <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>2. Descargar Office {selectedVersion} (Bloqueado)</span>
                  </button>
                )
              ) : (
                <button
                  type="button"
                  onClick={handleExecuteDownload}
                  disabled={isDownloading}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-500/30 cursor-pointer animate-in zoom-in-95 duration-200"
                >
                  <Download className={`w-4 h-4 sm:w-5 sm:h-5 ${isDownloading ? 'animate-bounce' : ''} shrink-0`} />
                  <span>
                    {isDownloading
                      ? 'Iniciando descarga...'
                      : `✅ ¡Enlace desbloqueado! Descargar Office ${selectedVersion}`}
                  </span>
                </button>
              )}
            </div>

            {/* Separador sutil */}
            <div className="h-px w-full bg-slate-200/80" />

            {/* Banner de Venta Cruzada Compacto */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-xl p-4 border border-slate-700/60 shadow-md space-y-2.5">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Soluciones Empresariales</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                  ¿Necesitas optimizar tu negocio?
                </h4>
                <p className="text-slate-300 text-xs leading-snug">
                  Conoce nuestros sistemas administrativos y desarrollo de software a medida.
                </p>
              </div>

              <Link
                href="/#sistemas"
                onClick={() => setIsModalOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/30 group cursor-pointer"
              >
                <span>Ver soluciones para mi negocio</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Opción de Cierre en texto inferior */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-700 font-medium underline underline-offset-4 transition-colors cursor-pointer"
              >
                Cerrar ventana
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

