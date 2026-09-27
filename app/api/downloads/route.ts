import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'downloads.json');
const INITIAL_COUNT = 526;

function getCount(): number {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      if (typeof data.taller_demo_downloads === 'number') {
        return data.taller_demo_downloads;
      }
    }
  } catch (error) {
    console.error('Error al leer downloads.json:', error);
  }
  return INITIAL_COUNT;
}

function saveCount(count: number): void {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify({ taller_demo_downloads: count }, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error al guardar downloads.json:', error);
  }
}

export async function GET() {
  const count = getCount();
  return NextResponse.json({ count });
}

export async function POST() {
  let current = getCount();
  current += 1;
  saveCount(current);
  return NextResponse.json({ count: current, success: true });
}
