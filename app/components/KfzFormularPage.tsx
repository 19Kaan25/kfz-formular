'use client'

import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { TRANSLATIONS, type Lang, type T } from './translations'
import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormValues {
  email: string; vorname: string; name: string; strasse: string
  plz: string; ort: string; geburtsdatum: string
  hsn: string; tsn: string; fahrzeugKategorie: string
  datumErstzulassung: string; datumErwerb: string
  jaehrlicheFahrleistung: string
  fahrzeugStatus: string; nameFahrzeughalter: string; plzFahrzeughalter: string
  abstellort: string; abstellortAbschliessbar: string
  nutzerkreis: string; partnerGeburtsdatum: string; fahrerUnter23: string
  geburtsdatumJuengsterFahrer: string; geburtsdatumAeltesterFahrer: string
  saisonStart: string; saisonEnde: string
  sfKlasseHaftpflicht: string; vorvertrag: string; sfKlasseVollkasko: string
  gemeldeteSchaeden: string; beiWelchemVersicherer: string
  wieLangeBeiVersicherer: string; finanzierung: string; mehrwert: string
  deckungHaftpflicht: string; zahlungsart: string; zahlungsweise: string
  beitragVollkasko: string; beitragTeilkasko: string; beitragHaftpflicht: string
}

type Errors = Partial<Record<keyof FormValues, string>>

const INITIAL: FormValues = {
  email: '', vorname: '', name: '', strasse: '', plz: '', ort: '',
  geburtsdatum: '', hsn: '', tsn: '', fahrzeugKategorie: '',
  datumErstzulassung: '', datumErwerb: '',
  jaehrlicheFahrleistung: '', fahrzeugStatus: '', nameFahrzeughalter: '',
  plzFahrzeughalter: '', abstellort: '', abstellortAbschliessbar: '',
  nutzerkreis: '', partnerGeburtsdatum: '', fahrerUnter23: '',
  geburtsdatumJuengsterFahrer: '', geburtsdatumAeltesterFahrer: '',
  saisonStart: '', saisonEnde: '', sfKlasseHaftpflicht: '',
  vorvertrag: '', sfKlasseVollkasko: '', gemeldeteSchaeden: '',
  beiWelchemVersicherer: '', wieLangeBeiVersicherer: '',
  finanzierung: '', mehrwert: '', deckungHaftpflicht: '', zahlungsart: '',
  zahlungsweise: '', beitragVollkasko: '', beitragTeilkasko: '',
  beitragHaftpflicht: '',
}

const LS_KEY = 'kfz_draft'

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

function Field({ label, required, optional, help, children }: {
  label: string; required?: boolean; optional?: string; help?: string; children: ReactNode
}) {
  return (
    <div className="space-y-1">
      <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {required && <span className="text-red-500 text-sm leading-none">*</span>}
        {optional && <span className="text-xs text-gray-400 italic">{optional}</span>}
      </div>
      {help && <p className="text-xs text-gray-500 leading-snug">{help}</p>}
      {children}
    </div>
  )
}

interface InputProps {
  id: string; value: string; onChange: (v: string) => void
  placeholder?: string; error?: string
  type?: 'text' | 'email' | 'date' | 'number'; maxLength?: number
}

function TextInput({ id, value, onChange, placeholder, error, type = 'text', maxLength }: InputProps) {
  return (
    <>
      <input
        id={id} type={type} value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder} maxLength={maxLength}
        className={`block w-full rounded-lg border px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
        }`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </>
  )
}

function SelectInput({ id, value, onChange, options, error, placeholder }: {
  id: string; value: string; onChange: (v: string) => void
  options: { value: string; label: string }[]; error?: string; placeholder?: string
}) {
  return (
    <>
      <select
        id={id} value={value} onChange={e => onChange(e.target.value)}
        className={`block w-full rounded-lg border px-3 py-2.5 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-400 bg-red-50' : 'border-gray-300'
        }`}
      >
        <option value="">{placeholder ?? 'Bitte wählen …'}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </>
  )
}

function RadioCards({ name, value, onChange, options, cols = 2 }: {
  name: string; value: string; onChange: (v: string) => void
  options: { value: string; label: string }[]; cols?: 1 | 2
}) {
  return (
    <div className={`grid gap-2 ${cols === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
      {options.map(o => (
        <label
          key={o.value}
          onClick={e => {
            if (value === o.value) {
              e.preventDefault()
              onChange('')
            }
          }}
          className={`flex cursor-pointer items-center gap-2.5 rounded-lg border p-3 text-sm transition-colors ${
            value === o.value
              ? 'border-blue-500 bg-blue-50 text-blue-800 font-medium'
              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300'
          }`}
        >
          <input
            type="radio" name={name} value={o.value}
            checked={value === o.value} onChange={() => onChange(o.value)}
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

// ─── Erfolgsmeldung ───────────────────────────────────────────────────────────

function Erfolg({ t, onReset }: { t: T; onReset: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.successTitle}</h1>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed">{t.successText}</p>
        </div>
        <button
          onClick={onReset}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-colors"
        >
          {t.newRequestButton}
        </button>
      </div>
    </div>
  )
}

// ─── Hauptformular ────────────────────────────────────────────────────────────

export default function KfzFormularPage() {
  const [lang, setLang] = useState<Lang>('de')
  const t = TRANSLATIONS[lang]

  const [values, setValues] = useState<FormValues>(INITIAL)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showErrorBanner, setShowErrorBanner] = useState(false)

  // localStorage: Entwurf laden
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY)
      if (saved) setValues(JSON.parse(saved))
    } catch { /* ignore */ }
  }, [])

  // localStorage: Entwurf speichern bei Änderung
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(values))
    } catch { /* ignore */ }
  }, [values])

  const set = (field: keyof FormValues) => (v: string) => {
    setValues(prev => ({ ...prev, [field]: v }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const setFahrzeugStatus = (v: string) => {
    setValues(prev => ({
      ...prev,
      fahrzeugStatus: v,
      ...(v !== 'anderer' ? { nameFahrzeughalter: '', plzFahrzeughalter: '' } : {}),
    }))
    setErrors(prev => ({ ...prev, fahrzeugStatus: undefined, nameFahrzeughalter: undefined, plzFahrzeughalter: undefined }))
  }

  const setFinanzierung = (v: string) => {
    setValues(prev => ({
      ...prev,
      finanzierung: v,
      ...(!v || v === 'eigenfinanziert' ? { mehrwert: '' } : {}),
    }))
    setErrors(prev => ({ ...prev, finanzierung: undefined }))
  }

  const setNutzerkreis = (v: string) => {
    setValues(prev => ({
      ...prev,
      nutzerkreis: v,
      ...(v !== 'vn_partner' ? { partnerGeburtsdatum: '' } : {}),
      ...(v !== 'ohne_einschraenkung' ? { fahrerUnter23: '' } : {}),
      ...(v !== 'vn_haeusliche_gemeinschaft'
        ? { geburtsdatumJuengsterFahrer: '', geburtsdatumAeltesterFahrer: '' }
        : {}),
    }))
    setErrors(prev => ({ ...prev, nutzerkreis: undefined }))
  }

  // Nullt Unterfelder, deren übergeordnete Auswahl nicht (mehr) zutrifft –
  // verhindert, dass versteckte, veraltete Eingaben mit übermittelt werden.
  const sanitizeForSubmit = (v: FormValues): FormValues => ({
    ...v,
    ...(v.fahrzeugStatus !== 'anderer' ? { nameFahrzeughalter: '', plzFahrzeughalter: '' } : {}),
    ...(!v.finanzierung || v.finanzierung === 'eigenfinanziert' ? { mehrwert: '' } : {}),
    ...(v.nutzerkreis !== 'vn_partner' ? { partnerGeburtsdatum: '' } : {}),
    ...(v.nutzerkreis !== 'ohne_einschraenkung' ? { fahrerUnter23: '' } : {}),
    ...(v.nutzerkreis !== 'vn_haeusliche_gemeinschaft'
      ? { geburtsdatumJuengsterFahrer: '', geburtsdatumAeltesterFahrer: '' }
      : {}),
  })

  const validate = (): boolean => {
    const e: Errors = {}
    if (!values.vorname.trim()) e.vorname = t.errVorname
    if (!values.name.trim()) e.name = t.errName
    if (!values.strasse.trim()) e.strasse = t.errStrasse
    if (!values.plz.trim()) e.plz = t.errPlz
    else if (!/^\d{5}$/.test(values.plz.trim())) e.plz = t.errPlzFormat
    if (!values.ort.trim()) e.ort = t.errOrt
    if (!values.geburtsdatum) e.geburtsdatum = t.errGeburtsdatum
    if (!values.hsn.trim()) e.hsn = t.errHsn
    else if (!/^\d{4}$/.test(values.hsn.trim())) e.hsn = t.errHsnFormat
    if (!values.tsn.trim()) e.tsn = t.errTsn
    if (!values.datumErstzulassung) e.datumErstzulassung = t.errDatumErstzulassung
    if (!values.datumErwerb) e.datumErwerb = t.errDatumErwerb
    if (!values.jaehrlicheFahrleistung) e.jaehrlicheFahrleistung = t.errJaehrlicheFahrleistung
    if (values.fahrzeugStatus === 'anderer') {
      if (!values.nameFahrzeughalter.trim()) e.nameFahrzeughalter = t.errNameFahrzeughalter
      if (!values.plzFahrzeughalter.trim()) e.plzFahrzeughalter = t.errPlzFahrzeughalter
      else if (!/^\d{5}$/.test(values.plzFahrzeughalter.trim())) e.plzFahrzeughalter = t.errPlzFahrzeughalterFormat
    }
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = t.errEmail
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      setShowErrorBanner(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setShowErrorBanner(false)
    setLoading(true)
    setSubmitError(null)

    const payload = sanitizeForSubmit(values)

    const { error } = await supabase.from('anfragen').insert({
      email: payload.email || null,
      vorname: payload.vorname,
      nachname: payload.name,
      strasse: payload.strasse,
      plz: payload.plz,
      ort: payload.ort,
      geburtsdatum_vn: payload.geburtsdatum,
      hsn: payload.hsn,
      tsn: payload.tsn,
      fahrzeug_kategorie: payload.fahrzeugKategorie || null,
      datum_erstzulassung: payload.datumErstzulassung || null,
      datum_erwerb: payload.datumErwerb || null,
      jaehrliche_fahrleistung: payload.jaehrlicheFahrleistung || null,
      fahrzeug_status: payload.fahrzeugStatus || null,
      name_fahrzeughalter: payload.nameFahrzeughalter || null,
      plz_fahrzeughalter: payload.plzFahrzeughalter || null,
      abstellort: payload.abstellort || null,
      abstellort_abschliessbar: payload.abstellortAbschliessbar || null,
      nutzerkreis: payload.nutzerkreis || null,
      partner_geburtsdatum: payload.partnerGeburtsdatum || null,
      fahrer_unter_23: payload.fahrerUnter23 || null,
      geburtsdatum_juengster_fahrer: payload.geburtsdatumJuengsterFahrer || null,
      geburtsdatum_aeltester_fahrer: payload.geburtsdatumAeltesterFahrer || null,
      saison_start: payload.saisonStart || null,
      saison_ende: payload.saisonEnde || null,
      sf_klasse_haftpflicht: payload.sfKlasseHaftpflicht || null,
      vorvertrag: payload.vorvertrag || null,
      sf_klasse_vollkasko: payload.sfKlasseVollkasko || null,
      gemeldete_schaeden: payload.gemeldeteSchaeden || null,
      bei_welchem_versicherer: payload.beiWelchemVersicherer || null,
      wie_lange_bei_versicherer: payload.wieLangeBeiVersicherer || null,
      finanzierung: payload.finanzierung || null,
      mehrwert: payload.mehrwert || null,
      deckung_haftpflicht: payload.deckungHaftpflicht || null,
      zahlungsart: payload.zahlungsart || null,
      zahlungsweise: payload.zahlungsweise || null,
      beitrag_vollkasko: payload.beitragVollkasko || null,
      beitrag_teilkasko: payload.beitragTeilkasko || null,
      beitrag_haftpflicht: payload.beitragHaftpflicht || null,
    })

    setLoading(false)

    if (error) {
      console.error('Supabase insert error:', error.code, error.message)
      setSubmitError(t.errSubmit)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // Erfolgreich: Entwurf löschen
    try { localStorage.removeItem(LS_KEY) } catch { /* ignore */ }
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    setValues(INITIAL)
    setErrors({})
    setSubmitted(false)
    setShowErrorBanner(false)
    setSubmitError(null)
    window.scrollTo({ top: 0 })
  }

  if (submitted) {
    return <Erfolg t={t} onReset={handleReset} />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t.pageTitle}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {t.pageSubtitle.split('*').map((part, i) =>
                i === 0 ? part : <span key={i}><span className="text-red-500 font-medium">*</span>{part}</span>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setLang(l => l === 'de' ? 'tr' : 'de')}
            className="shrink-0 px-3 py-1.5 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
          >
            {t.langToggle}
          </button>
        </div>

        {/* Fehler-Banner (Validierung) */}
        {showErrorBanner && (
          <div className="mb-5 bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
            <span className="text-red-500 text-lg leading-none">⚠</span>
            <div>
              <p className="font-semibold text-red-800 text-sm">{t.errBannerTitle}</p>
              <p className="text-red-700 text-xs mt-0.5">{t.errBannerText}</p>
            </div>
          </div>
        )}

        {/* Fehler-Banner (Supabase) */}
        {submitError && (
          <div className="mb-5 bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
            <span className="text-red-500 text-lg leading-none">⚠</span>
            <p className="text-red-800 text-sm font-medium">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          {/* ─── 1. Personenbezogene Daten ─── */}
          <SectionCard num={1} title={t.s1Title}>
            <Field label={t.emailLabel} optional={t.optional}>
              <TextInput id="email" type="email" value={values.email}
                onChange={set('email')} placeholder="max@beispiel.de" error={errors.email} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={t.vornameLabel} required>
                <TextInput id="vorname" value={values.vorname} onChange={set('vorname')} error={errors.vorname} />
              </Field>
              <Field label={t.nameLabel} required>
                <TextInput id="name" value={values.name} onChange={set('name')} error={errors.name} />
              </Field>
            </div>
            <Field label={t.strasseLabel} required>
              <TextInput id="strasse" value={values.strasse} onChange={set('strasse')}
                placeholder={t.strassePlaceholder} error={errors.strasse} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label={t.plzLabel} required>
                <TextInput id="plz" value={values.plz} onChange={set('plz')}
                  placeholder="12345" maxLength={5} error={errors.plz} />
              </Field>
              <Field label={t.ortLabel} required>
                <TextInput id="ort" value={values.ort} onChange={set('ort')}
                  placeholder={t.ortPlaceholder} error={errors.ort} />
              </Field>
            </div>
            <Field label={t.geburtsdatumLabel} required>
              <TextInput id="geburtsdatum" type="date" value={values.geburtsdatum}
                onChange={set('geburtsdatum')} error={errors.geburtsdatum} />
            </Field>
          </SectionCard>

          {/* ─── 2. Fahrzeugdaten ─── */}
          <SectionCard num={2} title={t.s2Title}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={t.hsnLabel} required help={t.hsnHelp}>
                <TextInput id="hsn" value={values.hsn} onChange={set('hsn')}
                  placeholder={t.hsnPlaceholder} maxLength={4} error={errors.hsn} />
              </Field>
              <Field label={t.tsnLabel} required help={t.tsnHelp}>
                <TextInput id="tsn" value={values.tsn} onChange={set('tsn')}
                  placeholder={t.tsnPlaceholder} error={errors.tsn} />
              </Field>
            </div>
            <Field label={t.fahrzeugKategorieLabel} optional={t.optional}>
              <SelectInput id="fahrzeugKategorie" value={values.fahrzeugKategorie}
                onChange={set('fahrzeugKategorie')} options={t.fahrzeugKategorieOptions}
                placeholder={t.selectPlaceholder} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={t.datumErstzulassungLabel} required>
                <TextInput id="datumErstzulassung" type="date" value={values.datumErstzulassung}
                  onChange={set('datumErstzulassung')} error={errors.datumErstzulassung} />
              </Field>
              <Field label={t.datumErwerbLabel} required>
                <TextInput id="datumErwerb" type="date" value={values.datumErwerb}
                  onChange={set('datumErwerb')} error={errors.datumErwerb} />
              </Field>
            </div>
            <Field label={t.jaehrlicheFahrleistungLabel} required>
              <SelectInput id="jaehrlicheFahrleistung" value={values.jaehrlicheFahrleistung}
                onChange={set('jaehrlicheFahrleistung')} options={t.fahrleistungOptions}
                placeholder={t.selectPlaceholder} error={errors.jaehrlicheFahrleistung} />
            </Field>
          </SectionCard>

          {/* ─── 3. Fahrzeugstatus ─── */}
          <SectionCard num={3} title={t.s3Title}>
            <Field label={t.fahrzeugStatusQuestion} optional={t.optional}>
              <RadioCards name="fahrzeugStatus" value={values.fahrzeugStatus}
                onChange={setFahrzeugStatus} cols={1}
                options={[
                  { value: 'neu', label: t.fahrzeugStatusNeu },
                  { value: 'wechsel', label: t.fahrzeugStatusWechsel },
                  { value: 'anderer', label: t.fahrzeugStatusAnderer },
                ]}
              />
            </Field>
            {values.fahrzeugStatus === 'anderer' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-4 border-l-2 border-blue-200">
                <Field label={t.nameFahrzeughalterLabel} required>
                  <TextInput id="nameFahrzeughalter" value={values.nameFahrzeughalter}
                    onChange={set('nameFahrzeughalter')} error={errors.nameFahrzeughalter} />
                </Field>
                <Field label={t.plzFahrzeughalterLabel} required>
                  <TextInput id="plzFahrzeughalter" value={values.plzFahrzeughalter}
                    onChange={set('plzFahrzeughalter')} maxLength={5} error={errors.plzFahrzeughalter} />
                </Field>
              </div>
            )}
          </SectionCard>

          {/* ─── 4. Abstellort ─── */}
          <SectionCard num={4} title={t.s4Title}>
            <Field label={t.abstellortLabel} optional={t.optional}>
              <RadioCards name="abstellort" value={values.abstellort}
                onChange={set('abstellort')} options={t.abstellortOptions} />
            </Field>
            <Field label={t.abstellortAbschliessbarLabel} optional={t.optional}>
              <RadioCards name="abstellortAbschliessbar" value={values.abstellortAbschliessbar}
                onChange={set('abstellortAbschliessbar')}
                options={[{ value: 'ja', label: t.ja }, { value: 'nein', label: t.nein }]}
              />
            </Field>
          </SectionCard>

          {/* ─── 5. Nutzung / Nutzerkreis ─── */}
          <SectionCard num={5} title={t.s5Title}>
            <Field label={t.nutzerkreisLabel} optional={t.optional} help={t.nutzerkreisHelp}>
              <RadioCards name="nutzerkreis" value={values.nutzerkreis}
                onChange={setNutzerkreis} options={t.nutzerkreisOptions} />
            </Field>
            {values.nutzerkreis === 'vn_partner' && (
              <div className="pl-4 border-l-2 border-blue-200">
                <Field label={t.partnerGeburtsdatumLabel} optional={t.optional}>
                  <TextInput id="partnerGeburtsdatum" type="date" value={values.partnerGeburtsdatum}
                    onChange={set('partnerGeburtsdatum')} />
                </Field>
              </div>
            )}
            {values.nutzerkreis === 'ohne_einschraenkung' && (
              <div className="pl-4 border-l-2 border-blue-200">
                <Field label={t.fahrerUnter23Label} optional={t.optional}>
                  <RadioCards name="fahrerUnter23" value={values.fahrerUnter23}
                    onChange={set('fahrerUnter23')}
                    options={[{ value: 'ja', label: t.ja }, { value: 'nein', label: t.nein }]}
                  />
                </Field>
              </div>
            )}
            {values.nutzerkreis === 'vn_haeusliche_gemeinschaft' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-4 border-l-2 border-blue-200">
                <Field label={t.geburtsdatumJuengsterFahrerLabel} optional={t.optional}>
                  <TextInput id="geburtsdatumJuengsterFahrer" type="date" value={values.geburtsdatumJuengsterFahrer}
                    onChange={set('geburtsdatumJuengsterFahrer')} />
                </Field>
                <Field label={t.geburtsdatumAeltesterFahrerLabel} optional={t.optional}>
                  <TextInput id="geburtsdatumAeltesterFahrer" type="date" value={values.geburtsdatumAeltesterFahrer}
                    onChange={set('geburtsdatumAeltesterFahrer')} />
                </Field>
              </div>
            )}
            <Field label={t.saisonLabel} optional={t.optional} help={t.saisonHelp}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">{t.saisonStartLabel}</p>
                  <TextInput id="saisonStart" type="date" value={values.saisonStart}
                    onChange={set('saisonStart')} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">{t.saisonEndeLabel}</p>
                  <TextInput id="saisonEnde" type="date" value={values.saisonEnde}
                    onChange={set('saisonEnde')} />
                </div>
              </div>
            </Field>
          </SectionCard>

          {/* ─── 6. Versicherungsdaten ─── */}
          <SectionCard num={6} title={t.s6Title}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={t.sfHaftpflichtLabel} optional={t.optional} help={t.sfHaftpflichtHelp}>
                <TextInput id="sfKlasseHaftpflicht" value={values.sfKlasseHaftpflicht}
                  onChange={set('sfKlasseHaftpflicht')} placeholder="z. B. SF 15" />
              </Field>
              <Field label={t.sfVollkaskoLabel} optional={t.optional} help={t.sfVollkaskoHelp}>
                <TextInput id="sfKlasseVollkasko" value={values.sfKlasseVollkasko}
                  onChange={set('sfKlasseVollkasko')} placeholder="z. B. SF 15" />
              </Field>
            </div>
            <Field label={t.vorvertragLabel} optional={t.optional} help={t.vorvertragHelp}>
              <RadioCards name="vorvertrag" value={values.vorvertrag}
                onChange={set('vorvertrag')} options={t.vorvertragOptions} />
            </Field>
            <Field label={t.gemeldeteSchaedenLabel} optional={t.optional}>
              <TextInput id="gemeldeteSchaeden" type="number" value={values.gemeldeteSchaeden}
                onChange={set('gemeldeteSchaeden')} placeholder="0" />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={t.beiWelchemVersichererLabel} optional={t.optional}>
                <TextInput id="beiWelchemVersicherer" value={values.beiWelchemVersicherer}
                  onChange={set('beiWelchemVersicherer')} placeholder={t.beiWelchemVersichererPlaceholder} />
              </Field>
              <Field label={t.wieLangeBeiVersichererLabel} optional={t.optional}>
                <TextInput id="wieLangeBeiVersicherer" value={values.wieLangeBeiVersicherer}
                  onChange={set('wieLangeBeiVersicherer')} placeholder={t.wieLangeBeiVersichererPlaceholder} />
              </Field>
            </div>
            <Field label={t.finanzierungLabel} optional={t.optional}>
              <RadioCards name="finanzierung" value={values.finanzierung}
                onChange={setFinanzierung} options={t.finanzierungOptions} />
            </Field>
            {values.finanzierung && values.finanzierung !== 'eigenfinanziert' && (
              <Field label={t.mehrwertLabel} optional={t.optional}>
                <TextInput id="mehrwert" type="number" value={values.mehrwert}
                  onChange={set('mehrwert')} placeholder={t.mehrwertPlaceholder} />
              </Field>
            )}
            <Field label={t.deckungLabel} optional={t.optional}>
              <RadioCards name="deckungHaftpflicht" value={values.deckungHaftpflicht}
                onChange={set('deckungHaftpflicht')} cols={1} options={t.deckungOptions} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={t.zahlungsartLabel} optional={t.optional}>
                <SelectInput id="zahlungsart" value={values.zahlungsart}
                  onChange={set('zahlungsart')} options={t.zahlungsartOptions}
                  placeholder={t.selectPlaceholder} />
              </Field>
              <Field label={t.zahlungsweiseLabel} optional={t.optional}>
                <RadioCards name="zahlungsweise" value={values.zahlungsweise}
                  onChange={set('zahlungsweise')} options={t.zahlungsweiseOptions} />
              </Field>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">{t.derzeitigerBeitragLabel}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label={t.beitragVollkaskoLabel} optional={t.optional}>
                  <TextInput id="beitragVollkasko" type="number" value={values.beitragVollkasko}
                    onChange={set('beitragVollkasko')} placeholder="0" />
                </Field>
                <Field label={t.beitragTeilkaskoLabel} optional={t.optional}>
                  <TextInput id="beitragTeilkasko" type="number" value={values.beitragTeilkasko}
                    onChange={set('beitragTeilkasko')} placeholder="0" />
                </Field>
                <Field label={t.beitragHaftpflichtLabel} optional={t.optional}>
                  <TextInput id="beitragHaftpflicht" type="number" value={values.beitragHaftpflicht}
                    onChange={set('beitragHaftpflicht')} placeholder="0" />
                </Field>
              </div>
            </div>
          </SectionCard>

          {/* ─── Absenden ─── */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">{t.submitNote}</p>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg text-sm transition-colors"
            >
              {loading ? t.submitLoading : t.submitButton}
            </button>
          </div>

        </form>

        {/* Footer */}
        <div className="mt-8 pb-6 text-center text-xs text-gray-400 space-x-4">
          <Link href="/impressum" className="hover:text-gray-600 hover:underline">Impressum & Datenschutz</Link>
          <span>© {new Date().getFullYear()} Thiele Finanz GmbH</span>
        </div>

      </div>
    </div>
  )
}
