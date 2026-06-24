# NAFI-Felder / Formular-Spezifikation (KFZ-Anfrage)
# Reihenfolge spiegelt das Papierformular des Maklers = NAFI-Eingabereihenfolge.

## 1. Personenbezogene Daten
- E-Mail des VN            (E-Mail)
- Vorname                  (Text, Pflicht)
- Name                     (Text, Pflicht)
- Straße                   (Text, Pflicht)
- PLZ / Wohnort            (Text, Pflicht)   # ggf. in PLZ + Ort aufteilen
- Geburtsdatum             (Datum, Pflicht)

## 2. Fahrzeugdaten
- Hersteller-Nr. (HSN)     (Text, 4 Ziffern, Pflicht)
- Typschlüssel-Nr. (TSN)   (Text, Pflicht)
- Fahrzeug-Kategorie       (Text/Auswahl)
- Hersteller               (Text)
- Datum Erstzulassung      (Datum)
- Datum Erwerb             (Datum)
- Neuwert                  (Zahl, €)
- Anzahl Türen             (Auswahl: 2/3/4/5)
- jährl. Fahrleistung (km) (Auswahl: 3000/6000/9000/12000/15000/18000/21000)

## 3. Das Fahrzeug (Status) — eine Auswahl
- soll auf Ihren Namen neu zugelassen werden (Kauf oder Halterwechsel)
- ist bereits auf Ihren Namen zugelassen/versichert (Versicherungswechsel)
- wird zugelassen auf: Name Fzg.-Halter (Text) + PLZ Fzg.-Halter (Text)

## 4. Wo steht das Fzg. über Nacht? — eine Auswahl
- Einzel-/Doppelgarage | gesichertes Grundstück | öffentl. Tiefgarage
- Tiefgarage in MFH | private Einfahrt | Carport
- Tiefgarage mit Gitterbox | öffentl. Straße/Parkplatz
- Ist der Abstellort abschließbar? (ja/nein)

## 5. Nutzung / Nutzerkreis
- Bei gewerbl. Benutzung: Zweck der gewerblichen Fahrten   (Text, optional)
- Wo ist Ihr Erstfahrzeug versichert?                      (Text, optional)
- Wer ist Halter des Erstfahrzeugs?                        (Text, optional)
- Nutzerkreis (eine Auswahl): nur der VN | VN ist Hauptnutzer | VN + Partner |
  ohne Einschränkung | nur der Partner | VN + häusl. Gemeinschaft
- Saisonkennzeichen: Start (Datum) + Ende (Datum)          (optional)

## 6. Daten zur Versicherung
- SF-Klasse Haftpflicht                                    (Text)
- Vorvertrag (Auswahl): durch Vorversicherer | VN gekündigt   (optional)
- SF-Klasse Vollkasko                                      (Text)
- Gemeldete Schäden in den letzten 2 Jahren                (Zahl)
- Versicherung für dieses Fzg. in den letzten 7 Jahren auf Ihren Namen? (ja/nein)
- Bei welchem Versicherer?                                 (Text)
- Wie lange beim aktuellen Versicherer?                    (Text)
- Finanzierung (eine Auswahl): Eigenfinanziert | Kredit | Leasing
    + Mehrwert € (Zahl, optional)
- Deckung Haftpflicht (eine Auswahl): Haftpflicht | Haftpflicht mit Teilkasko | Haftpflicht mit Teilkasko und Vollkasko
- Zahlungsart (eine Auswahl): jährl. | ½-jährl. | ¼-jährl. | monatlich
    + Rechnung | Abbuchung
- Derzeitiger Beitrag: Vollkasko (Zahl) | Teilkasko (Zahl) | Haftpflicht (Zahl)
    + Gesellschaft (Text)
