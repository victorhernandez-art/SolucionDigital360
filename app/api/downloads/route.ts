import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'downloads.json');

const INITIAL_COUNTS: Record<string, number> = {
  taller_demo_downloads: 526,
  gimnasio_downloads: 364
};

function getSystemKey(slugOrKey?: string | null): string {
  if (!slugOrKey) return 'taller_demo_downloads';
  if (slugOrKey.includes('gimnasio') || slugOrKey === 'gym') {
    return 'gimnasio_downloads';
  }
  return 'taller_demo_downloads';
}

function getAllCounts(): Record<string, number> {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      return {
        taller_demo_downloads: typeof data.taller_demo_downloads === 'number' ? data.taller_demo_downloads : INITIAL_COUNTS.taller_demo_downloads,
        gimnasio_downloads: typeof data.gimnasio_downloads === 'number' ? data.gimnasio_downloads : INITIAL_COUNTS.gimnasio_downloads
      };
    }
  } catch (error) {
    console.error('Error al leer downloads.json:', error);
  }
  return { ...INITIAL_COUNTS };
}

function saveCounts(counts: Record<string, number>): void {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(counts, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error al guardar downloads.json:', error);
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sistema = searchParams.get('sistema') || searchParams.get('slug');
  const key = getSystemKey(sistema);
  const counts = getAllCounts();
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
  const counts = getAllCounts();
  const current = (counts[key] ?? INITIAL_COUNTS[key] ?? 364) + 1;
  counts[key] = current;
  saveCounts(counts);

  return NextResponse.json({ count: current, sistema: key, success: true });
}

