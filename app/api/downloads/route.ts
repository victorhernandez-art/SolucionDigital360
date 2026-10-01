import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const DATA_FILE = path.join(process.cwd(), 'data', 'downloads.json');

const INITIAL_COUNTS: Record<string, number> = {
  taller_demo_downloads: 531,
  gimnasio_downloads: 364,
  nitro_pdf_downloads: 142,
  office_2019_downloads: 215
};

function getSystemKey(slugOrKey?: string | null): string {
  if (!slugOrKey) return 'taller_demo_downloads';
  const clean = slugOrKey.toLowerCase();
  if (clean.includes('office') || clean.includes('2019')) {
    return 'office_2019_downloads';
  }
  if (clean.includes('nitro') || clean.includes('pdf')) {
    return 'nitro_pdf_downloads';
  }
  if (clean.includes('gimnasio') || clean.includes('gym')) {
    return 'gimnasio_downloads';
  }
  return 'taller_demo_downloads';
}

function getLocalCounts(): Record<string, number> {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      return {
        taller_demo_downloads: typeof data.taller_demo_downloads === 'number' ? data.taller_demo_downloads : INITIAL_COUNTS.taller_demo_downloads,
        gimnasio_downloads: typeof data.gimnasio_downloads === 'number' ? data.gimnasio_downloads : INITIAL_COUNTS.gimnasio_downloads,
        nitro_pdf_downloads: typeof data.nitro_pdf_downloads === 'number' ? data.nitro_pdf_downloads : INITIAL_COUNTS.nitro_pdf_downloads,
        office_2019_downloads: typeof data.office_2019_downloads === 'number' ? data.office_2019_downloads : INITIAL_COUNTS.office_2019_downloads
      };
    }
  } catch (error) {
    console.error('Error al leer downloads.json:', error);
  }
  return { ...INITIAL_COUNTS };
}

function saveLocalCounts(counts: Record<string, number>): void {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(counts, null, 2), 'utf-8');
  } catch {
    // En Vercel Serverless el sistema de archivos es read-only; no debe romper la ejecución
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sistema = searchParams.get('sistema') || searchParams.get('slug');
  const key = getSystemKey(sistema);

  // 1. Si Supabase está conectado, consultar base de datos real
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('downloads')
        .select('count')
        .eq('id', key)
        .maybeSingle();

      if (!error && data && typeof data.count === 'number') {
        return NextResponse.json({ count: data.count, sistema: key });
      }

      // Si aún no existe el registro en Supabase, inicializarlo
      if (!error && !data) {
        const initVal = INITIAL_COUNTS[key] ?? 364;
        await supabase
          .from('downloads')
          .insert({ id: key, count: initVal });
        return NextResponse.json({ count: initVal, sistema: key });
      }
    } catch (err) {
      console.error('Error consultando Supabase en GET /api/downloads:', err);
    }
  }

  // 2. Fallback a conteo local
  const counts = getLocalCounts();
  const count = counts[key] ?? INITIAL_COUNTS[key] ?? 364;
  return NextResponse.json({ count, sistema: key });
}

export async function POST(request: NextRequest) {
  let sistema: string | null = null;
  try {
    const body = await request.json().catch(() => ({}));
    sistema = body.sistema || body.slug || null;
  } catch {
    // Si no viene body JSON
  }

  if (!sistema) {
    const { searchParams } = new URL(request.url);
    sistema = searchParams.get('sistema') || searchParams.get('slug');
  }

  const key = getSystemKey(sistema);

  // 1. Si Supabase está conectado, incrementar de manera persistente
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('downloads')
        .select('count')
        .eq('id', key)
        .maybeSingle();

      if (!error) {
        const currentCount = (data && typeof data.count === 'number')
          ? data.count
          : (INITIAL_COUNTS[key] ?? 364);

        const nextCount = currentCount + 1;

        const { error: upsertError } = await supabase
          .from('downloads')
          .upsert({ id: key, count: nextCount, updated_at: new Date().toISOString() });

        if (!upsertError) {
          return NextResponse.json({ count: nextCount, sistema: key, success: true });
        }
      }
    } catch (err) {
      console.error('Error actualizando Supabase en POST /api/downloads:', err);
    }
  }

  // 2. Fallback local / en memoria
  const counts = getLocalCounts();
  const current = (counts[key] ?? INITIAL_COUNTS[key] ?? 364) + 1;
  counts[key] = current;
  saveLocalCounts(counts);

  return NextResponse.json({ count: current, sistema: key, success: true });
}
