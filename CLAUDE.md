# Projekt: KFZ-Anfrageformular für Versicherungsmakler

## Kontext
- Auftraggeber: selbstständiger Versicherungsmakler (GmbH, 2 Partner, ~1200 Kunden, ~800 aktiv).
- Ziel Phase 1: Web-Formular, über das Kunden per Link ihre KFZ-Daten eingeben.
  Der Makler nutzt die Daten anschließend, um in NAFI (KFZ-Tarifrechner) Tarife zu rechnen.
- NAFI-Eingabe erfolgt MANUELL. Das Formular muss die Daten daher in der gleichen
  Feld-Reihenfolge wie die NAFI-Eingabemaske ausgeben, damit der Makler schnell abtippen kann.
  (Feldliste/Reihenfolge: siehe docs/nafi-felder.md – noch zu ergänzen.)

## Tech-Stack
- Next.js (App Router), TypeScript
- Supabase (Region EU/Frankfurt) für Datenbank + Auth (nur Makler-Login fürs Admin-View)
- Hosting: <noch entscheiden – Vercel oder Hetzner>

## Datenschutz / DSGVO (immer beachten)
- Es werden personenbezogene Daten verarbeitet. Datensparsamkeit: nur Felder, die NAFI braucht.
- Datenspeicherung ausschließlich in EU-Region.
- Datenschutzhinweis + Einwilligung direkt am Formular.
- Übertragung nur über HTTPS. Löschkonzept: Einträge nach Übertragung/Frist automatisch löschen.
- NIEMALS echte Kundendaten committen, loggen oder in Beispiele schreiben. Nur anonymisierte Testdaten.
- Secrets/Keys nur über Umgebungsvariablen (.env), niemals ins Repo.

## Arbeitsweise
- Kleine, überprüfbare Schritte. Nach jedem Schritt den nächsten vorschlagen.
- Bei Unklarheit nachfragen statt raten.
- Technische Entscheidungen verständlich erklären (ich bin kein Profi-Entwickler).
- Auf Deutsch antworten.

## Status / To-do
- [ ] NAFI-Feldliste vom Makler einholen → docs/nafi-felder.md
- [ ] Formularfelder festlegen
- [ ] Formular als Prototyp bauen
- [ ] Supabase-Speicherung + Admin-View
- [ ] Datenschutzhinweis + Löschkonzept
- [ ] Hosting + Deploy
