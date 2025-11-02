import { Question } from './types';

export const QUESTIONS_PER_QUIZ = 10;
export const PASSING_SCORE = 8;
export const QUIZ_DURATION_SECONDS = 180; // 3 minutes

export const QUESTION_BANK: Question[] = [
  // NIVEAU 1
  {
    id: '1-mc-1', level: 1, type: 'multiple-choice',
    questionText: 'Waarvoor dient de knop <strong>B</strong> of de toetsencombinatie Ctrl+B in Microsoft Word?',
    options: ['Tekst vet maken', 'Tekst onderlijnen', 'Tekst cursief maken', 'Tekst van kleur veranderen'],
    correctAnswer: 'Tekst vet maken'
  },
  {
    id: '1-mc-2', level: 1, type: 'multiple-choice',
    questionText: 'Waar klik je op om een programma te starten in Windows?',
    options: ['Startmenu', 'Prullenbak', 'Deze pc', 'Instellingen'],
    correctAnswer: 'Startmenu'
  },
  {
    id: '1-mc-3', level: 1, type: 'multiple-choice',
    questionText: 'Welk programma gebruik je om websites te bezoeken?',
    options: ['Word', 'Excel', 'Een browser (zoals Chrome of Edge)', 'Outlook'],
    correctAnswer: 'Een browser (zoals Chrome of Edge)'
  },
  {
    id: '1-mc-4', level: 1, type: 'multiple-choice',
    questionText: 'Wat betekent het paperclip-icoontje als je een nieuwe e-mail schrijft?',
    options: ['E-mail verwijderen', 'Een bijlage toevoegen', 'E-mail afdrukken', 'Antwoorden'],
    correctAnswer: 'Een bijlage toevoegen'
  },
  {
    id: '1-mc-5', level: 1, type: 'multiple-choice',
    questionText: 'Hoe noem je een digitale plek waar je bestanden kunt bewaren?',
    options: ['Een document', 'Een map', 'Een snelkoppeling', 'Een programma'],
    correctAnswer: 'Een map'
  },
  {
    id: '1-mc-6', level: 1, type: 'multiple-choice',
    questionText: 'Je zoekt op Google naar "recept appeltaart". Wat is de beste manier om alleen recepten van de website "VTM Koken" te zien?',
    options: ['recept appeltaart VTM Koken', 'recept appeltaart -VTM Koken', 'appeltaart.vtmkoken.be', 'Google/recepten/appeltaart'],
    correctAnswer: 'recept appeltaart VTM Koken'
  },
  {
    id: '1-mc-7', level: 1, type: 'multiple-choice',
    questionText: 'Je hebt een document getypt in Word en wilt het bewaren voor later. Welke knop gebruik je?',
    options: ['Afdrukken', 'Opslaan', 'Kopiëren', 'Nieuw'],
    correctAnswer: 'Opslaan'
  },
  {
    id: '1-mc-8', level: 1, type: 'multiple-choice',
    questionText: 'Hoe sluit je een venster (bijvoorbeeld van een programma) in Windows?',
    options: ['Op het minnetje (-) klikken', 'Op het vierkantje (□) klikken', 'Op het kruisje (X) klikken', 'Op de Escape-toets drukken'],
    correctAnswer: 'Op het kruisje (X) klikken'
  },
  {
    id: '1-mc-9', level: 1, type: 'multiple-choice',
    questionText: 'Je bent op een website en wilt terug naar de vorige pagina. Welke knop gebruik je in je browser?',
    options: ['De ‘verversen’-pijl (rondje)', 'De pijl naar rechts', 'De pijl naar links', 'De ‘home’-knop (huisje)'],
    correctAnswer: 'De pijl naar links'
  },
  {
    id: '1-mc-10', level: 1, type: 'multiple-choice',
    questionText: 'In welk vak typ je het e-mailadres van de persoon naar wie je een e-mail stuurt?',
    options: ['In het ‘Aan’-vak', 'In het ‘CC’-vak', 'In het ‘Onderwerp’-vak', 'In het tekstvak'],
    correctAnswer: 'In het ‘Aan’-vak'
  },
  {
    id: '1-mc-11', level: 1, type: 'multiple-choice',
    questionText: 'Je wilt een zin in het midden van de pagina plaatsen in Word. Welke uitlijning kies je?',
    options: ['Links uitlijnen', 'Rechts uitlijnen', 'Centreren', 'Uitvullen'],
    correctAnswer: 'Centreren'
  },
  {
    id: '1-mc-12', level: 1, type: 'multiple-choice',
    questionText: 'Je hebt per ongeluk een bestand verwijderd. Waar kun je het meestal terugvinden?',
    options: ['In de map ‘Documenten’', 'In de map ‘Downloads’', 'In de Prullenbak', 'Het is permanent weg'],
    correctAnswer: 'In de Prullenbak'
  },
  {
    id: '1-mc-13', level: 1, type: 'multiple-choice',
    questionText: 'Wat is een ‘hyperlink’ (of ‘link’) op een webpagina?',
    options: ['Een afbeelding die niet laadt', 'Een stuk tekst of een afbeelding waarop je kunt klikken om naar een andere pagina te gaan', 'De titel van de website', 'Een advertentie'],
    correctAnswer: 'Een stuk tekst of een afbeelding waarop je kunt klikken om naar een andere pagina te gaan'
  },
  {
    id: '1-mc-14', level: 1, type: 'multiple-choice',
    questionText: 'Wat is de functie van ‘kopiëren’ en ‘plakken’?',
    options: ['Een bestand permanent verwijderen', 'Een exacte kopie van tekst of een bestand maken op een andere plek', 'De computer sneller maken', 'Programma\'s installeren'],
    correctAnswer: 'Een exacte kopie van tekst of een bestand maken op een andere plek'
  },
  {
    id: '1-mc-15', level: 1, type: 'multiple-choice',
    questionText: 'Je ziet een QR-code (een vierkant blokje met zwart-witte patronen). Wat kun je hiermee doen met je smartphone?',
    options: ['Een foto maken van het blokje', 'Het volume van je telefoon aanpassen', 'De camera van je telefoon gebruiken om de code te scannen voor informatie of een link', 'Je telefoon herstarten'],
    correctAnswer: 'De camera van je telefoon gebruiken om de code te scannen voor informatie of een link'
  },
  {
    id: '1-mc-16', level: 1, type: 'multiple-choice',
    questionText: 'Wat is ‘de cloud’?',
    options: ['Het weerbericht op je computer', 'Een manier om bestanden online op te slaan in plaats van op je eigen computer', 'De achtergrond van je bureaublad', 'Een type computervirus'],
    correctAnswer: 'Een manier om bestanden online op te slaan in plaats van op je eigen computer'
  },
  {
    id: '1-mc-17', level: 1, type: 'multiple-choice',
    questionText: 'Wat typ je in het ‘Onderwerp’-vak van een e-mail?',
    options: ['Jouw eigen e-mailadres', 'Een korte beschrijving waar de e-mail over gaat', 'De volledige inhoud van de e-mail', 'Het adres van de ontvanger'],
    correctAnswer: 'Een korte beschrijving waar de e-mail over gaat'
  },
  {
    id: '1-mc-18', level: 1, type: 'multiple-choice',
    questionText: 'Hoe verander je de lettergrootte van je tekst in Word?',
    options: ['Via het menu ‘Bestand’', 'Door een getal te kiezen naast de naam van het lettertype', 'Via ‘Spelling- en grammaticacontrole’', 'Door de tekst vet te maken'],
    correctAnswer: 'Door een getal te kiezen naast de naam van het lettertype'
  },
  {
    id: '1-mc-19', level: 1, type: 'multiple-choice',
    questionText: 'Je wilt online bankieren. Waar moet je op letten in de adresbalk van je browser om te zien of de verbinding veilig is?',
    options: ['Er moet ‘http://’ staan', 'Er moet een slotje staan en ‘https://’', 'De naam van de bank moet vetgedrukt zijn', 'Er mogen geen afbeeldingen op de pagina staan'],
    correctAnswer: 'Er moet een slotje staan en ‘https://’'
  },
  {
    id: '1-mc-20', level: 1, type: 'multiple-choice',
    questionText: 'Hoe kun je zien welke programma\'s er op dit moment open staan?',
    options: ['In het Startmenu', 'Op de taakbalk onderaan het scherm', 'In de Prullenbak', 'Via de instellingen voor het beeldscherm'],
    correctAnswer: 'Op de taakbalk onderaan het scherm'
  },

  // NIVEAU 2
  {
    id: '2-mc-1', level: 2, type: 'multiple-choice',
    questionText: 'Je wilt de getallen in cellen A1 tot A5 optellen. Welke formule gebruik je in Excel?',
    options: ['=SOM(A1:A5)', '=OPTELLEN(A1+A5)', '=TOTAAL(A1-A5)', '=A1+A2+A3+A4+A5'],
    correctAnswer: '=SOM(A1:A5)'
  },
  {
    id: '2-mc-2', level: 2, type: 'multiple-choice',
    questionText: 'Je maakt een presentatie in PowerPoint. Hoe voeg je een nieuwe pagina (slide) toe?',
    options: ['Via ‘Bestand’ > ‘Nieuw’', 'Met de sneltoets Ctrl + N', 'Door te klikken op ‘Nieuwe dia’', 'Door de presentatie op te slaan'],
    correctAnswer: 'Door te klikken op ‘Nieuwe dia’'
  },
  {
    id: '2-mc-3', level: 2, type: 'multiple-choice',
    questionText: 'Je wilt alle bestanden in een map selecteren in Verkenner. Welke sneltoets gebruik je?',
    options: ['Ctrl + S', 'Ctrl + A', 'Ctrl + C', 'Shift + A'],
    correctAnswer: 'Ctrl + A'
  },
  {
    id: '2-mc-4', level: 2, type: 'multiple-choice',
    questionText: 'Je ontvangt een e-mail die ook naar 10 andere collega\'s is gestuurd. Je wilt <strong>alleen</strong> de oorspronkelijke afzender antwoorden. Welke knop gebruik je?',
    options: ['Allen beantwoorden', 'Beantwoorden', 'Doorsturen', 'Nieuwe e-mail'],
    correctAnswer: 'Beantwoorden'
  },
  {
    id: '2-mc-5', level: 2, type: 'multiple-choice',
    questionText: 'Wat is een voordeel van het gebruiken van een clouddienst zoals OneDrive of Google Drive?',
    options: ['Je bestanden zijn alleen op jouw computer beschikbaar', 'Je kunt overal bij je bestanden, zolang je internet hebt', 'Je hebt geen wachtwoord nodig', 'Je computer wordt er sneller van'],
    correctAnswer: 'Je kunt overal bij je bestanden, zolang je internet hebt'
  },
  {
    id: '2-mc-6', level: 2, type: 'multiple-choice',
    questionText: 'Je wilt een lijstje maken met punten (zoals dit). Welke functie in Word gebruik je hiervoor?',
    options: ['Opsommingstekens (bullets)', 'Nummering', 'Tekstvak', 'Kop- en voettekst'],
    correctAnswer: 'Opsommingstekens (bullets)'
  },
  {
    id: '2-mc-7', level: 2, type: 'multiple-choice',
    questionText: 'Je wilt een uitnodiging ontwerpen en je hebt geen inspiratie. Wat is een handige start in Canva?',
    options: ['Een leeg document starten en zelf vormen tekenen', 'Een sjabloon (template) kiezen', 'Een foto van het internet kopiëren', 'De help-functie gebruiken om te leren tekenen'],
    correctAnswer: 'Een sjabloon (template) kiezen'
  },
  {
    id: '2-mc-8', level: 2, type: 'multiple-choice',
    questionText: 'Wat is het nut van ‘bladwijzers’ of ‘favorieten’ in een browser?',
    options: ['Om de geschiedenis van bezochte websites te wissen', 'Om webpagina\'s die je vaak bezoekt snel terug te vinden', 'Om advertenties te blokkeren', 'Om de lettergrootte aan te passen'],
    correctAnswer: 'Om webpagina\'s die je vaak bezoekt snel terug te vinden'
  },
  {
    id: '2-mc-9', level: 2, type: 'multiple-choice',
    questionText: 'In welke cel bevind je je in Excel als je in kolom B en op rij 3 staat?',
    options: ['B3', '3B', 'B:3', 'R3:B'],
    correctAnswer: 'B3'
  },
  {
    id: '2-mc-10', level: 2, type: 'multiple-choice',
    questionText: 'Wat is een ‘snelkoppeling’ op je bureaublad?',
    options: ['Het echte programma of bestand', 'Een knop om de computer af te sluiten', 'Een link die verwijst naar een programma of bestand op een andere locatie', 'Een bestand dat niet geopend kan worden'],
    correctAnswer: 'Een link die verwijst naar een programma of bestand op een andere locatie'
  },
  {
    id: '2-mc-11', level: 2, type: 'multiple-choice',
    questionText: 'Je wilt een afbeelding invoegen in je PowerPoint-presentatie. Welk tabblad kies je?',
    options: ['Start', 'Invoegen', 'Ontwerpen', 'Animaties'],
    correctAnswer: 'Invoegen'
  },
  {
    id: '2-mc-12', level: 2, type: 'multiple-choice',
    questionText: 'Hoe kun je de naam van een bestand veranderen in Verkenner?',
    options: ['Het bestand openen en opslaan met een andere naam', 'Rechtsklikken op het bestand en ‘Naam wijzigen’ kiezen', 'Het bestand naar de prullenbak slepen', 'Dubbelklikken op het bestand'],
    correctAnswer: 'Rechtsklikken op het bestand en ‘Naam wijzigen’ kiezen'
  },
  {
    id: '2-mc-13', level: 2, type: 'multiple-choice',
    questionText: 'Je wilt een afspraak plannen met collega\'s. Welk onderdeel van Outlook is hiervoor het meest geschikt?',
    options: ['Contactpersonen', 'Taken', 'Agenda', 'Notities'],
    correctAnswer: 'Agenda'
  },
  {
    id: '2-mc-14', level: 2, type: 'multiple-choice',
    questionText: 'Wat is een voorbeeld van een AI (Artificiële Intelligentie) die je kunt gebruiken om vragen te stellen of tekst te laten schrijven?',
    options: ['Google Zoeken', 'Microsoft Word', 'ChatGPT', 'Windows Verkenner'],
    correctAnswer: 'ChatGPT'
  },
  {
    id: '2-mc-15', level: 2, type: 'multiple-choice',
    questionText: 'Wat doet de functie ‘Spelling- en grammaticacontrole’ in Word?',
    options: ['Het document vertalen naar een andere taal', 'De opmaak van het document verbeteren', 'Mogelijke type- en grammaticafouten in de tekst markeren', 'Het document automatisch opslaan'],
    correctAnswer: 'Mogelijke type- en grammaticafouten in de tekst markeren'
  },
  {
    id: '2-mc-16', level: 2, type: 'multiple-choice',
    questionText: 'Je wilt de kolommen in je Excel-sheet een andere naam geven dan A, B, C etc. Kan dat?',
    options: ['Ja, door op de letter van de kolom te dubbelklikken', 'Ja, maar alleen via een ingewikkelde formule', 'Nee, de kolomnamen A, B, C etc. kunnen niet gewijzigd worden', 'Ja, via het menu ‘Bestand’'],
    correctAnswer: 'Nee, de kolomnamen A, B, C etc. kunnen niet gewijzigd worden'
  },
  {
    id: '2-mc-17', level: 2, type: 'multiple-choice',
    questionText: 'Wat zijn ‘cookies’ op het internet?',
    options: ['Spelletjes die je online kunt spelen', 'Kleine tekstbestanden die websites opslaan op je computer om je voorkeuren te onthouden', 'Ongevraagde reclame-e-mails', 'Computervirussen'],
    correctAnswer: 'Kleine tekstbestanden die websites opslaan op je computer om je voorkeuren te onthouden'
  },
  {
    id: '2-mc-18', level: 2, type: 'multiple-choice',
    questionText: 'Hoe maak je een schermafbeelding (screenshot) van je volledige scherm in Windows?',
    options: ['Met de Print Screen (PrtScn) toets', 'Met de Escape (Esc) toets', 'Door Ctrl + C te drukken', 'Door de computer opnieuw op te starten'],
    correctAnswer: 'Met de Print Screen (PrtScn) toets'
  },
  {
    id: '2-mc-19', level: 2, type: 'multiple-choice',
    questionText: 'Je wilt je PowerPoint-presentatie aan een publiek tonen op volledig scherm. Welke toets gebruik je meestal?',
    options: ['F5', 'Escape', 'Ctrl + P', 'De ‘Opslaan’-knop'],
    correctAnswer: 'F5'
  },
  {
    id: '2-mc-20', level: 2, type: 'multiple-choice',
    questionText: 'Wat is het doel van het ‘BCC’ (Blind Carbon Copy) veld in een e-mail?',
    options: ['Om een bijlage mee te sturen', 'Om de e-mail met hoge prioriteit te verzenden', 'Om een kopie te sturen naar iemand zonder dat de andere ontvangers dat e-mailadres zien', 'Om te controleren of de e-mail is aangekomen'],
    correctAnswer: 'Om een kopie te sturen naar iemand zonder dat de andere ontvangers dat e-mailadres zien'
  },

  // NIVEAU 3
  {
    id: '3-mc-1', level: 3, type: 'multiple-choice',
    questionText: 'Je wilt in cel C1 het resultaat tonen van de vermenigvuldiging van cel A1 en B1 in Excel. Wat typ je in C1?',
    options: ['=A1*B1', '=A1xB1', '=VERMENIGVULDIG(A1,B1)', '=PRODUCT(A1:B1)'],
    correctAnswer: '=A1*B1'
  },
  {
    id: '3-mc-2', level: 3, type: 'multiple-choice',
    questionText: 'Je wilt dat een object op je PowerPoint-slide verschijnt met een speciaal effect (bv. binnenvliegen). Welke functie gebruik je?',
    options: ['Overgangen', 'Animaties', 'Ontwerpen', 'Invoegen'],
    correctAnswer: 'Animaties'
  },
  {
    id: '3-mc-3', level: 3, type: 'multiple-choice',
    questionText: 'Je wilt een bestand kleiner maken om het makkelijker via e-mail te versturen. Wat doe je?',
    options: ['Het bestand ‘zippen’ of ‘comprimeren’', 'De naam van het bestand korter maken', 'Het bestand kopiëren', 'De bestandsextensie wijzigen (bv. van .docx naar .txt)'],
    correctAnswer: 'Het bestand ‘zippen’ of ‘comprimeren’'
  },
  {
    id: '3-mc-4', level: 3, type: 'multiple-choice',
    questionText: 'Je wilt een automatische handtekening instellen die onder elke nieuwe e-mail in Outlook verschijnt. Waar vind je deze optie?',
    options: ['In de Agenda-instellingen', 'Bij de opmaakopties van een nieuwe e-mail', 'In de algemene Outlook-instellingen of opties', 'Bij de contactpersonen'],
    correctAnswer: 'In de algemene Outlook-instellingen of opties'
  },
  {
    id: '3-mc-5', level: 3, type: 'multiple-choice',
    questionText: 'Je vraagt aan een AI zoals ChatGPT: "Schrijf een korte, enthousiaste e-mail om een nieuwe medewerker te verwelkomen." Hoe noem je deze instructie?',
    options: ['Een commando', 'Een prompt', 'Een formule', 'Een algoritme'],
    correctAnswer: 'Een prompt'
  },
  {
    id: '3-mc-6', level: 3, type: 'multiple-choice',
    questionText: 'Hoe voeg je paginanummers toe aan je Word-document?',
    options: ['Via het tabblad ‘Beeld’ > ‘Paginanummer’', 'Door handmatig op elke pagina een nummer te typen', 'Via het tabblad ‘Invoegen’ > ‘Paginanummer’', 'Via het tabblad ‘Start’ > ‘Nummering’'],
    correctAnswer: 'Via het tabblad ‘Invoegen’ > ‘Paginanummer’'
  },
  {
    id: '3-mc-7', level: 3, type: 'multiple-choice',
    questionText: 'Je hebt een ontwerp gemaakt in Canva en wilt het downloaden om af te drukken in hoge kwaliteit. Welk bestandsformaat kies je best?',
    options: ['JPG', 'GIF', 'PDF (afdrukken)', 'MP4'],
    correctAnswer: 'PDF (afdrukken)'
  },
  {
    id: '3-mc-8', level: 3, type: 'multiple-choice',
    questionText: 'Wat is het grootste risico als je hetzelfde, simpele wachtwoord gebruikt voor je e-mail, sociale media en clouddiensten?',
    options: ['Je computer wordt trager', 'Je vergeet het wachtwoord sneller', 'Als één account gehackt wordt, hebben criminelen mogelijk toegang tot alles', 'Je bestanden in de cloud nemen meer ruimte in'],
    correctAnswer: 'Als één account gehackt wordt, hebben criminelen mogelijk toegang tot alles'
  },
  {
    id: '3-mc-9', level: 3, type: 'multiple-choice',
    questionText: 'Wat doet de functie ‘filteren’ in Excel?',
    options: ['Het verwijdert permanent de rijen die niet aan de criteria voldoen', 'Het telt het aantal cellen met een specifieke waarde', 'Het verbergt tijdelijk rijen die niet aan jouw criteria voldoen, zodat je je kunt focussen op specifieke data', 'Het sorteert de data altijd van A naar Z'],
    correctAnswer: 'Het verbergt tijdelijk rijen die niet aan jouw criteria voldoen, zodat je je kunt focussen op specifieke data'
  },
  {
    id: '3-mc-10', level: 3, type: 'multiple-choice',
    questionText: 'Je computer reageert niet meer. Welke sneltoets opent Taakbeheer, waarmee je programma\'s geforceerd kunt afsluiten?',
    options: ['Ctrl + Alt + Delete', 'Ctrl + S', 'Alt + F4', 'Windows-toets + L'],
    correctAnswer: 'Ctrl + Alt + Delete'
  },
  {
    id: '3-mc-11', level: 3, type: 'multiple-choice',
    questionText: 'Wat is het voordeel van het gebruiken van het ‘diamodel’ (Slide Master) in PowerPoint?',
    options: ['Je kunt elke dia een compleet unieke opmaak geven', 'Je kunt wijzigingen (zoals een logo of lettertype) in één keer toepassen op alle dia\'s', 'Het maakt je presentatiebestand kleiner', 'Het voegt automatisch animaties toe'],
    correctAnswer: 'Je kunt wijzigingen (zoals een logo of lettertype) in één keer toepassen op alle dia\'s'
  },
  {
    id: '3-mc-12', level: 3, type: 'multiple-choice',
    questionText: 'Hoe kun je bestanden sorteren in een map in Verkenner?',
    options: ['Alleen op naam', 'Alleen op datum', 'Je kunt niet sorteren', 'Op naam, datum, type of grootte door op de kolomhoofden te klikken'],
    correctAnswer: 'Op naam, datum, type of grootte door op de kolomhoofden te klikken'
  },
  {
    id: '3-mc-13', level: 3, type: 'multiple-choice',
    questionText: 'Je bent op vakantie en wilt dat mensen die je mailen automatisch een bericht terugkrijgen. Welke functie stel je in in Outlook?',
    options: ['Een doorstuurregel', 'Een afwezigheidsassistent (out of office)', 'Een nieuwe handtekening', 'Een agendaverzoek'],
    correctAnswer: 'Een afwezigheidsassistent (out of office)'
  },
  {
    id: '3-mc-14', level: 3, type: 'multiple-choice',
    questionText: 'Je wilt in Excel de inhoud van cel A1 kopiëren naar cellen A2 tot en met A10. Wat is de snelste manier?',
    options: ['Elke cel handmatig typen', 'Cel A1 kopiëren en in elke cel apart plakken', 'De vulgreep (het kleine vierkantje rechtsonder cel A1) naar beneden slepen', 'De ‘filter’ functie gebruiken'],
    correctAnswer: 'De vulgreep (het kleine vierkantje rechtsonder cel A1) naar beneden slepen'
  },
  {
    id: '3-mc-15', level: 3, type: 'multiple-choice',
    questionText: 'Wat is het doel van de functie ‘Wijzigingen bijhouden’ (Track Changes) in Word?',
    options: ['Het telt het aantal woorden in het document', 'Het houdt bij wie het document opent', 'Het maakt alle wijzigingen die iemand aanbrengt zichtbaar, zodat je ze kunt accepteren of weigeren', 'Het slaat elke 5 minuten automatisch een versie op'],
    correctAnswer: 'Het maakt alle wijzigingen die iemand aanbrengt zichtbaar, zodat je ze kunt accepteren of weigeren'
  },
  {
    id: '3-mc-16', level: 3, type: 'multiple-choice',
    questionText: 'Wat is een ‘phishing’ e-mail?',
    options: ['Een e-mail met een grappige video', 'Een e-mail die reclame maakt voor visproducten', 'Een valse e-mail die probeert je te misleiden om persoonlijke gegevens (zoals wachtwoorden of bankgegevens) te geven', 'Een nieuwsbrief waarop je geabonneerd bent'],
    correctAnswer: 'Een valse e-mail die probeert je te misleiden om persoonlijke gegevens (zoals wachtwoorden of bankgegevens) te geven'
  },
  {
    id: '3-mc-17', level: 3, type: 'multiple-choice',
    questionText: 'Je wilt zoeken naar een <strong>exacte</strong> zin op Google. Hoe doe je dat?',
    options: ['De zin in hoofdletters typen', 'De zin tussen aanhalingstekens zetten (" ")', 'De zin achterstevoren typen', 'Het woord ‘exact’ voor de zin typen'],
    correctAnswer: 'De zin tussen aanhalingstekens zetten (" ")'
  },
  {
    id: '3-mc-18', level: 3, type: 'multiple-choice',
    questionText: 'Je wilt notities voor jezelf toevoegen aan een PowerPoint-dia, die het publiek <strong>niet</strong> kan zien tijdens de presentatie. Waar typ je deze notities?',
    options: ['In een verborgen tekstvak op de dia zelf', 'In het notitievenster onder de dia', 'In de titel van de dia', 'In een apart Word-document'],
    correctAnswer: 'In het notitievenster onder de dia'
  },
  {
    id: '3-mc-19', level: 3, type: 'multiple-choice',
    questionText: 'Wat is een ‘draaitabel’ (PivotTable) in Excel?',
    options: ['Een tabel die je 90 graden kunt draaien op de pagina', 'Een hulpmiddel om grote hoeveelheden data snel samen te vatten, te analyseren en te groeperen', 'Een grafiek die eruitziet als een draaikolk', 'Een tabel met opmaak die automatisch van kleur verandert'],
    correctAnswer: 'Een hulpmiddel om grote hoeveelheden data snel samen te vatten, te analyseren en te groeperen'
  },
  {
    id: '3-mc-20', level: 3, type: 'multiple-choice',
    questionText: 'Je hebt een lang Word-document en wilt snel naar een specifiek hoofdstuk springen. Wat is de beste manier om dit te organiseren?',
    options: ['Door verschillende lettergroottes te gebruiken', 'Door een inhoudsopgave te maken die gebaseerd is op koppen (Headings)', 'Door alle hoofdstukken een andere kleur te geven', 'Door bladwijzers te gebruiken voor elke pagina'],
    correctAnswer: 'Door een inhoudsopgave te maken die gebaseerd is op koppen (Headings)'
  },
];