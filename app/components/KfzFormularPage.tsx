'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormValues {
  // 1. Personenbezogene Daten
  email: string
  vorname: string
  name: string
  strasse: string
  plz: string
  ort: string
  geburtsdatum: string
  // 2. Fahrzeugdaten
  hsn: string
  tsn: string
  fahrzeugKategorie: string
  hersteller: string
  datumErstzulassung: string
  datumErwerb: string
  neuwert: string
  jaehrlicheFahrleistung: string
  // 3. Fahrzeugstatus
  fahrzeugStatus: string
  nameFahrzeughalter: string
  plzFahrzeughalter: string
  // 4. Abstellort
  abstellort: string
  abstellortAbschliessbar: string
  // 5. Nutzung
  nutzerkreis: string
  saisonStart: string
  saisonEnde: string
  // 6. Versicherung
  sfKlasseHaftpflicht: string
  vorvertrag: string
  sfKlasseVollkasko: string
  gemeldeteSchaeden: string
  beiWelchemVersicherer: string
  wieLangeBeiVersicherer: string
  finanzierung: string
  mehrwert: string
  deckungHaftpflicht: string
  zahlungsart: string
  zahlungsweise: string
  beitragVollkasko: string
  beitragTeilkasko: string
  beitragHaftpflicht: string
}

type Errors = Partial<Record<keyof FormValues, string>>

// ─── Initial State ────────────────────────────────────────────────────────────

const INITIAL: FormValues = {
  email: '', vorname: '', name: '', strasse: '', plz: '', ort: '',
  geburtsdatum: '', hsn: '', tsn: '', fahrzeugKategorie: '', hersteller: '',
  datumErstzulassung: '', datumErwerb: '', neuwert: '',
  jaehrlicheFahrleistung: '', fahrzeugStatus: '', nameFahrzeughalter: '',
  plzFahrzeughalter: '', abstellort: '', abstellortAbschliessbar: '',
  nutzerkreis: '', saisonStart: '', saisonEnde: '', sfKlasseHaftpflicht: '',
  vorvertrag: '', sfKlasseVollkasko: '', gemeldeteSchaeden: '',
  beiWelchemVersicherer: '', wieLangeBeiVersicherer: '',
  finanzierung: '', mehrwert: '', deckungHaftpflicht: '', zahlungsart: '',
  zahlungsweise: '', beitragVollkasko: '', beitragTeilkasko: '',
  beitragHaftpflicht: '',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(iso: string): string {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

const STATUS_LABELS: Record<string, string> = {
  neu: 'Neu zugelassen (Kauf/Halterwechsel)',
  wechsel: 'Bereits auf eigenen Namen zugelassen (Versicherungswechsel)',
  anderer: 'Wird auf anderen Namen zugelassen',
}
const ABSTELLORT_LABELS: Record<string, string> = {
  einzel_doppelgarage: 'Einzel-/Doppelgarage',
  gesichertes_grundstueck: 'Gesichertes Grundstück',
  oeffentl_tiefgarage: 'Öffentliche Tiefgarage',
  tiefgarage_mfh: 'Tiefgarage in MFH',
  private_einfahrt: 'Private Einfahrt',
  carport: 'Carport',
  tiefgarage_gitterbox: 'Tiefgarage mit Gitterbox',
  oeffentl_strasse: 'Öffentliche Straße / Parkplatz',
}
const NUTZERKREIS_LABELS: Record<string, string> = {
  nur_vn: 'Nur der VN',
  vn_hauptnutzer: 'VN ist Hauptnutzer',
  vn_partner: 'VN + Partner',
  ohne_einschraenkung: 'Ohne Einschränkung',
  vn_haeusliche_gemeinschaft: 'VN + häusl. Gemeinschaft',
}
const FINANZIERUNG_LABELS: Record<string, string> = {
  eigenfinanziert: 'Eigenfinanziert',
  kredit: 'Kredit',
  leasing: 'Leasing',
}
const DECKUNG_LABELS: Record<string, string> = {
  haftpflicht: 'Haftpflicht',
  haftpflicht_teilkasko: 'Haftpflicht mit Teilkasko',
  haftpflicht_teilkasko_vollkasko: 'Haftpflicht mit Teilkasko und Vollkasko',
}
const ZAHLUNGSART_LABELS: Record<string, string> = {
  jaehrlich: 'Jährlich',
  halbjaehrlich: 'Halbjährlich',
  vierteljaehrlich: 'Vierteljährlich',
  monatlich: 'Monatlich',
}

function buildSummaryText(v: FormValues): string {
  const today = fmtDate(new Date().toISOString().split('T')[0])
  const row = (label: string, value: string) =>
    `${label}\n  ${value || '–'}`

  const lines: string[] = [
    `KFZ-ANFRAGE  ·  ${today}`,
    '',
    '═══════════════════════════════════════════',
    '1. PERSONENBEZOGENE DATEN',
    '───────────────────────────────────────────',
    row('E-Mail:', v.email),
    row('Vorname:', v.vorname),
    row('Name:', v.name),
    row('Straße:', v.strasse),
    row('PLZ:', v.plz),
    row('Ort:', v.ort),
    row('Geburtsdatum:', fmtDate(v.geburtsdatum)),
    '',
    '═══════════════════════════════════════════',
    '2. FAHRZEUGDATEN',
    '───────────────────────────────────────────',
    row('Hersteller-Nr. (HSN):', v.hsn),
    row('Typschlüssel-Nr. (TSN):', v.tsn),
    row('Fahrzeug-Kategorie:', v.fahrzeugKategorie),
    row('Hersteller:', v.hersteller),
    row('Datum Erstzulassung:', fmtDate(v.datumErstzulassung)),
    row('Datum Erwerb:', fmtDate(v.datumErwerb)),
    row('Neuwert (€):', v.neuwert ? `${v.neuwert} €` : ''),
    row('Jährl. Fahrleistung (km):', v.jaehrlicheFahrleistung === 'unbegrenzt' ? 'Unbegrenzt' : v.jaehrlicheFahrleistung ? `${v.jaehrlicheFahrleistung} km` : ''),
    '',
    '═══════════════════════════════════════════',
    '3. FAHRZEUG-STATUS',
    '───────────────────────────────────────────',
    row('Status:', STATUS_LABELS[v.fahrzeugStatus] ?? v.fahrzeugStatus),
    ...(v.fahrzeugStatus === 'anderer'
      ? [row('Name Fahrzeughalter:', v.nameFahrzeughalter), row('PLZ Fahrzeughalter:', v.plzFahrzeughalter)]
      : []),
    '',
    '═══════════════════════════════════════════',
    '4. ABSTELLORT',
    '───────────────────────────────────────────',
    row('Abstellort:', ABSTELLORT_LABELS[v.abstellort] ?? v.abstellort),
    row('Abschließbar:', v.abstellortAbschliessbar === 'ja' ? 'Ja' : v.abstellortAbschliessbar === 'nein' ? 'Nein' : ''),
    '',
    '═══════════════════════════════════════════',
    '5. NUTZUNG / NUTZERKREIS',
    '───────────────────────────────────────────',
    row('Nutzerkreis:', NUTZERKREIS_LABELS[v.nutzerkreis] ?? v.nutzerkreis),
    row('Saisonkennzeichen Start:', fmtDate(v.saisonStart)),
    row('Saisonkennzeichen Ende:', fmtDate(v.saisonEnde)),
    '',
    '═══════════════════════════════════════════',
    '6. DATEN ZUR VERSICHERUNG',
    '───────────────────────────────────────────',
    row('SF-Klasse Haftpflicht:', v.sfKlasseHaftpflicht),
    row('Vorvertrag:', v.vorvertrag === 'vorversicherer' ? 'Durch Vorversicherer' : v.vorvertrag === 'vn_gekuendigt' ? 'Versicherungsnehmer gekündigt' : ''),
    row('SF-Klasse Vollkasko:', v.sfKlasseVollkasko),
    row('Gemeldete Schäden (2 J.):', v.gemeldeteSchaeden),
    row('Bei welchem Versicherer:', v.beiWelchemVersicherer),
    row('Wie lange beim Versicherer:', v.wieLangeBeiVersicherer),
    row('Finanzierung:', FINANZIERUNG_LABELS[v.finanzierung] ?? v.finanzierung),
    ...(v.finanzierung && v.finanzierung !== 'eigenfinanziert'
      ? [row('Mehrwert (€):', v.mehrwert ? `${v.mehrwert} €` : '')]
      : []),
    row('Gewünschte Deckung:', DECKUNG_LABELS[v.deckungHaftpflicht] ?? v.deckungHaftpflicht),
    row('Zahlungsart:', ZAHLUNGSART_LABELS[v.zahlungsart] ?? v.zahlungsart),
    row('Zahlungsweise:', v.zahlungsweise === 'rechnung' ? 'Rechnung' : v.zahlungsweise === 'abbuchung' ? 'Abbuchung' : ''),
    '',
    'Derzeitiger Beitrag:',
    row('  Vollkasko:', v.beitragVollkasko ? `${v.beitragVollkasko} €` : ''),
    row('  Teilkasko:', v.beitragTeilkasko ? `${v.beitragTeilkasko} €` : ''),
    row('  Haftpflicht:', v.beitragHaftpflicht ? `${v.beitragHaftpflicht} €` : ''),
  ]

  return lines.join('\n')
}

// ─── UI-Komponenten ───────────────────────────────────────────────────────────

function SectionCard({ num, title, children }: { num: number; title: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-blue-600 px-5 py-3 flex items-center gap-3">
        <span className="bg-white text-blue-600 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">
          {num}
        </span>
        <h2 className="text-white font-semibold text-sm sm:text-base">{title}</h2>
      </div>
      <div className="p-5 space-y-5">{children}</div>
    </div>
  )
}

function Field({
  label, required, optional, help, children,
}: {
  label: string; required?: boolean; optional?: boolean; help?: string; children: ReactNode
}) {
  return (
    <div className="space-y-1">
      <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {required && <span className="text-red-500 text-sm leading-none">*</span>}
        {optional && <span className="text-xs text-gray-400 italic">optional</span>}
      </div>
      {help && <p className="text-xs text-gray-500 leading-snug">{help}</p>}
      {children}
    </div>
  )
}

interface InputProps {
  id: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  error?: string
  type?: 'text' | 'email' | 'date' | 'number'
  maxLength?: number
}

function TextInput({ id, value, onChange, placeholder, error, type = 'text', maxLength }: InputProps) {
  return (
    <>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`block w-full rounded-lg border px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
        }`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </>
  )
}

function SelectInput({
  id, value, onChange, options, error,
}: {
  id: string; value: string; onChange: (v: string) => void
  options: { value: string; label: string }[]; error?: string
}) {
  return (
    <>
      <select
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`block w-full rounded-lg border px-3 py-2.5 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-400 bg-red-50' : 'border-gray-300'
        }`}
      >
        <option value="">Bitte wählen …</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </>
  )
}

function RadioCards({
  name, value, onChange, options, cols = 2,
}: {
  name: string; value: string; onChange: (v: string) => void
  options: { value: string; label: string }[]; cols?: 1 | 2
}) {
  return (
    <div className={`grid gap-2 ${cols === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
      {options.map(o => (
        <label
          key={o.value}
          className={`flex cursor-pointer items-center gap-2.5 rounded-lg border p-3 text-sm transition-colors ${
            value === o.value
              ? 'border-blue-500 bg-blue-50 text-blue-800 font-medium'
              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300'
          }`}
        >
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            className="sr-only"
          />
          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
            value === o.value ? 'border-blue-500' : 'border-gray-400'
          }`}>
            {value === o.value && <span className="w-2 h-2 rounded-full bg-blue-500" />}
          </span>
          {o.label}
        </label>
      ))}
    </div>
  )
}

// ─── Zusammenfassung ─────────────────────────────────────────────────────────

function Zusammenfassung({ values, onBack }: { values: FormValues; onBack: () => void }) {
  const [copied, setCopied] = useState(false)
  const text = buildSummaryText(values)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-5">

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3">
          <span className="text-green-600 text-xl leading-none">✓</span>
          <div>
            <p className="font-semibold text-green-800 text-sm">Angaben vollständig!</p>
            <p className="text-green-700 text-xs mt-0.5">
              Kopieren Sie alle Angaben mit dem Button unten und tippen Sie sie in NAFI ein.
            </p>
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-900">Ihre Angaben – Übersicht</h1>
          <p className="text-xs text-gray-500 mt-1">
            Reihenfolge entspricht der NAFI-Eingabemaske.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 font-mono text-xs text-gray-800 whitespace-pre leading-relaxed overflow-x-auto">
          {text}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCopy}
            className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-colors ${
              copied ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {copied ? '✓ In Zwischenablage kopiert!' : '📋 Alle Angaben kopieren'}
          </button>
          <button
            onClick={onBack}
            className="flex-1 py-3 rounded-lg font-medium text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Formular bearbeiten
          </button>
        </div>

      </div>
    </div>
  )
}

// ─── Hauptformular ────────────────────────────────────────────────────────────

export default function KfzFormularPage() {
  const [values, setValues] = useState<FormValues>(INITIAL)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [showErrorBanner, setShowErrorBanner] = useState(false)

  const set = (field: keyof FormValues) => (v: string) => {
    setValues(prev => ({ ...prev, [field]: v }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const validate = (): boolean => {
    const e: Errors = {}
    if (!values.vorname.trim()) e.vorname = 'Bitte Vornamen eingeben.'
    if (!values.name.trim()) e.name = 'Bitte Nachnamen eingeben.'
    if (!values.strasse.trim()) e.strasse = 'Bitte Straße und Hausnummer eingeben.'
    if (!values.plz.trim()) e.plz = 'Bitte PLZ eingeben.'
    else if (!/^\d{5}$/.test(values.plz.trim())) e.plz = 'PLZ muss 5 Ziffern haben.'
    if (!values.ort.trim()) e.ort = 'Bitte Ort eingeben.'
    if (!values.geburtsdatum) e.geburtsdatum = 'Bitte Geburtsdatum angeben.'
    if (!values.hsn.trim()) e.hsn = 'Bitte HSN eingeben.'
    else if (!/^\d{4}$/.test(values.hsn.trim())) e.hsn = 'HSN besteht aus genau 4 Ziffern.'
    if (!values.tsn.trim()) e.tsn = 'Bitte TSN eingeben.'
    if (values.fahrzeugStatus === 'anderer') {
      if (!values.nameFahrzeughalter.trim()) e.nameFahrzeughalter = 'Bitte Namen des Fahrzeughalters eingeben.'
      if (!values.plzFahrzeughalter.trim()) e.plzFahrzeughalter = 'Bitte PLZ des Fahrzeughalters eingeben.'
      else if (!/^\d{5}$/.test(values.plzFahrzeughalter.trim())) e.plzFahrzeughalter = 'PLZ muss 5 Ziffern haben.'
    }
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = 'Bitte gültige E-Mail-Adresse eingeben.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setShowErrorBanner(false)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setShowErrorBanner(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (submitted) {
    return <Zusammenfassung values={values} onBack={() => { setSubmitted(false); window.scrollTo({ top: 0 }) }} />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">KFZ-Anfrage</h1>
          <p className="text-sm text-gray-500 mt-1">
            Felder mit <span className="text-red-500 font-medium">*</span> sind Pflichtfelder.
            Alle anderen sind freiwillig, helfen aber bei einem besseren Angebot.
          </p>
        </div>

        {/* Fehler-Banner */}
        {showErrorBanner && (
          <div className="mb-5 bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
            <span className="text-red-500 text-lg leading-none">⚠</span>
            <div>
              <p className="font-semibold text-red-800 text-sm">Bitte Pflichtfelder ausfüllen</p>
              <p className="text-red-700 text-xs mt-0.5">
                Einige Pflichtfelder fehlen oder enthalten ungültige Werte. Bitte prüfen Sie die rot markierten Felder.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          {/* ─── 1. Personenbezogene Daten ─── */}
          <SectionCard num={1} title="Personenbezogene Daten">
            <Field label="E-Mail" optional>
              <TextInput
                id="email" type="email" value={values.email}
                onChange={set('email')} placeholder="max@beispiel.de" error={errors.email}
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Vorname" required>
                <TextInput id="vorname" value={values.vorname} onChange={set('vorname')} error={errors.vorname} />
              </Field>
              <Field label="Nachname" required>
                <TextInput id="name" value={values.name} onChange={set('name')} error={errors.name} />
              </Field>
            </div>
            <Field label="Straße und Hausnummer" required>
              <TextInput
                id="strasse" value={values.strasse} onChange={set('strasse')}
                placeholder="Musterstraße 1" error={errors.strasse}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="PLZ" required>
                <TextInput
                  id="plz" value={values.plz} onChange={set('plz')}
                  placeholder="12345" maxLength={5} error={errors.plz}
                />
              </Field>
              <Field label="Ort" required>
                <TextInput id="ort" value={values.ort} onChange={set('ort')} placeholder="Musterstadt" error={errors.ort} />
              </Field>
            </div>
            <Field label="Geburtsdatum" required>
              <TextInput id="geburtsdatum" type="date" value={values.geburtsdatum} onChange={set('geburtsdatum')} error={errors.geburtsdatum} />
            </Field>
          </SectionCard>

          {/* ─── 2. Fahrzeugdaten ─── */}
          <SectionCard num={2} title="Fahrzeugdaten">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Hersteller-Nr. (HSN)" required
                help="4-stellige Zahl aus der Zulassungsbescheinigung Teil I, Feld 2.1"
              >
                <TextInput
                  id="hsn" value={values.hsn} onChange={set('hsn')}
                  placeholder="z. B. 0603" maxLength={4} error={errors.hsn}
                />
              </Field>
              <Field
                label="Typschlüssel-Nr. (TSN)" required
                help="3 Zeichen aus der Zulassungsbescheinigung Teil I, Feld 2.2"
              >
                <TextInput
                  id="tsn" value={values.tsn} onChange={set('tsn')}
                  placeholder="z. B. AAA" error={errors.tsn}
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Fahrzeug-Kategorie" optional>
                <SelectInput
                  id="fahrzeugKategorie" value={values.fahrzeugKategorie} onChange={set('fahrzeugKategorie')}
                  options={[
                    { value: 'PKW', label: 'PKW' },
                    { value: 'Kombi', label: 'Kombi' },
                    { value: 'SUV', label: 'SUV / Geländewagen' },
                    { value: 'Transporter', label: 'Transporter' },
                    { value: 'Motorrad', label: 'Motorrad' },
                    { value: 'Roller', label: 'Roller / Moped' },
                    { value: 'Sonstiges', label: 'Sonstiges' },
                  ]}
                />
              </Field>
              <Field label="Hersteller" optional help="z. B. VW, BMW, Mercedes">
                <TextInput id="hersteller" value={values.hersteller} onChange={set('hersteller')} placeholder="z. B. VW" />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Datum Erstzulassung" optional>
                <TextInput id="datumErstzulassung" type="date" value={values.datumErstzulassung} onChange={set('datumErstzulassung')} />
              </Field>
              <Field label="Datum Erwerb" optional>
                <TextInput id="datumErwerb" type="date" value={values.datumErwerb} onChange={set('datumErwerb')} />
              </Field>
            </div>
            <Field label="Neuwert (€)" optional>
              <TextInput id="neuwert" type="number" value={values.neuwert} onChange={set('neuwert')} placeholder="z. B. 25000" />
            </Field>
            <Field label="Jährliche Fahrleistung" optional>
              <SelectInput
                id="jaehrlicheFahrleistung" value={values.jaehrlicheFahrleistung} onChange={set('jaehrlicheFahrleistung')}
                options={[
                  ...[3000, 6000, 9000, 12000, 15000, 18000, 21000].map(n => ({
                    value: String(n),
                    label: `${n.toLocaleString('de-DE')} km`,
                  })),
                  { value: 'unbegrenzt', label: 'Unbegrenzt' },
                ]}
              />
            </Field>
          </SectionCard>

          {/* ─── 3. Fahrzeugstatus ─── */}
          <SectionCard num={3} title="Das Fahrzeug (Status)">
            <Field label="Was trifft auf Ihr Fahrzeug zu?" optional>
              <RadioCards
                name="fahrzeugStatus" value={values.fahrzeugStatus} onChange={set('fahrzeugStatus')} cols={1}
                options={[
                  { value: 'neu', label: 'Soll auf Ihren Namen neu zugelassen werden (Kauf oder Halterwechsel)' },
                  { value: 'wechsel', label: 'Ist bereits auf Ihren Namen zugelassen / versichert (Versicherungswechsel)' },
                  { value: 'anderer', label: 'Wird zugelassen auf einen anderen Namen' },
                ]}
              />
            </Field>
            {values.fahrzeugStatus === 'anderer' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-4 border-l-2 border-blue-200">
                <Field label="Name des Fahrzeughalters" required>
                  <TextInput id="nameFahrzeughalter" value={values.nameFahrzeughalter} onChange={set('nameFahrzeughalter')} error={errors.nameFahrzeughalter} />
                </Field>
                <Field label="PLZ des Fahrzeughalters" required>
                  <TextInput id="plzFahrzeughalter" value={values.plzFahrzeughalter} onChange={set('plzFahrzeughalter')} maxLength={5} error={errors.plzFahrzeughalter} />
                </Field>
              </div>
            )}
          </SectionCard>

          {/* ─── 4. Abstellort ─── */}
          <SectionCard num={4} title="Wo steht das Fahrzeug über Nacht?">
            <Field label="Abstellort" optional>
              <RadioCards
                name="abstellort" value={values.abstellort} onChange={set('abstellort')}
                options={[
                  { value: 'einzel_doppelgarage', label: 'Einzel-/Doppelgarage' },
                  { value: 'gesichertes_grundstueck', label: 'Gesichertes Grundstück' },
                  { value: 'oeffentl_tiefgarage', label: 'Öffentl. Tiefgarage' },
                  { value: 'tiefgarage_mfh', label: 'Tiefgarage in MFH' },
                  { value: 'private_einfahrt', label: 'Private Einfahrt' },
                  { value: 'carport', label: 'Carport' },
                  { value: 'tiefgarage_gitterbox', label: 'Tiefgarage mit Gitterbox' },
                  { value: 'oeffentl_strasse', label: 'Öffentl. Straße / Parkplatz' },
                ]}
              />
            </Field>
            <Field label="Ist der Abstellort abschließbar?" optional>
              <RadioCards
                name="abstellortAbschliessbar" value={values.abstellortAbschliessbar} onChange={set('abstellortAbschliessbar')}
                options={[{ value: 'ja', label: 'Ja' }, { value: 'nein', label: 'Nein' }]}
              />
            </Field>
          </SectionCard>

          {/* ─── 5. Nutzung / Nutzerkreis ─── */}
          <SectionCard num={5} title="Nutzung / Nutzerkreis">
            <Field label="Nutzerkreis" optional help="VN = Versicherungsnehmer (die Person, die den Vertrag abschließt)">
              <RadioCards
                name="nutzerkreis" value={values.nutzerkreis} onChange={set('nutzerkreis')}
                options={[
                  { value: 'nur_vn', label: 'Nur der VN' },
                  { value: 'vn_hauptnutzer', label: 'VN ist Hauptnutzer' },
                  { value: 'vn_partner', label: 'VN + Partner' },
                  { value: 'ohne_einschraenkung', label: 'Ohne Einschränkung' },
                  { value: 'vn_haeusliche_gemeinschaft', label: 'VN + häusl. Gemeinschaft' },
                ]}
              />
            </Field>
            <Field label="Saisonkennzeichen" optional help="Nur ausfüllen, wenn Sie ein Saisonkennzeichen haben.">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Start</p>
                  <TextInput id="saisonStart" type="date" value={values.saisonStart} onChange={set('saisonStart')} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Ende</p>
                  <TextInput id="saisonEnde" type="date" value={values.saisonEnde} onChange={set('saisonEnde')} />
                </div>
              </div>
            </Field>
          </SectionCard>

          {/* ─── 6. Versicherungsdaten ─── */}
          <SectionCard num={6} title="Daten zur Versicherung">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="SF-Klasse Haftpflicht" optional
                help="Schadensfreiheitsklasse – steht auf Ihrer letzten Beitragsrechnung oder Versicherungsmitteilung. Beispiele: SF 0, SF 1/2, SF 5, SF 15. Erstzulassung oder neuer Fahrer: SF 0."
              >
                <TextInput id="sfKlasseHaftpflicht" value={values.sfKlasseHaftpflicht} onChange={set('sfKlasseHaftpflicht')} placeholder="z. B. SF 15" />
              </Field>
              <Field
                label="SF-Klasse Vollkasko" optional
                help="Oft identisch mit der SF-Klasse Haftpflicht."
              >
                <TextInput id="sfKlasseVollkasko" value={values.sfKlasseVollkasko} onChange={set('sfKlasseVollkasko')} placeholder="z. B. SF 15" />
              </Field>
            </div>
            <Field label="Vorvertrag" optional help="Wurde der bisherige Vertrag gekündigt, und wenn ja – von wem?">
              <RadioCards
                name="vorvertrag" value={values.vorvertrag} onChange={set('vorvertrag')}
                options={[
                  { value: 'vorversicherer', label: 'Durch Vorversicherer (Versicherer hat gekündigt)' },
                  { value: 'vn_gekuendigt', label: 'Versicherungsnehmer hat selbst gekündigt' },
                ]}
              />
            </Field>
            <Field label="Gemeldete Schäden in den letzten 2 Jahren" optional>
              <TextInput id="gemeldeteSchaeden" type="number" value={values.gemeldeteSchaeden} onChange={set('gemeldeteSchaeden')} placeholder="0" />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Bei welchem Versicherer?" optional>
                <TextInput id="beiWelchemVersicherer" value={values.beiWelchemVersicherer} onChange={set('beiWelchemVersicherer')} placeholder="z. B. Allianz" />
              </Field>
              <Field label="Wie lange beim aktuellen Versicherer?" optional>
                <TextInput id="wieLangeBeiVersicherer" value={values.wieLangeBeiVersicherer} onChange={set('wieLangeBeiVersicherer')} placeholder="z. B. 5 Jahre" />
              </Field>
            </div>
            <Field label="Finanzierung" optional>
              <RadioCards
                name="finanzierung" value={values.finanzierung} onChange={set('finanzierung')}
                options={[
                  { value: 'eigenfinanziert', label: 'Eigenfinanziert' },
                  { value: 'kredit', label: 'Kredit' },
                  { value: 'leasing', label: 'Leasing' },
                ]}
              />
            </Field>
            {values.finanzierung && values.finanzierung !== 'eigenfinanziert' && (
              <Field label="Mehrwert (€)" optional>
                <TextInput id="mehrwert" type="number" value={values.mehrwert} onChange={set('mehrwert')} placeholder="z. B. 5000" />
              </Field>
            )}
            <Field label="Gewünschte Deckung" optional>
              <RadioCards
                name="deckungHaftpflicht" value={values.deckungHaftpflicht} onChange={set('deckungHaftpflicht')} cols={1}
                options={[
                  { value: 'haftpflicht', label: 'Haftpflicht' },
                  { value: 'haftpflicht_teilkasko', label: 'Haftpflicht + Teilkasko' },
                  { value: 'haftpflicht_teilkasko_vollkasko', label: 'Haftpflicht + Teilkasko + Vollkasko' },
                ]}
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Zahlungsart" optional>
                <SelectInput
                  id="zahlungsart" value={values.zahlungsart} onChange={set('zahlungsart')}
                  options={[
                    { value: 'jaehrlich', label: 'Jährlich' },
                    { value: 'halbjaehrlich', label: 'Halbjährlich' },
                    { value: 'vierteljaehrlich', label: 'Vierteljährlich' },
                    { value: 'monatlich', label: 'Monatlich' },
                  ]}
                />
              </Field>
              <Field label="Zahlungsweise" optional>
                <RadioCards
                  name="zahlungsweise" value={values.zahlungsweise} onChange={set('zahlungsweise')}
                  options={[
                    { value: 'rechnung', label: 'Rechnung' },
                    { value: 'abbuchung', label: 'Abbuchung' },
                  ]}
                />
              </Field>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Derzeitiger Beitrag</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Vollkasko (€)" optional>
                  <TextInput id="beitragVollkasko" type="number" value={values.beitragVollkasko} onChange={set('beitragVollkasko')} placeholder="0" />
                </Field>
                <Field label="Teilkasko (€)" optional>
                  <TextInput id="beitragTeilkasko" type="number" value={values.beitragTeilkasko} onChange={set('beitragTeilkasko')} placeholder="0" />
                </Field>
                <Field label="Haftpflicht (€)" optional>
                  <TextInput id="beitragHaftpflicht" type="number" value={values.beitragHaftpflicht} onChange={set('beitragHaftpflicht')} placeholder="0" />
                </Field>
              </div>
            </div>
          </SectionCard>

          {/* ─── Absenden ─── */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Mit dem Absenden bestätigen Sie, dass Ihre Angaben korrekt sind.
              Die Daten werden ausschließlich zur Erstellung eines Versicherungsangebots verwendet
              und nicht an Dritte weitergegeben.
            </p>
            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-colors"
            >
              Angaben absenden →
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
