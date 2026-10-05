import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('downloads')
        .select('id')
        .limit(1);

      if (error) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      }
      return NextResponse.json({
        ok: true,
        message: 'Supabase ping exitoso (Keep-Alive activo)',
        timestamp: new Date().toISOString(),
        data
      });
    }
    return NextResponse.json({ ok: false, message: 'Supabase no configurado' });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
    return NextResponse.json({ ok: false, error: errorMsg }, { status: 500 });
  }
}