import Link from 'next/link'

export const metadata = { title: 'Impressum – Thiele Finanz GmbH' }

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-blue-600 hover:underline mb-6 inline-block">← Zurück zum Formular</Link>

        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-6 text-sm text-gray-700 leading-relaxed">

          <h1 className="text-2xl font-bold text-gray-900">Impressum</h1>

          <section>
            <h2 className="font-semibold text-gray-900 mb-1">Angaben gemäß § 5 TMG</h2>
            <p>
              Thiele Finanz Gesellschaft mit beschränkter Haftung<br />
              Eisenacher Straße 19<br />
              D-12109 Berlin
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-1">Vertretungsberechtigter Geschäftsführer</h2>
            <p>Michael Thiele</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-1">Kontakt</h2>
            <p>
              Telefon: 030 / 37447271-0<br />
              Fax: 030 / 37447271-9<br />
              E-Mail: <a href="mailto:info@tfgmbh.de" className="text-blue-600 hover:underline">info@tfgmbh.de</a>
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-1">Handelsregister</h2>
            <p>
              Registergericht: Amtsgericht Berlin<br />
              Registernummer: HRB 149507 B<br />
              Steuernummer: 29/460/01874
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-1">Zulassung als Versicherungsmakler</h2>
            <p>
              Eingetragen als Versicherungsmakler gemäß § 34d Abs. 1 GewO.<br />
              Vermittlerregisternummer: D-7ZGL-XQU8I-13
            </p>
            <p className="mt-2">
              Zuständige Aufsichtsbehörde:<br />
              Industrie- und Handelskammer Berlin (IHK)<br />
              Fasanenstraße 85, 10623 Berlin<br />
              Telefon: 030 / 31510-1
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-1">Inhaltlich Verantwortlicher</h2>
            <p>Michael Thiele (Anschrift wie oben)</p>
          </section>

          <section className="border-t border-gray-100 pt-6">
            <h1 className="text-xl font-bold text-gray-900 mb-4">Datenschutzhinweis</h1>

            <div className="space-y-4">
              <div>
                <h2 className="font-semibold text-gray-900 mb-1">Verantwortlicher</h2>
                <p>
                  Thiele Finanz GmbH, Eisenacher Straße 19, D-12109 Berlin<br />
                  E-Mail: <a href="mailto:info@tfgmbh.de" className="text-blue-600 hover:underline">info@tfgmbh.de</a>
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 mb-1">Zweck und Rechtsgrundlage</h2>
                <p>
                  Die über dieses Formular erhobenen Daten (Name, Adresse, Fahrzeug- und Versicherungsdaten) werden ausschließlich zur Erstellung eines individuellen KFZ-Versicherungsangebots verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen).
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 mb-1">Speicherdauer</h2>
                <p>
                  Ihre Daten werden nach Abschluss der Bearbeitung Ihrer Anfrage gelöscht, spätestens jedoch nach 12 Monaten.
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 mb-1">Datenweitergabe</h2>
                <p>
                  Ihre Daten werden nicht an Dritte weitergegeben. Die Daten werden auf Servern von Supabase (Supabase Inc.) in Frankfurt am Main (EU) gespeichert. Mit Supabase besteht ein Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO.
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 mb-1">Ihre Rechte</h2>
                <p>
                  Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18) sowie Widerspruch (Art. 21 DSGVO). Zur Wahrnehmung Ihrer Rechte wenden Sie sich an: <a href="mailto:info@tfgmbh.de" className="text-blue-600 hover:underline">info@tfgmbh.de</a>
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 mb-1">Beschwerderecht</h2>
                <p>
                  Sie haben das Recht, sich bei der zuständigen Datenschutzaufsichtsbehörde zu beschweren. Für Berlin: Berliner Beauftragte für Datenschutz und Informationsfreiheit, Friedrichstr. 219, 10969 Berlin.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
