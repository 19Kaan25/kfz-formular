import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Wird per Vercel Cron alle 6 Tage aufgerufen (siehe vercel.json), damit
// das Supabase-Projekt nicht wegen Inaktivität pausiert wird (Free Tier
// pausiert nach 7 Tagen ohne API-Zugriff). Fragt bewusst nur die Anzahl
// ab, nicht die Daten selbst.
export async function GET() {
  const { error } = await supabase
    .from('anfragen')
    .select('id', { count: 'exact', head: true })

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() })
}
