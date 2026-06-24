export type Lang = 'de' | 'tr'

export interface T {
  langToggle: string

  // Seite
  pageTitle: string
  pageSubtitle: string
  submitButton: string
  submitLoading: string
  submitNote: string
  newRequestButton: string
  errSubmit: string

  // Fehler-Banner
  errBannerTitle: string
  errBannerText: string

  // Zusammenfassung
  successTitle: string
  successText: string
  summaryTitle: string
  summarySubtitle: string
  copyButton: string
  copiedButton: string
  backButton: string

  // Allgemein
  optional: string
  ja: string
  nein: string
  selectPlaceholder: string

  // Abschnitt-Titel
  s1Title: string
  s2Title: string
  s3Title: string
  s4Title: string
  s5Title: string
  s6Title: string

  // Abschnitt 1
  emailLabel: string
  vornameLabel: string
  nameLabel: string
  strasseLabel: string
  strassePlaceholder: string
  plzLabel: string
  ortLabel: string
  ortPlaceholder: string
  geburtsdatumLabel: string

  // Abschnitt 2
  hsnLabel: string
  hsnHelp: string
  hsnPlaceholder: string
  tsnLabel: string
  tsnHelp: string
  tsnPlaceholder: string
  fahrzeugKategorieLabel: string
  fahrzeugKategorieOptions: { value: string; label: string }[]
  herstellerLabel: string
  herstellerHelp: string
  herstellerPlaceholder: string
  datumErstzulassungLabel: string
  datumErwerbLabel: string
  neuwertLabel: string
  neuwertPlaceholder: string
  jaehrlicheFahrleistungLabel: string
  fahrleistungOptions: { value: string; label: string }[]

  // Abschnitt 3
  fahrzeugStatusQuestion: string
  fahrzeugStatusNeu: string
  fahrzeugStatusWechsel: string
  fahrzeugStatusAnderer: string
  nameFahrzeughalterLabel: string
  plzFahrzeughalterLabel: string

  // Abschnitt 4
  abstellortLabel: string
  abstellortOptions: { value: string; label: string }[]
  abstellortAbschliessbarLabel: string

  // Abschnitt 5
  nutzerkreisLabel: string
  nutzerkreisHelp: string
  nutzerkreisOptions: { value: string; label: string }[]
  saisonLabel: string
  saisonHelp: string
  saisonStartLabel: string
  saisonEndeLabel: string

  // Abschnitt 6
  sfHaftpflichtLabel: string
  sfHaftpflichtHelp: string
  sfVollkaskoLabel: string
  sfVollkaskoHelp: string
  vorvertragLabel: string
  vorvertragHelp: string
  vorvertragOptions: { value: string; label: string }[]
  gemeldeteSchaedenLabel: string
  beiWelchemVersichererLabel: string
  beiWelchemVersichererPlaceholder: string
  wieLangeBeiVersichererLabel: string
  wieLangeBeiVersichererPlaceholder: string
  finanzierungLabel: string
  finanzierungOptions: { value: string; label: string }[]
  mehrwertLabel: string
  mehrwertPlaceholder: string
  deckungLabel: string
  deckungOptions: { value: string; label: string }[]
  zahlungsartLabel: string
  zahlungsartOptions: { value: string; label: string }[]
  zahlungsweiseLabel: string
  zahlungsweiseOptions: { value: string; label: string }[]
  derzeitigerBeitragLabel: string
  beitragVollkaskoLabel: string
  beitragTeilkaskoLabel: string
  beitragHaftpflichtLabel: string

  // Validierungsfehler
  errVorname: string
  errName: string
  errStrasse: string
  errPlz: string
  errPlzFormat: string
  errOrt: string
  errGeburtsdatum: string
  errHsn: string
  errHsnFormat: string
  errTsn: string
  errNameFahrzeughalter: string
  errPlzFahrzeughalter: string
  errPlzFahrzeughalterFormat: string
  errEmail: string

  // Zusammenfassung – Zeilen
  sumDateLabel: string
  sumSection1: string
  sumSection2: string
  sumSection3: string
  sumSection4: string
  sumSection5: string
  sumSection6: string
  sumEmail: string
  sumVorname: string
  sumName: string
  sumStrasse: string
  sumPlz: string
  sumOrt: string
  sumGeburtsdatum: string
  sumHsn: string
  sumTsn: string
  sumFahrzeugKategorie: string
  sumHersteller: string
  sumErstzulassung: string
  sumErwerb: string
  sumNeuwert: string
  sumFahrleistung: string
  sumFahrzeugStatus: string
  sumNameFahrzeughalter: string
  sumPlzFahrzeughalter: string
  sumAbstellort: string
  sumAbschliessbar: string
  sumNutzerkreis: string
  sumSaisonStart: string
  sumSaisonEnde: string
  sumSfHaftpflicht: string
  sumVorvertrag: string
  sumSfVollkasko: string
  sumSchaeden: string
  sumBeiVersicherer: string
  sumWieLange: string
  sumFinanzierung: string
  sumMehrwert: string
  sumDeckung: string
  sumZahlungsart: string
  sumZahlungsweise: string
  sumDerzeitigerBeitrag: string
  sumVollkasko: string
  sumTeilkasko: string
  sumHaftpflicht: string

  // Zusammenfassung – Werte
  sumStatusNeu: string
  sumStatusWechsel: string
  sumStatusAnderer: string
  sumVorvertragVorversicherer: string
  sumVorvertragVnGekuendigt: string
  sumFahrleistungUnbegrenzt: string
}

// ─── Deutsch ──────────────────────────────────────────────────────────────────

const de: T = {
  langToggle: '🇹🇷 Türkçe',

  pageTitle: 'KFZ-Anfrage',
  pageSubtitle: 'Felder mit * sind Pflichtfelder. Alle anderen sind freiwillig, helfen aber bei einem besseren Angebot.',
  submitButton: 'Angaben absenden →',
  submitLoading: 'Wird gesendet …',
  newRequestButton: 'Neue Anfrage stellen',
  errSubmit: 'Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
  submitNote: 'Mit dem Absenden bestätigen Sie, dass Ihre Angaben korrekt sind. Die Daten werden ausschließlich zur Erstellung eines Versicherungsangebots verwendet und nicht an Dritte weitergegeben.',

  errBannerTitle: 'Bitte Pflichtfelder ausfüllen',
  errBannerText: 'Einige Pflichtfelder fehlen oder enthalten ungültige Werte. Bitte prüfen Sie die rot markierten Felder.',

  successTitle: 'Vielen Dank!',
  successText: 'Ihre Angaben wurden erfolgreich übermittelt. Wir melden uns bald bei Ihnen.',
  summaryTitle: 'Ihre Angaben – Übersicht',
  summarySubtitle: 'Reihenfolge entspricht der NAFI-Eingabemaske.',
  copyButton: '📋 Alle Angaben kopieren',
  copiedButton: '✓ In Zwischenablage kopiert!',
  backButton: '← Formular bearbeiten',

  optional: 'optional',
  ja: 'Ja',
  nein: 'Nein',
  selectPlaceholder: 'Bitte wählen …',

  s1Title: 'Personenbezogene Daten',
  s2Title: 'Fahrzeugdaten',
  s3Title: 'Das Fahrzeug (Status)',
  s4Title: 'Wo steht das Fahrzeug über Nacht?',
  s5Title: 'Nutzung / Nutzerkreis',
  s6Title: 'Daten zur Versicherung',

  emailLabel: 'E-Mail',
  vornameLabel: 'Vorname',
  nameLabel: 'Nachname',
  strasseLabel: 'Straße und Hausnummer',
  strassePlaceholder: 'Musterstraße 1',
  plzLabel: 'PLZ',
  ortLabel: 'Ort',
  ortPlaceholder: 'Musterstadt',
  geburtsdatumLabel: 'Geburtsdatum',

  hsnLabel: 'Hersteller-Nr. (HSN)',
  hsnHelp: '4-stellige Zahl aus der Zulassungsbescheinigung Teil I, Feld 2.1',
  hsnPlaceholder: 'z. B. 0603',
  tsnLabel: 'Typschlüssel-Nr. (TSN)',
  tsnHelp: '3 Zeichen aus der Zulassungsbescheinigung Teil I, Feld 2.2',
  tsnPlaceholder: 'z. B. AAA',
  fahrzeugKategorieLabel: 'Fahrzeug-Kategorie',
  fahrzeugKategorieOptions: [
    { value: 'PKW', label: 'PKW' },
    { value: 'Kombi', label: 'Kombi' },
    { value: 'SUV', label: 'SUV / Geländewagen' },
    { value: 'Transporter', label: 'Transporter' },
    { value: 'Motorrad', label: 'Motorrad' },
    { value: 'Roller', label: 'Roller / Moped' },
    { value: 'Sonstiges', label: 'Sonstiges' },
  ],
  herstellerLabel: 'Hersteller',
  herstellerHelp: 'z. B. VW, BMW, Mercedes',
  herstellerPlaceholder: 'z. B. VW',
  datumErstzulassungLabel: 'Datum Erstzulassung',
  datumErwerbLabel: 'Datum Erwerb',
  neuwertLabel: 'Neuwert (€)',
  neuwertPlaceholder: 'z. B. 25000',
  jaehrlicheFahrleistungLabel: 'Jährliche Fahrleistung',
  fahrleistungOptions: [
    ...[3000, 6000, 9000, 12000, 15000, 18000, 21000].map(n => ({
      value: String(n),
      label: `${n.toLocaleString('de-DE')} km`,
    })),
    { value: 'unbegrenzt', label: 'Unbegrenzt' },
  ],

  fahrzeugStatusQuestion: 'Was trifft auf Ihr Fahrzeug zu?',
  fahrzeugStatusNeu: 'Soll auf Ihren Namen neu zugelassen werden (Kauf oder Halterwechsel)',
  fahrzeugStatusWechsel: 'Ist bereits auf Ihren Namen zugelassen / versichert (Versicherungswechsel)',
  fahrzeugStatusAnderer: 'Wird zugelassen auf einen anderen Namen',
  nameFahrzeughalterLabel: 'Name des Fahrzeughalters',
  plzFahrzeughalterLabel: 'PLZ des Fahrzeughalters',

  abstellortLabel: 'Abstellort',
  abstellortOptions: [
    { value: 'einzel_doppelgarage', label: 'Einzel-/Doppelgarage' },
    { value: 'gesichertes_grundstueck', label: 'Gesichertes Grundstück' },
    { value: 'oeffentl_tiefgarage', label: 'Öffentl. Tiefgarage' },
    { value: 'tiefgarage_mfh', label: 'Tiefgarage in MFH' },
    { value: 'private_einfahrt', label: 'Private Einfahrt' },
    { value: 'carport', label: 'Carport' },
    { value: 'tiefgarage_gitterbox', label: 'Tiefgarage mit Gitterbox' },
    { value: 'oeffentl_strasse', label: 'Öffentl. Straße / Parkplatz' },
  ],
  abstellortAbschliessbarLabel: 'Ist der Abstellort abschließbar?',

  nutzerkreisLabel: 'Nutzerkreis',
  nutzerkreisHelp: 'VN = Versicherungsnehmer (die Person, die den Vertrag abschließt)',
  nutzerkreisOptions: [
    { value: 'nur_vn', label: 'Nur der VN' },
    { value: 'vn_hauptnutzer', label: 'VN ist Hauptnutzer' },
    { value: 'vn_partner', label: 'VN + Partner' },
    { value: 'ohne_einschraenkung', label: 'Ohne Einschränkung' },
    { value: 'vn_haeusliche_gemeinschaft', label: 'VN + häusl. Gemeinschaft' },
  ],
  saisonLabel: 'Saisonkennzeichen',
  saisonHelp: 'Nur ausfüllen, wenn Sie ein Saisonkennzeichen haben.',
  saisonStartLabel: 'Start',
  saisonEndeLabel: 'Ende',

  sfHaftpflichtLabel: 'SF-Klasse Haftpflicht',
  sfHaftpflichtHelp: 'Schadensfreiheitsklasse – steht auf Ihrer letzten Beitragsrechnung oder Versicherungsmitteilung. Beispiele: SF 0, SF 1/2, SF 5, SF 15. Erstzulassung oder neuer Fahrer: SF 0.',
  sfVollkaskoLabel: 'SF-Klasse Vollkasko',
  sfVollkaskoHelp: 'Oft identisch mit der SF-Klasse Haftpflicht.',
  vorvertragLabel: 'Vorvertrag',
  vorvertragHelp: 'Wurde der bisherige Vertrag gekündigt, und wenn ja – von wem?',
  vorvertragOptions: [
    { value: 'vorversicherer', label: 'Durch Vorversicherer (Versicherer hat gekündigt)' },
    { value: 'vn_gekuendigt', label: 'Versicherungsnehmer hat selbst gekündigt' },
  ],
  gemeldeteSchaedenLabel: 'Gemeldete Schäden in den letzten 2 Jahren',
  beiWelchemVersichererLabel: 'Bei welchem Versicherer?',
  beiWelchemVersichererPlaceholder: 'z. B. Allianz',
  wieLangeBeiVersichererLabel: 'Wie lange beim aktuellen Versicherer?',
  wieLangeBeiVersichererPlaceholder: 'z. B. 5 Jahre',
  finanzierungLabel: 'Finanzierung',
  finanzierungOptions: [
    { value: 'eigenfinanziert', label: 'Eigenfinanziert' },
    { value: 'kredit', label: 'Kredit' },
    { value: 'leasing', label: 'Leasing' },
  ],
  mehrwertLabel: 'Mehrwert (€)',
  mehrwertPlaceholder: 'z. B. 5000',
  deckungLabel: 'Gewünschte Deckung',
  deckungOptions: [
    { value: 'haftpflicht', label: 'Haftpflicht' },
    { value: 'haftpflicht_teilkasko', label: 'Haftpflicht + Teilkasko' },
    { value: 'haftpflicht_teilkasko_vollkasko', label: 'Haftpflicht + Teilkasko + Vollkasko' },
  ],
  zahlungsartLabel: 'Zahlungsart',
  zahlungsartOptions: [
    { value: 'jaehrlich', label: 'Jährlich' },
    { value: 'halbjaehrlich', label: 'Halbjährlich' },
    { value: 'vierteljaehrlich', label: 'Vierteljährlich' },
    { value: 'monatlich', label: 'Monatlich' },
  ],
  zahlungsweiseLabel: 'Zahlungsweise',
  zahlungsweiseOptions: [
    { value: 'rechnung', label: 'Rechnung' },
    { value: 'abbuchung', label: 'Abbuchung' },
  ],
  derzeitigerBeitragLabel: 'Derzeitiger Beitrag',
  beitragVollkaskoLabel: 'Vollkasko (€)',
  beitragTeilkaskoLabel: 'Teilkasko (€)',
  beitragHaftpflichtLabel: 'Haftpflicht (€)',

  errVorname: 'Bitte Vornamen eingeben.',
  errName: 'Bitte Nachnamen eingeben.',
  errStrasse: 'Bitte Straße und Hausnummer eingeben.',
  errPlz: 'Bitte PLZ eingeben.',
  errPlzFormat: 'PLZ muss 5 Ziffern haben.',
  errOrt: 'Bitte Ort eingeben.',
  errGeburtsdatum: 'Bitte Geburtsdatum angeben.',
  errHsn: 'Bitte HSN eingeben.',
  errHsnFormat: 'HSN besteht aus genau 4 Ziffern.',
  errTsn: 'Bitte TSN eingeben.',
  errNameFahrzeughalter: 'Bitte Namen des Fahrzeughalters eingeben.',
  errPlzFahrzeughalter: 'Bitte PLZ des Fahrzeughalters eingeben.',
  errPlzFahrzeughalterFormat: 'PLZ muss 5 Ziffern haben.',
  errEmail: 'Bitte gültige E-Mail-Adresse eingeben.',

  sumDateLabel: 'Datum',
  sumSection1: '1. PERSONENBEZOGENE DATEN',
  sumSection2: '2. FAHRZEUGDATEN',
  sumSection3: '3. FAHRZEUG-STATUS',
  sumSection4: '4. ABSTELLORT',
  sumSection5: '5. NUTZUNG / NUTZERKREIS',
  sumSection6: '6. DATEN ZUR VERSICHERUNG',
  sumEmail: 'E-Mail:',
  sumVorname: 'Vorname:',
  sumName: 'Name:',
  sumStrasse: 'Straße:',
  sumPlz: 'PLZ:',
  sumOrt: 'Ort:',
  sumGeburtsdatum: 'Geburtsdatum:',
  sumHsn: 'Hersteller-Nr. (HSN):',
  sumTsn: 'Typschlüssel-Nr. (TSN):',
  sumFahrzeugKategorie: 'Fahrzeug-Kategorie:',
  sumHersteller: 'Hersteller:',
  sumErstzulassung: 'Datum Erstzulassung:',
  sumErwerb: 'Datum Erwerb:',
  sumNeuwert: 'Neuwert (€):',
  sumFahrleistung: 'Jährl. Fahrleistung:',
  sumFahrzeugStatus: 'Status:',
  sumNameFahrzeughalter: 'Name Fahrzeughalter:',
  sumPlzFahrzeughalter: 'PLZ Fahrzeughalter:',
  sumAbstellort: 'Abstellort:',
  sumAbschliessbar: 'Abschließbar:',
  sumNutzerkreis: 'Nutzerkreis:',
  sumSaisonStart: 'Saisonkennzeichen Start:',
  sumSaisonEnde: 'Saisonkennzeichen Ende:',
  sumSfHaftpflicht: 'SF-Klasse Haftpflicht:',
  sumVorvertrag: 'Vorvertrag:',
  sumSfVollkasko: 'SF-Klasse Vollkasko:',
  sumSchaeden: 'Gemeldete Schäden (2 J.):',
  sumBeiVersicherer: 'Bei welchem Versicherer:',
  sumWieLange: 'Wie lange beim Versicherer:',
  sumFinanzierung: 'Finanzierung:',
  sumMehrwert: 'Mehrwert (€):',
  sumDeckung: 'Gewünschte Deckung:',
  sumZahlungsart: 'Zahlungsart:',
  sumZahlungsweise: 'Zahlungsweise:',
  sumDerzeitigerBeitrag: 'Derzeitiger Beitrag:',
  sumVollkasko: '  Vollkasko:',
  sumTeilkasko: '  Teilkasko:',
  sumHaftpflicht: '  Haftpflicht:',

  sumStatusNeu: 'Neu zugelassen (Kauf/Halterwechsel)',
  sumStatusWechsel: 'Bereits auf eigenen Namen zugelassen (Versicherungswechsel)',
  sumStatusAnderer: 'Wird auf anderen Namen zugelassen',
  sumVorvertragVorversicherer: 'Durch Vorversicherer',
  sumVorvertragVnGekuendigt: 'Versicherungsnehmer gekündigt',
  sumFahrleistungUnbegrenzt: 'Unbegrenzt',
}

// ─── Türkisch ─────────────────────────────────────────────────────────────────

const tr: T = {
  langToggle: '🇩🇪 Deutsch',

  pageTitle: 'Araç Sigortası Başvurusu',
  pageSubtitle: '* ile işaretli alanlar zorunludur. Diğer alanlar isteğe bağlıdır, ancak daha iyi bir teklif almanıza yardımcı olur.',
  submitButton: 'Bilgileri Gönder →',
  submitLoading: 'Gönderiliyor …',
  newRequestButton: 'Yeni talep oluştur',
  errSubmit: 'Talep gönderilemedi. Lütfen tekrar deneyin.',
  submitNote: 'Göndererek bilgilerinizin doğru olduğunu onaylıyorsunuz. Verileriniz yalnızca sigorta teklifinizi hazırlamak için kullanılacak ve üçüncü şahıslarla paylaşılmayacaktır.',

  errBannerTitle: 'Lütfen zorunlu alanları doldurun',
  errBannerText: 'Bazı zorunlu alanlar eksik veya hatalı. Lütfen kırmızı ile işaretli alanları kontrol edin.',

  successTitle: 'Teşekkürler!',
  successText: 'Bilgileriniz başarıyla iletildi. Yakında sizinle iletişime geçeceğiz.',
  summaryTitle: 'Bilgileriniz – Özet',
  summarySubtitle: 'Sıralama NAFI giriş ekranına uygundur.',
  copyButton: '📋 Tüm Bilgileri Kopyala',
  copiedButton: '✓ Panoya kopyalandı!',
  backButton: '← Formu Düzenle',

  optional: 'isteğe bağlı',
  ja: 'Evet',
  nein: 'Hayır',
  selectPlaceholder: 'Lütfen seçin …',

  s1Title: 'Kişisel Bilgiler',
  s2Title: 'Araç Bilgileri',
  s3Title: 'Araç Durumu',
  s4Title: 'Araç Gece Nerede Duruyor?',
  s5Title: 'Kullanım / Sürücü Kapsamı',
  s6Title: 'Sigorta Bilgileri',

  emailLabel: 'E-posta',
  vornameLabel: 'Ad',
  nameLabel: 'Soyad',
  strasseLabel: 'Sokak ve Bina Numarası',
  strassePlaceholder: 'Örn. Musterstraße 1',
  plzLabel: 'Posta Kodu',
  ortLabel: 'Şehir / İlçe',
  ortPlaceholder: 'Örn. München',
  geburtsdatumLabel: 'Doğum Tarihi',

  hsnLabel: 'Üretici Kodu (HSN)',
  hsnHelp: 'Araç ruhsatınızdaki (Zulassungsbescheinigung Teil I) 2.1 numaralı alandaki 4 haneli sayı',
  hsnPlaceholder: 'Örn. 0603',
  tsnLabel: 'Tip Kodu (TSN)',
  tsnHelp: 'Araç ruhsatınızdaki (Zulassungsbescheinigung Teil I) 2.2 numaralı alandaki 3 karakter',
  tsnPlaceholder: 'Örn. AAA',
  fahrzeugKategorieLabel: 'Araç Kategorisi',
  fahrzeugKategorieOptions: [
    { value: 'PKW', label: 'Binek Otomobil (PKW)' },
    { value: 'Kombi', label: 'Kombi' },
    { value: 'SUV', label: 'SUV / Arazi Aracı' },
    { value: 'Transporter', label: 'Minibüs / Panelvan' },
    { value: 'Motorrad', label: 'Motosiklet' },
    { value: 'Roller', label: 'Scooter / Moped' },
    { value: 'Sonstiges', label: 'Diğer' },
  ],
  herstellerLabel: 'Araç Markası',
  herstellerHelp: 'Örn. VW, BMW, Mercedes',
  herstellerPlaceholder: 'Örn. VW',
  datumErstzulassungLabel: 'İlk Tescil Tarihi',
  datumErwerbLabel: 'Alım Tarihi',
  neuwertLabel: 'Yeni Değer (€)',
  neuwertPlaceholder: 'Örn. 25000',
  jaehrlicheFahrleistungLabel: 'Yıllık Kilometre',
  fahrleistungOptions: [
    ...[3000, 6000, 9000, 12000, 15000, 18000, 21000].map(n => ({
      value: String(n),
      label: `${n.toLocaleString('de-DE')} km`,
    })),
    { value: 'unbegrenzt', label: 'Sınırsız' },
  ],

  fahrzeugStatusQuestion: 'Aracınız için hangisi geçerlidir?',
  fahrzeugStatusNeu: 'Adınıza yeni tescil edilecek (Satın alma veya sahip değişikliği)',
  fahrzeugStatusWechsel: 'Zaten adınıza tescilli / sigortalı (Sigorta şirketi değişikliği)',
  fahrzeugStatusAnderer: 'Başka bir kişi adına tescil edilecek',
  nameFahrzeughalterLabel: 'Araç Sahibinin Adı Soyadı',
  plzFahrzeughalterLabel: 'Araç Sahibinin Posta Kodu',

  abstellortLabel: 'Park Yeri',
  abstellortOptions: [
    { value: 'einzel_doppelgarage', label: 'Tek / Çift Kapalı Garaj' },
    { value: 'gesichertes_grundstueck', label: 'Güvenlikli Özel Alan' },
    { value: 'oeffentl_tiefgarage', label: 'Halka Açık Yeraltı Otoparkı' },
    { value: 'tiefgarage_mfh', label: 'Apartman Yeraltı Otoparkı' },
    { value: 'private_einfahrt', label: 'Özel Araç Girişi / Avlu' },
    { value: 'carport', label: 'Carport / Araba Gölgeliği' },
    { value: 'tiefgarage_gitterbox', label: 'Kafesli Yeraltı Otoparkı' },
    { value: 'oeffentl_strasse', label: 'Açık Sokak / Halka Açık Otopark' },
  ],
  abstellortAbschliessbarLabel: 'Park yeri kilitlenebilir mi?',

  nutzerkreisLabel: 'Sürücü Kapsamı',
  nutzerkreisHelp: 'Sigortalı = Sözleşmeyi imzalayan kişi (siz)',
  nutzerkreisOptions: [
    { value: 'nur_vn', label: 'Yalnızca Sigortalı' },
    { value: 'vn_hauptnutzer', label: 'Sigortalı Ana Sürücü' },
    { value: 'vn_partner', label: 'Sigortalı + Eş / Partner' },
    { value: 'ohne_einschraenkung', label: 'Sınırsız (Herkes)' },
    { value: 'vn_haeusliche_gemeinschaft', label: 'Sigortalı + Aynı Evdekiler' },
  ],
  saisonLabel: 'Mevsimlik Plaka',
  saisonHelp: 'Yalnızca mevsimlik plakanız varsa doldurun.',
  saisonStartLabel: 'Başlangıç',
  saisonEndeLabel: 'Bitiş',

  sfHaftpflichtLabel: 'Hasarsızlık Sınıfı (Mali Sorumluluk)',
  sfHaftpflichtHelp: 'Hasarsızlık sınıfınız son prim faturanızda veya sigorta bildiriminizde yazar. Örnekler: SF 0, SF 1/2, SF 5, SF 15. İlk araç veya yeni sürücü ise: SF 0.',
  sfVollkaskoLabel: 'Hasarsızlık Sınıfı (Tam Kasko)',
  sfVollkaskoHelp: 'Çoğunlukla Mali Sorumluluk hasarsızlık sınıfıyla aynıdır.',
  vorvertragLabel: 'Önceki Sözleşme',
  vorvertragHelp: 'Önceki sigorta sözleşmesi feshedildi mi? Feshedildiyse kim tarafından?',
  vorvertragOptions: [
    { value: 'vorversicherer', label: 'Önceki sigortacı tarafından feshedildi (Sigorta şirketi iptal etti)' },
    { value: 'vn_gekuendigt', label: 'Sigortalı kendisi feshetti' },
  ],
  gemeldeteSchaedenLabel: 'Son 2 Yılda Bildirilen Hasar Sayısı',
  beiWelchemVersichererLabel: 'Hangi Sigorta Şirketinde?',
  beiWelchemVersichererPlaceholder: 'Örn. Allianz',
  wieLangeBeiVersichererLabel: 'Mevcut Sigortacıda Ne Kadar Süredir?',
  wieLangeBeiVersichererPlaceholder: 'Örn. 5 yıl',
  finanzierungLabel: 'Finansman',
  finanzierungOptions: [
    { value: 'eigenfinanziert', label: 'Öz Finansman (Nakit)' },
    { value: 'kredit', label: 'Kredi' },
    { value: 'leasing', label: 'Leasing' },
  ],
  mehrwertLabel: 'Ek Değer (€)',
  mehrwertPlaceholder: 'Örn. 5000',
  deckungLabel: 'İstenen Sigorta Kapsamı',
  deckungOptions: [
    { value: 'haftpflicht', label: 'Mali Sorumluluk (Zorunlu)' },
    { value: 'haftpflicht_teilkasko', label: 'Mali Sorumluluk + Dar Kasko' },
    { value: 'haftpflicht_teilkasko_vollkasko', label: 'Mali Sorumluluk + Dar Kasko + Tam Kasko' },
  ],
  zahlungsartLabel: 'Ödeme Sıklığı',
  zahlungsartOptions: [
    { value: 'jaehrlich', label: 'Yıllık' },
    { value: 'halbjaehrlich', label: '6 Aylık' },
    { value: 'vierteljaehrlich', label: '3 Aylık' },
    { value: 'monatlich', label: 'Aylık' },
  ],
  zahlungsweiseLabel: 'Ödeme Şekli',
  zahlungsweiseOptions: [
    { value: 'rechnung', label: 'Fatura ile' },
    { value: 'abbuchung', label: 'Otomatik Ödeme' },
  ],
  derzeitigerBeitragLabel: 'Mevcut Sigorta Primleri',
  beitragVollkaskoLabel: 'Tam Kasko (€)',
  beitragTeilkaskoLabel: 'Dar Kasko (€)',
  beitragHaftpflichtLabel: 'Mali Sorumluluk (€)',

  errVorname: 'Lütfen adınızı girin.',
  errName: 'Lütfen soyadınızı girin.',
  errStrasse: 'Lütfen sokak ve bina numarasını girin.',
  errPlz: 'Lütfen posta kodunu girin.',
  errPlzFormat: 'Posta kodu 5 haneli olmalıdır.',
  errOrt: 'Lütfen şehri girin.',
  errGeburtsdatum: 'Lütfen doğum tarihinizi girin.',
  errHsn: "Lütfen HSN'yi girin.",
  errHsnFormat: 'HSN tam olarak 4 rakamdan oluşmalıdır.',
  errTsn: "Lütfen TSN'yi girin.",
  errNameFahrzeughalter: 'Lütfen araç sahibinin adını ve soyadını girin.',
  errPlzFahrzeughalter: 'Lütfen araç sahibinin posta kodunu girin.',
  errPlzFahrzeughalterFormat: 'Posta kodu 5 haneli olmalıdır.',
  errEmail: 'Lütfen geçerli bir e-posta adresi girin.',

  sumDateLabel: 'Tarih',
  sumSection1: '1. KİŞİSEL BİLGİLER',
  sumSection2: '2. ARAÇ BİLGİLERİ',
  sumSection3: '3. ARAÇ DURUMU',
  sumSection4: '4. PARK YERİ',
  sumSection5: '5. KULLANIM / SÜRÜCÜ KAPSAMI',
  sumSection6: '6. SİGORTA BİLGİLERİ',
  sumEmail: 'E-posta:',
  sumVorname: 'Ad:',
  sumName: 'Soyad:',
  sumStrasse: 'Sokak:',
  sumPlz: 'Posta Kodu:',
  sumOrt: 'Şehir:',
  sumGeburtsdatum: 'Doğum Tarihi:',
  sumHsn: 'Üretici Kodu (HSN):',
  sumTsn: 'Tip Kodu (TSN):',
  sumFahrzeugKategorie: 'Araç Kategorisi:',
  sumHersteller: 'Araç Markası:',
  sumErstzulassung: 'İlk Tescil Tarihi:',
  sumErwerb: 'Alım Tarihi:',
  sumNeuwert: 'Yeni Değer (€):',
  sumFahrleistung: 'Yıllık Kilometre:',
  sumFahrzeugStatus: 'Araç Durumu:',
  sumNameFahrzeughalter: 'Araç Sahibi Adı:',
  sumPlzFahrzeughalter: 'Araç Sahibi Posta Kodu:',
  sumAbstellort: 'Park Yeri:',
  sumAbschliessbar: 'Kilitlenebilir:',
  sumNutzerkreis: 'Sürücü Kapsamı:',
  sumSaisonStart: 'Mevsimlik Plaka Başlangıç:',
  sumSaisonEnde: 'Mevsimlik Plaka Bitiş:',
  sumSfHaftpflicht: 'Hasarsızlık Sınıfı (Mali Sor.):',
  sumVorvertrag: 'Önceki Sözleşme:',
  sumSfVollkasko: 'Hasarsızlık Sınıfı (Tam Kasko):',
  sumSchaeden: 'Bildirilen Hasar (2 Yıl):',
  sumBeiVersicherer: 'Sigorta Şirketi:',
  sumWieLange: 'Ne Kadar Süredir:',
  sumFinanzierung: 'Finansman:',
  sumMehrwert: 'Ek Değer (€):',
  sumDeckung: 'İstenen Kapsam:',
  sumZahlungsart: 'Ödeme Sıklığı:',
  sumZahlungsweise: 'Ödeme Şekli:',
  sumDerzeitigerBeitrag: 'Mevcut Prim:',
  sumVollkasko: '  Tam Kasko:',
  sumTeilkasko: '  Dar Kasko:',
  sumHaftpflicht: '  Mali Sorumluluk:',

  sumStatusNeu: 'Yeni tescil (Satın alma / Sahip değişikliği)',
  sumStatusWechsel: 'Zaten tescilli (Sigorta şirketi değişikliği)',
  sumStatusAnderer: 'Başka bir kişi adına tescil',
  sumVorvertragVorversicherer: 'Önceki sigortacı feshetti',
  sumVorvertragVnGekuendigt: 'Sigortalı kendisi feshetti',
  sumFahrleistungUnbegrenzt: 'Sınırsız',
}

export const TRANSLATIONS: Record<Lang, T> = { de, tr }
