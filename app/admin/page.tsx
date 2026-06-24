'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

// ─── Typen ────────────────────────────────────────────────────────────────────

interface Anfrage {
  id: string
  eingegangen_am: string
  status: 'neu' | 'erledigt'
  email: string | null
  vorname: string | null
  nachname: string | null
  strasse: string | null
  plz: string | null
  ort: string | null
  geburtsdatum_vn: string | null
  hsn: string | null
  tsn: string | null
  fahrzeug_kategorie: string | null
  hersteller: string | null
  datum_erstzulassung: string | null
  datum_erwerb: string | null
  neuwert: string | null
  jaehrliche_fahrleistung: string | null
  fahrzeug_status: string | null
  name_fahrzeughalter: string | null
  plz_fahrzeughalter: string | null
  abstellort: string | null
  abstellort_abschliessbar: string | null
  nutzerkreis: string | null
  saison_start: string | null
  saison_ende: string | null
  sf_klasse_haftpflicht: string | null
  vorvertrag: string | null
  sf_klasse_vollkasko: string | null
  gemeldete_schaeden: string | null
  bei_welchem_versicherer: string | null
  wie_lange_bei_versicherer: string | null
  finanzierung: string | null
  mehrwert: string | null
  deckung_haftpflicht: string | null
  zahlungsart: string | null
  zahlungsweise: string | null
  beitrag_vollkasko: string | null
  beitrag_teilkasko: string | null
  beitrag_haftpflicht: string | null
}

// ─── NAFI-Zusammenfassung ─────────────────────────────────────────────────────

function fmtDate(iso: string | null): string {
  if (!iso) return '–'
  // Already in DD.MM.YYYY?
  if (iso.includes('.')) return iso
  const [y, m, d] = iso.split('-')
  return d && m && y ? `${d}.${m}.${y}` : iso
}

function row(label: string, value: string | null) {
  return `${label}\n  ${value || '–'}`
}

function buildNafiText(a: Anfrage): string {
  const statusMap: Record<string, string> = {
    neu: 'Neues Fahrzeug', wechsel: 'Versichererwechsel', anderer: 'Anderer Halter'
  }
  const vorvertragMap: Record<string, string> = {
    vorversicherer: 'VN = Vorversicherer', vn_gekuendigt: 'VN hat gekündigt'
  }
  const fahrleistungLabel = a.jaehrliche_fahrleistung === 'unbegrenzt'
    ? 'Unbegrenzt'
    : a.jaehrliche_fahrleistung ? `${a.jaehrliche_fahrleistung} km` : null

  const today = new Date().toLocaleDateString('de-DE')

  return [
    `KFZ-ANFRAGE  ·  Datum: ${today}`,
    '',
    '═══════════════════════════════════════════',
    '1. PERSONENBEZOGENE DATEN',
    '───────────────────────────────────────────',
    row('E-Mail', a.email),
    row('Vorname', a.vorname),
    row('Nachname', a.nachname),
    row('Straße', a.strasse),
    row('PLZ', a.plz),
    row('Ort', a.ort),
    row('Geburtsdatum (VN)', fmtDate(a.geburtsdatum_vn)),
    '',
    '═══════════════════════════════════════════',
    '2. FAHRZEUGDATEN',
    '───────────────────────────────────────────',
    row('HSN', a.hsn),
    row('TSN', a.tsn),
    row('Fahrzeugkategorie', a.fahrzeug_kategorie),
    row('Hersteller', a.hersteller),
    row('Erstzulassung', fmtDate(a.datum_erstzulassung)),
    row('Datum Erwerb', fmtDate(a.datum_erwerb)),
    row('Neuwert', a.neuwert ? `${a.neuwert} €` : null),
    row('Jährl. Fahrleistung', fahrleistungLabel),
    '',
    '═══════════════════════════════════════════',
    '3. FAHRZEUGSTATUS',
    '───────────────────────────────────────────',
    row('Status', a.fahrzeug_status ? (statusMap[a.fahrzeug_status] ?? a.fahrzeug_status) : null),
    ...(a.fahrzeug_status === 'anderer' ? [
      row('Name Fahrzeughalter', a.name_fahrzeughalter),
      row('PLZ Fahrzeughalter', a.plz_fahrzeughalter),
    ] : []),
    '',
    '═══════════════════════════════════════════',
    '4. ABSTELLORT',
    '───────────────────────────────────────────',
    row('Abstellort', a.abstellort),
    row('Abschließbar', a.abstellort_abschliessbar === 'ja' ? 'Ja' : a.abstellort_abschliessbar === 'nein' ? 'Nein' : null),
    '',
    '═══════════════════════════════════════════',
    '5. NUTZUNG',
    '───────────────────────────────────────────',
    row('Nutzerkreis', a.nutzerkreis),
    row('Saison von', fmtDate(a.saison_start)),
    row('Saison bis', fmtDate(a.saison_ende)),
    '',
    '═══════════════════════════════════════════',
    '6. VERSICHERUNGSDATEN',
    '───────────────────────────────────────────',
    row('SF-Klasse Haftpflicht', a.sf_klasse_haftpflicht),
    row('Vorvertrag', a.vorvertrag ? (vorvertragMap[a.vorvertrag] ?? a.vorvertrag) : null),
    row('SF-Klasse Vollkasko', a.sf_klasse_vollkasko),
    row('Gemeldete Schäden', a.gemeldete_schaeden),
    row('Versicherer', a.bei_welchem_versicherer),
    row('Wie lange dort', a.wie_lange_bei_versicherer),
    row('Finanzierung', a.finanzierung),
    ...(a.finanzierung && a.finanzierung !== 'eigenfinanziert'
      ? [row('Mehrwert', a.mehrwert ? `${a.mehrwert} €` : null)]
      : []),
    row('Deckung Haftpflicht', a.deckung_haftpflicht),
    row('Zahlungsart', a.zahlungsart),
    row('Zahlungsweise', a.zahlungsweise),
    '',
    'Derzeitige Beiträge:',
    row('  Vollkasko', a.beitrag_vollkasko ? `${a.beitrag_vollkasko} €` : null),
    row('  Teilkasko', a.beitrag_teilkasko ? `${a.beitrag_teilkasko} €` : null),
    row('  Haftpflicht', a.beitrag_haftpflicht ? `${a.beitrag_haftpflicht} €` : null),
  ].join('\n')
}

// ─── Einzelnes Feld mit Kopieren-Button ──────────────────────────────────────

function CopyField({ label, value }: { label: string; value: string | null }) {
  const [copied, setCopied] = useState(false)
  if (!value) return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-500 w-40 shrink-0">{label}</span>
      <span className="text-xs text-gray-300 italic flex-1 text-right">–</span>
    </div>
  )

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(value) }
    catch {
      const ta = document.createElement('textarea')
      ta.value = value
      document.body.appendChild(ta)
      ta.select()
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 gap-2">
      <span className="text-xs text-gray-500 w-40 shrink-0">{label}</span>
      <span className="text-sm text-gray-900 flex-1">{value}</span>
      <button
        onClick={handleCopy}
        title="Kopieren"
        className={`shrink-0 px-2 py-1 rounded text-xs font-medium transition-colors ${
          copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
        }`}
      >
        {copied ? '✓' : '📋'}
      </button>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{title}</p>
      <div className="bg-gray-50 rounded-lg px-3">{children}</div>
    </div>
  )
}

// ─── Detailansicht ────────────────────────────────────────────────────────────

function AnfrageDetail({ anfrage, onClose, onStatusChange, onDelete }: {
  anfrage: Anfrage
  onClose: () => void
  onStatusChange: (id: string, status: 'neu' | 'erledigt') => void
  onDelete: (id: string) => void
}) {
  const [copiedAll, setCopiedAll] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const statusMap: Record<string, string> = {
    neu: 'Neues Fahrzeug', wechsel: 'Versichererwechsel', anderer: 'Anderer Halter'
  }
  const vorvertragMap: Record<string, string> = {
    vorversicherer: 'VN = Vorversicherer', vn_gekuendigt: 'VN hat gekündigt'
  }
  const fahrleistungLabel = anfrage.jaehrliche_fahrleistung === 'unbegrenzt'
    ? 'Unbegrenzt'
    : anfrage.jaehrliche_fahrleistung ? `${anfrage.jaehrliche_fahrleistung} km` : null

  const handleCopyAll = async () => {
    const text = buildNafiText(anfrage)
    try { await navigator.clipboard.writeText(text) }
    catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-2xl my-8 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div>
            <h2 className="font-bold text-gray-900">
              {anfrage.vorname} {anfrage.nachname}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Eingegangen: {new Date(anfrage.eingegangen_am).toLocaleString('de-DE')}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>

        {/* Felder mit einzelnen Kopieren-Buttons */}
        <div className="p-5 space-y-4 max-h-[65vh] overflow-y-auto">
          <Section title="1. Personenbezogene Daten">
            <CopyField label="E-Mail" value={anfrage.email} />
            <CopyField label="Vorname" value={anfrage.vorname} />
            <CopyField label="Nachname" value={anfrage.nachname} />
            <CopyField label="Straße" value={anfrage.strasse} />
            <CopyField label="PLZ" value={anfrage.plz} />
            <CopyField label="Ort" value={anfrage.ort} />
            <CopyField label="Geburtsdatum" value={fmtDate(anfrage.geburtsdatum_vn)} />
          </Section>

          <Section title="2. Fahrzeugdaten">
            <CopyField label="HSN" value={anfrage.hsn} />
            <CopyField label="TSN" value={anfrage.tsn} />
            <CopyField label="Fahrzeugkategorie" value={anfrage.fahrzeug_kategorie} />
            <CopyField label="Hersteller" value={anfrage.hersteller} />
            <CopyField label="Erstzulassung" value={fmtDate(anfrage.datum_erstzulassung)} />
            <CopyField label="Datum Erwerb" value={fmtDate(anfrage.datum_erwerb)} />
            <CopyField label="Neuwert" value={anfrage.neuwert ? `${anfrage.neuwert} €` : null} />
            <CopyField label="Jährl. Fahrleistung" value={fahrleistungLabel} />
          </Section>

          <Section title="3. Fahrzeugstatus">
            <CopyField label="Status" value={anfrage.fahrzeug_status ? (statusMap[anfrage.fahrzeug_status] ?? anfrage.fahrzeug_status) : null} />
            {anfrage.fahrzeug_status === 'anderer' && <>
              <CopyField label="Name Fahrzeughalter" value={anfrage.name_fahrzeughalter} />
              <CopyField label="PLZ Fahrzeughalter" value={anfrage.plz_fahrzeughalter} />
            </>}
          </Section>

          <Section title="4. Abstellort">
            <CopyField label="Abstellort" value={anfrage.abstellort} />
            <CopyField label="Abschließbar" value={anfrage.abstellort_abschliessbar === 'ja' ? 'Ja' : anfrage.abstellort_abschliessbar === 'nein' ? 'Nein' : null} />
          </Section>

          <Section title="5. Nutzung">
            <CopyField label="Nutzerkreis" value={anfrage.nutzerkreis} />
            <CopyField label="Saison von" value={fmtDate(anfrage.saison_start)} />
            <CopyField label="Saison bis" value={fmtDate(anfrage.saison_ende)} />
          </Section>

          <Section title="6. Versicherungsdaten">
            <CopyField label="SF-Klasse Haftpflicht" value={anfrage.sf_klasse_haftpflicht} />
            <CopyField label="Vorvertrag" value={anfrage.vorvertrag ? (vorvertragMap[anfrage.vorvertrag] ?? anfrage.vorvertrag) : null} />
            <CopyField label="SF-Klasse Vollkasko" value={anfrage.sf_klasse_vollkasko} />
            <CopyField label="Gemeldete Schäden" value={anfrage.gemeldete_schaeden} />
            <CopyField label="Versicherer" value={anfrage.bei_welchem_versicherer} />
            <CopyField label="Wie lange dort" value={anfrage.wie_lange_bei_versicherer} />
            <CopyField label="Finanzierung" value={anfrage.finanzierung} />
            {anfrage.finanzierung && anfrage.finanzierung !== 'eigenfinanziert' &&
              <CopyField label="Mehrwert" value={anfrage.mehrwert ? `${anfrage.mehrwert} €` : null} />
            }
            <CopyField label="Deckung Haftpflicht" value={anfrage.deckung_haftpflicht} />
            <CopyField label="Zahlungsart" value={anfrage.zahlungsart} />
            <CopyField label="Zahlungsweise" value={anfrage.zahlungsweise} />
            <CopyField label="Beitrag Vollkasko" value={anfrage.beitrag_vollkasko ? `${anfrage.beitrag_vollkasko} €` : null} />
            <CopyField label="Beitrag Teilkasko" value={anfrage.beitrag_teilkasko ? `${anfrage.beitrag_teilkasko} €` : null} />
            <CopyField label="Beitrag Haftpflicht" value={anfrage.beitrag_haftpflicht ? `${anfrage.beitrag_haftpflicht} €` : null} />
          </Section>
        </div>

        {/* Aktionen */}
        <div className="p-5 border-t border-gray-100 flex flex-wrap gap-3">
          <button
            onClick={handleCopyAll}
            className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
              copiedAll ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {copiedAll ? '✓ Alles kopiert!' : '📋 Alles kopieren (NAFI)'}
          </button>
          <button
            onClick={() => onStatusChange(anfrage.id, anfrage.status === 'neu' ? 'erledigt' : 'neu')}
            className="flex-1 py-2.5 rounded-lg font-semibold text-sm border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors"
          >
            {anfrage.status === 'neu' ? '✓ Als erledigt markieren' : '↩ Als neu markieren'}
          </button>
          {confirmDelete ? (
            <div className="w-full flex gap-2">
              <button
                onClick={() => onDelete(anfrage.id)}
                className="flex-1 py-2.5 rounded-lg font-semibold text-sm bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                Wirklich löschen
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 py-2.5 rounded-lg font-semibold text-sm border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors"
              >
                Abbrechen
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="py-2.5 px-4 rounded-lg font-semibold text-sm border border-red-200 bg-white hover:bg-red-50 text-red-600 transition-colors"
            >
              Löschen
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Hauptseite ───────────────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter()
  const [anfragen, setAnfragen] = useState<Anfrage[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'alle' | 'neu' | 'erledigt'>('alle')
  const [selected, setSelected] = useState<Anfrage | null>(null)

  const checkAuth = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.replace('/admin/login')
    }
  }, [router])

  const loadAnfragen = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('anfragen')
      .select('*')
      .order('eingegangen_am', { ascending: false })
    if (data) setAnfragen(data as Anfrage[])
    setLoading(false)
  }, [])

  useEffect(() => {
    checkAuth()
    loadAnfragen()
  }, [checkAuth, loadAnfragen])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  const handleStatusChange = async (id: string, newStatus: 'neu' | 'erledigt') => {
    await supabase.from('anfragen').update({ status: newStatus }).eq('id', id)
    setAnfragen(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: newStatus } : null)
  }

  const handleDelete = async (id: string) => {
    await supabase.from('anfragen').delete().eq('id', id)
    setAnfragen(prev => prev.filter(a => a.id !== id))
    setSelected(null)
  }

  const filtered = anfragen.filter(a => filter === 'alle' ? true : a.status === filter)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">KFZ-Anfragen</h1>
          <p className="text-xs text-gray-500">{anfragen.filter(a => a.status === 'neu').length} neue Anfragen</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5"
        >
          Abmelden
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Filter-Tabs */}
        <div className="flex gap-2 mb-4">
          {(['alle', 'neu', 'erledigt'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f === 'alle' ? 'Alle' : f === 'neu' ? 'Neu' : 'Erledigt'}
              {f !== 'alle' && (
                <span className="ml-1.5 text-xs opacity-75">
                  ({anfragen.filter(a => a.status === f).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Liste */}
        {loading ? (
          <div className="text-center py-12 text-gray-400 text-sm">Laden …</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">Keine Anfragen vorhanden.</div>
        ) : (
          <div className="space-y-2">
            {filtered.map(a => (
              <button
                key={a.id}
                onClick={() => setSelected(a)}
                className="w-full text-left bg-white border border-gray-200 rounded-xl px-4 py-3.5 hover:border-blue-300 hover:shadow-sm transition-all flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 text-sm">
                      {a.vorname} {a.nachname}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      a.status === 'neu'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {a.status === 'neu' ? 'Neu' : 'Erledigt'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 flex gap-3 flex-wrap">
                    <span>{a.plz} {a.ort}</span>
                    {a.hsn && a.tsn && <span>HSN {a.hsn} / TSN {a.tsn}</span>}
                    <span>{new Date(a.eingegangen_am).toLocaleDateString('de-DE')}</span>
                  </div>
                </div>
                <span className="text-gray-400 text-sm shrink-0">→</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail-Modal */}
      {selected && (
        <AnfrageDetail
          anfrage={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
