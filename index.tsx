

import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// --- INGEVOEGDE TYPES (types.ts) ---

type QuestionType = 'multiple-choice';

interface Question {
  id: string;
  level: number;
  type: QuestionType;
  questionText: string | React.ReactNode;
  options?: string[];
  correctAnswer: string;
}

interface StudentInfo {
  campus: string;
  firstName: string;
  lastName: string;
}

type UserAnswer = string | null;

interface Attempt {
  level: number;
  attemptNumber: number;
  startTime: Date;
  endTime: Date;
  score: number;
  answers: { [questionId: string]: UserAnswer };
  questions: Question[];
  passed: boolean;
  durationInSeconds: number;
  skipped?: boolean;
  timeUp?: boolean;
}

type GameState = 'welcome' | 'info' | 'quiz' | 'results' | 'end';

const Campuses = [
  'Aarschot',
  'Genk',
  'Hamont-Achel',
  'Hasselt',
  'Herk-de-Stad',
  'Houthalen-Helchteren',
  'Kortenberg',
  'Leuven - Centrum',
  'Leuven - Kessel-Lo',
  'Maaseik',
  'Maasmechelen - Eisden',
  'Peer',
  'Pelt',
  'Sint-Truiden',
  'Tienen',
  'Tongeren - Borgloon'
];


// --- INGEVOEGDE CONSTANTEN (constants.ts) ---

const QUESTIONS_PER_QUIZ = 10;
const PASSING_SCORE = 8;
const QUIZ_DURATION_SECONDS = 180; // 3 minutes

const QUESTION_BANK: Question[] = [
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


// --- INGEVOEGDE COMPONENTEN ---

const WelcomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="text-center animate-fade-in-up flex flex-col items-center justify-center flex-grow">
      <h1 className="text-2xl md:text-3xl font-bold text-qrios-dark mb-3">Welkom bij de IT-Vaardigheidstest</h1>
      <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto mb-6">
        Deze test is ontworpen om uw huidige computervaardigheden in kaart te brengen. Dit helpt ons om u de best mogelijke begeleiding te geven. De resultaten vormen een beginsituatie, zodat we later uw vooruitgang kunnen meten.
      </p>
      <button 
        onClick={onStart} 
        className="bg-qrios-primary hover:bg-opacity-90 text-white font-bold py-2 px-6 rounded-full text-sm shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-qrios-secondary"
      >
        Start de test
      </button>
    </div>
  );
};

const InfoScreen: React.FC<{ onSubmit: (info: StudentInfo) => void }> = ({ onSubmit }) => {
  const [info, setInfo] = useState<StudentInfo>({ campus: '', firstName: '', lastName: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(info);
    }
  };

  const isFormValid = info.campus !== '' && info.firstName.trim() !== '' && info.lastName.trim() !== '';

  return (
    <div className="w-full max-w-md bg-white p-4 rounded-xl shadow-lg border border-gray-200 animate-fade-in-up">
      <h2 className="text-xl font-bold text-center text-qrios-dark mb-2">Gegevens Cursist</h2>
      <p className="text-center text-gray-600 mb-4 text-sm">Vul alstublieft uw gegevens in om te beginnen.</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="campus" className="block text-xs font-medium text-gray-700 mb-1">Campus</label>
          <select 
            id="campus" 
            name="campus" 
            value={info.campus} 
            onChange={handleChange} 
            className="w-full px-3 py-1.5 bg-white text-qrios-dark border border-gray-300 rounded-lg focus:ring-2 focus:ring-qrios-secondary focus:border-qrios-secondary transition-shadow text-sm"
          >
            <option value="" disabled>Kies een campus...</option>
            {Campuses.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="firstName" className="block text-xs font-medium text-gray-700 mb-1">Voornaam</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            value={info.firstName} 
            onChange={handleChange}
            className="w-full px-3 py-1.5 bg-white text-qrios-dark border border-gray-300 rounded-lg focus:ring-2 focus:ring-qrios-secondary focus:border-qrios-secondary transition-shadow text-sm" 
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-xs font-medium text-gray-700 mb-1">Naam</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            value={info.lastName} 
            onChange={handleChange} 
            className="w-full px-3 py-1.5 bg-white text-qrios-dark border border-gray-300 rounded-lg focus:ring-2 focus:ring-qrios-secondary focus:border-qrios-secondary transition-shadow text-sm"
          />
        </div>
        <button 
          type="submit" 
          disabled={!isFormValid} 
          className="w-full bg-qrios-primary text-white font-bold py-2 px-4 rounded-lg text-sm shadow-md hover:bg-opacity-90 transition-all disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed transform hover:scale-105"
        >
          Start Bevraging
        </button>
      </form>
    </div>
  );
};

const Timer: React.FC<{ duration: number; onTimeUp: () => void; }> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeUp]);
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercentage = (timeLeft / duration) * 100;

  const getBarColor = () => {
    if (progressPercentage > 50) return 'bg-qrios-success';
    if (progressPercentage > 20) return 'bg-yellow-400';
    return 'bg-qrios-danger';
  };

  return (
    <div className="w-full my-2">
        <div className="flex justify-between items-center mb-1 text-xs font-medium text-gray-700">
            <span>Tijd over</span>
            <span className="font-mono">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
                className={`h-2.5 rounded-full transition-all duration-500 ease-linear ${getBarColor()}`}
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
    </div>
  );
};

const QuizScreen: React.FC<{ questions: Question[]; level: number; onQuizEnd: (answers: { [questionId: string]: UserAnswer }, durationInSeconds: number, timeUp: boolean) => void; }> = ({ questions, level, onQuizEnd }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: UserAnswer }>({});

  const handleTimeUp = useCallback(() => {
    const startTime = Date.now() / 1000 - QUIZ_DURATION_SECONDS;
    const endTime = Date.now() / 1000;
    onQuizEnd(answers, Math.round(endTime - startTime), true);
  }, [answers, onQuizEnd]);
  
  useEffect(() => {
    const initialAnswers: { [questionId:string]: UserAnswer } = {};
    questions.forEach(q => {
      initialAnswers[q.id] = null;
    });
    setAnswers(initialAnswers);
  }, [questions]);

  const handleAnswerChange = (questionId: string, answer: UserAnswer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const duration = QUIZ_DURATION_SECONDS - (Math.floor(Date.now() / 1000 - quizStartTime.current / 1000));
    onQuizEnd(answers, QUIZ_DURATION_SECONDS - duration, false);
  };
  
  const quizStartTime = React.useRef(Date.now());

  const currentQuestion = questions[currentQuestionIndex];

  const renderQuestion = (q: Question) => {
    const userAnswer = answers[q.id];

    return (
      <div className="space-y-2">
        {q.options?.map(option => (
          <label key={option} className="flex items-center p-2 border-2 rounded-lg cursor-pointer hover:border-qrios-secondary transition-all has-[:checked]:bg-qrios-secondary has-[:checked]:bg-opacity-20 has-[:checked]:border-qrios-primary">
            <input 
              type="radio" 
              name={q.id} 
              value={option}
              checked={userAnswer === option}
              onChange={() => handleAnswerChange(q.id, option)}
              className="w-4 h-4 text-qrios-primary focus:ring-qrios-secondary"
            />
            <span className="ml-2 text-sm text-qrios-dark">{option}</span>
          </label>
        ))}
      </div>
    );
  };

  if (!currentQuestion) return <div>Laden...</div>;

  return (
    <div className="w-full max-w-2xl bg-white p-4 rounded-xl shadow-lg border border-gray-200 animate-fade-in-up flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-qrios-dark">Niveau {level}</h2>
        <span className="text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full text-sm">Vraag {currentQuestionIndex + 1} / {questions.length}</span>
      </div>
      
      <Timer duration={QUIZ_DURATION_SECONDS} onTimeUp={handleTimeUp} />

      <div className="bg-qrios-light p-3 rounded-lg my-1 flex-grow min-h-[180px] flex flex-col justify-center border">
        <p 
          className="text-base sm:text-lg text-qrios-dark mb-3 font-medium"
          dangerouslySetInnerHTML={{ __html: currentQuestion.questionText as string }}
        />
        {renderQuestion(currentQuestion)}
      </div>

      <div className="flex justify-center items-center mt-2 gap-2">
        <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="px-3 py-1.5 text-xs bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Vorige</button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNext} className="px-4 py-2 text-sm bg-qrios-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors shadow-md transform hover:scale-105">Volgende</button>
        ) : (
          <button onClick={handleSubmit} className="px-4 py-2 text-sm bg-qrios-success text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors shadow-md transform hover:scale-105">Bevraging Indienen</button>
        )}
      </div>
    </div>
  );
};

const CorrectIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-qrios-success mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const IncorrectIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-qrios-danger mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
);

const Report: React.FC<{ attempt: Attempt; }> = ({ attempt }) => {
  return (
    <div className="space-y-3">
      {attempt.questions.map((q, index) => {
        const userAnswer = attempt.answers[q.id];
        const isCorrect = userAnswer === q.correctAnswer;

        const displayUserAnswer = userAnswer === null ? 'Geen antwoord' : String(userAnswer);
        const displayCorrectAnswer = String(q.correctAnswer);

        return (
          <div key={q.id} className="border-b border-gray-200 pb-2 last:border-b-0">
            <p 
              className="font-semibold text-qrios-dark mb-2 text-sm"
              dangerouslySetInnerHTML={{ __html: `Vraag ${index + 1}: ${q.questionText}` }}
            />
            <div className="flex items-start">
              {isCorrect ? <CorrectIcon /> : <IncorrectIcon />}
              <div className="flex-grow text-xs">
                <p>Jouw antwoord: <span className={`font-medium ${isCorrect ? 'text-qrios-success' : 'text-qrios-danger'}`}>{displayUserAnswer}</span></p>
                {!isCorrect && <p>Correct antwoord: <span className="font-medium text-qrios-success">{displayCorrectAnswer}</span></p>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ResultsScreen: React.FC<{ attempt: Attempt; history: Attempt[]; onNext: () => void; }> = ({ attempt, history, onNext }) => {
  const [showReport, setShowReport] = useState(false);
  const { passed, score, attemptNumber, level, timeUp } = attempt;
  
  const attemptsForThisLevel = history.filter(h => h.level === level);

  const getNextButtonText = () => {
    if (passed) {
      return level < 3 ? 'Volgend Niveau' : 'Test Afronden';
    }
    return attemptNumber < 2 ? 'Tweede Poging' : 'Test Beëindigen';
  };

  const CheckIcon = () => (
    <div className="w-12 h-12 rounded-full bg-qrios-success bg-opacity-10 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-qrios-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    </div>
  );

  const XCircleIcon = () => (
     <div className="w-12 h-12 rounded-full bg-qrios-danger bg-opacity-10 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-qrios-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    </div>
  );
  
  if (showReport) {
    return (
      <div className="w-full max-w-3xl bg-white p-4 rounded-xl shadow-lg border border-gray-200 animate-fade-in">
        <h2 className="text-xl font-bold text-qrios-dark mb-4">Antwoorden Niveau {level}</h2>
        {attemptsForThisLevel.map((att, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mb-3">Poging {att.attemptNumber}</h3>
            <Report attempt={att} />
          </div>
        ))}
        <button 
          onClick={() => setShowReport(false)}
          className="w-full mt-4 bg-qrios-primary text-white font-bold py-1.5 px-4 rounded-lg text-sm shadow-md hover:bg-opacity-90 transition-colors"
        >
          Terug naar Resultaten
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md text-center bg-white p-4 rounded-xl shadow-lg border border-gray-200 animate-fade-in-up">
        <div className="flex justify-center mb-4">
            {passed ? <CheckIcon/> : <XCircleIcon />}
        </div>
      <h2 className="text-xl font-bold mb-2">{passed ? 'Gefeliciteerd!' : 'Helaas...'}</h2>
      {timeUp && !passed ? (
        <p className="text-gray-600 text-sm mb-4">
          Helaas, je hebt de {QUESTIONS_PER_QUIZ} vragen niet kunnen beantwoorden in 3 minuten. Je bent daarom niet geslaagd voor niveau {level}.
        </p>
      ) : (
        <p className="text-gray-600 text-sm mb-4">
          {passed ? `Je bent geslaagd voor niveau ${level}!` : `Je bent niet geslaagd voor niveau ${level}.`}
        </p>
      )}

      <div className="bg-qrios-light rounded-lg p-3 my-2 border">
        <p className="text-base font-medium text-gray-700">Jouw score:</p>
        <p className={`text-3xl font-bold my-1 ${passed ? 'text-qrios-success' : 'text-qrios-danger'}`}>{score}<span className="text-xl text-gray-500">/{QUESTIONS_PER_QUIZ}</span></p>
      </div>
      {!passed && !timeUp && <p className="text-gray-600 text-xs mb-4">Je hebt een score van {PASSING_SCORE} of hoger nodig om te slagen.</p>}
      {!passed && attemptNumber < 2 && <p className="text-qrios-success font-semibold text-sm mb-4">Je krijgt een tweede poging!</p>}
      
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <button 
          onClick={() => setShowReport(true)}
          className="flex-1 bg-gray-200 text-qrios-dark font-bold py-2 px-4 rounded-lg text-sm hover:bg-gray-300 transition-colors"
        >
          Antwoorden
        </button>
        <button 
          onClick={onNext}
          className="flex-1 bg-qrios-primary text-white font-bold py-2 px-4 rounded-lg text-sm shadow-md hover:bg-opacity-90 transition-colors"
        >
          {getNextButtonText()}
        </button>
      </div>
    </div>
  );
};

const EndScreen: React.FC<{ achievedLevel: number; history: Attempt[]; studentInfo: StudentInfo; testStartTime: Date; testEndTime: Date; }> = ({ achievedLevel, history, studentInfo, testStartTime, testEndTime }) => {
    
  const handleDownload = () => {
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const MARGIN = 20;
    const PAGE_WIDTH = pdf.internal.pageSize.getWidth();
    const PAGE_HEIGHT = pdf.internal.pageSize.getHeight();
    const USABLE_WIDTH = PAGE_WIDTH - 2 * MARGIN;
    let y = MARGIN;

    const stripHtml = (html: string) => {
        try {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || "";
        } catch (e) {
            return html;
        }
    };

    const checkPageBreak = (heightNeeded: number) => {
        if (y + heightNeeded > PAGE_HEIGHT - MARGIN) {
            pdf.addPage();
            y = MARGIN;
        }
    };

    // --- PAGE 1: SUMMARY ---
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(22);
    pdf.text('Rapport ICT Vaardigheidstest', PAGE_WIDTH / 2, y, { align: 'center' });
    y += 15;

    // Student Info
    pdf.setFontSize(11);
    const totalDurationSeconds = Math.round((testEndTime.getTime() - testStartTime.getTime()) / 1000);
    const minutes = Math.floor(totalDurationSeconds / 60);
    const seconds = totalDurationSeconds % 60;

    const infoData = [
        { label: 'Cursist', value: `${studentInfo.firstName} ${studentInfo.lastName}` },
        { label: 'Campus', value: studentInfo.campus },
        { label: 'Test afgenomen op', value: testStartTime.toLocaleString('nl-BE') },
        { label: 'Totale duur', value: `${minutes} minuten en ${seconds} seconden` }
    ];

    infoData.forEach(item => {
        pdf.setFont('helvetica', 'bold');
        pdf.text(item.label + ':', MARGIN, y);
        pdf.setFont('helvetica', 'normal');
        pdf.text(item.value, MARGIN + 40, y);
        y += 6;
    });
    y += 10;

    // Centered final result block
    pdf.setFillColor(248, 249, 250); // A light gray background
    pdf.roundedRect(MARGIN, y - 5, USABLE_WIDTH, 22, 3, 3, 'F');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.setTextColor(108, 117, 125); // A muted gray for the label
    pdf.text('Eindresultaat', PAGE_WIDTH / 2, y + 4, { align: 'center' });
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(18);
    pdf.setTextColor(67, 170, 139); // qrios-success green
    pdf.text(`Niveau ${achievedLevel} behaald`, PAGE_WIDTH / 2, y + 13, { align: 'center' });
    y += 25;
    pdf.setTextColor(33, 37, 41); // Reset to default dark color


    // --- ATTEMPTS DETAILS ---
    history.forEach((attempt) => {
        checkPageBreak(20);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.text(`Details Niveau ${attempt.level} - Poging ${attempt.attemptNumber}`, MARGIN, y);
        y += 7;
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        const resultText = attempt.passed ? 'Geslaagd' : 'Niet geslaagd';
        const resultColor = attempt.passed ? '#43AA8B' : '#F94144';
        pdf.text(`Score: ${attempt.score}/${QUESTIONS_PER_QUIZ}`, MARGIN, y);
        pdf.setTextColor(resultColor);
        pdf.text(resultText, PAGE_WIDTH - MARGIN, y, { align: 'right'});
        pdf.setTextColor('#212529'); // reset color
        y += 8;

        attempt.questions.forEach((q, index) => {
            const questionText = stripHtml(`Vraag ${index + 1}: ${q.questionText}`);
            const questionLines = pdf.splitTextToSize(questionText, USABLE_WIDTH);
            const questionHeight = questionLines.length * 4.5;
            
            const userAnswer = attempt.answers[q.id] ?? 'Geen antwoord';
            const isCorrect = userAnswer === q.correctAnswer;
            
            const answerHeight = isCorrect ? 4.5 : 9;
            const totalBlockHeight = questionHeight + answerHeight + 3;
            
            checkPageBreak(totalBlockHeight);

            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(10);
            pdf.text(questionLines, MARGIN, y);
            y += questionHeight;

            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(10);
            pdf.setTextColor(isCorrect ? '#43AA8B' : '#F94144');
            pdf.text(`Jouw antwoord: ${userAnswer}`, MARGIN + 5, y);
            y += 4.5;

            if (!isCorrect) {
                pdf.setTextColor('#43AA8B');
                pdf.text(`Correct antwoord: ${q.correctAnswer}`, MARGIN + 5, y);
                y += 4.5;
            }
            
            pdf.setTextColor('#212529'); // Reset color
            y += 3; // Spacing between questions
        });
        y += 5; // Spacing after an attempt
    });

    // --- ADD HEADERS AND FOOTERS TO ALL PAGES ---
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        pdf.setTextColor(150);
        
        // Header (only from page 2 onwards)
        if (i > 1) {
            const headerText = `Rapport Qrios ICT Vaardigheidstest - Cursist: ${studentInfo.firstName} ${studentInfo.lastName}`;
            pdf.text(headerText, MARGIN, MARGIN / 2);
        }
        
        // Footer (on all pages)
        pdf.text(`Pagina ${i} van ${pageCount}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - MARGIN / 2, { align: 'right' });
    }

    pdf.save(`Rapport_${studentInfo.firstName}_${studentInfo.lastName}.pdf`);
  };
  
  const totalDurationSeconds = Math.round((testEndTime.getTime() - testStartTime.getTime()) / 1000);
  const minutes = Math.floor(totalDurationSeconds / 60);
  const seconds = totalDurationSeconds % 60;
  
  return (
    <div className="w-full max-w-lg text-center bg-white p-4 rounded-xl shadow-lg border border-gray-200 animate-fade-in-up">
      <h2 className="text-xl font-bold text-qrios-dark mb-2">Test Afgerond!</h2>
      <p className="text-sm text-gray-600 mb-4">Bedankt voor uw deelname. Hieronder vindt u een overzicht van uw resultaten.</p>

      <div className="bg-qrios-light rounded-lg p-3 my-4 border-2 border-qrios-primary">
        <p className="text-base font-medium text-gray-700">Behaald niveau:</p>
        <p className="text-4xl font-bold my-2 text-qrios-primary">{achievedLevel}</p>
        <p className="text-xs text-gray-500">van de 3 niveaus</p>
      </div>

      <div className="text-left text-gray-700 space-y-1 mb-4 p-3 bg-gray-50 rounded-lg border text-sm">
        <p><strong>Naam:</strong> {studentInfo.firstName} {studentInfo.lastName}</p>
        <p><strong>Campus:</strong> {studentInfo.campus}</p>
        <p><strong>Totale duur:</strong> {minutes} minuten en {seconds} seconden</p>
      </div>
      
      <button 
        onClick={handleDownload}
        className="w-full bg-qrios-primary text-white font-bold py-2 px-4 rounded-lg text-sm shadow-md hover:bg-opacity-90 transition-all transform hover:scale-105"
      >
        Download Rapport (PDF)
      </button>
    </div>
  );
};

const Header: React.FC = () => {
    return (
        <header className="w-full bg-qrios-primary shadow-md p-2">
            <div className="max-w-5xl mx-auto flex items-center justify-center">
                <div className="flex items-center gap-4">
                    <h1 className="text-base sm:text-lg font-semibold text-white">Qrios ICT Vaardigheidstest</h1>
                </div>
            </div>
        </header>
    )
};

const ConfirmationModal: React.FC<{ isOpen: boolean; onConfirm: () => void; onCancel: () => void; message: React.ReactNode; }> = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="bg-white w-full max-w-sm p-4 rounded-xl shadow-lg text-center animate-fade-in-up">
        <p className="text-base text-qrios-dark mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 bg-qrios-danger text-white font-bold py-2 px-4 rounded-lg text-sm shadow-md hover:bg-opacity-90 transition-colors"
          >
            Ja
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-qrios-dark font-bold py-2 px-4 rounded-lg text-sm hover:bg-gray-300 transition-colors"
          >
            Annuleren
          </button>
        </div>
      </div>
    </div>
  );
};

const TeacherCodeModal: React.FC<{ isOpen: boolean; onConfirm: (code: string) => boolean; onCancel: () => void; }> = ({ isOpen, onConfirm, onCancel }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setCode('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleConfirmClick = () => {
    const isCorrect = onConfirm(code);
    if (!isCorrect) {
      setError('Incorrecte code. Probeer opnieuw.');
      setCode('');
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleConfirmClick();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="bg-white w-full max-w-sm p-4 rounded-xl shadow-lg text-center animate-fade-in-up">
        <h2 className="text-xl font-bold text-qrios-dark mb-2">Toegang voor Leerkracht</h2>
        <p className="text-gray-600 mb-4 text-sm">Deze actie is enkel voor de leerkracht. Voer de code in om door te gaan.</p>
        
        <form onSubmit={handleFormSubmit} className="space-y-3">
          <input
            type="password"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (error) setError('');
            }}
            className={`w-full px-3 py-1.5 bg-white text-qrios-dark border ${error ? 'border-qrios-danger' : 'border-gray-300'} rounded-lg focus:ring-2 ${error ? 'focus:ring-qrios-danger' : 'focus:ring-qrios-secondary'} focus:border-transparent transition-shadow text-sm`}
            placeholder="Voer code in..."
            autoFocus
          />
          {error && <p className="text-qrios-danger text-xs text-left">{error}</p>}
          
          <div className="flex justify-center gap-4 pt-2">
            <button
              type="submit"
              className="flex-1 bg-qrios-primary text-white font-bold py-2 px-4 rounded-lg text-sm shadow-md hover:bg-opacity-90 transition-colors"
            >
              OK
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-qrios-dark font-bold py-2 px-4 rounded-lg text-sm hover:bg-gray-300 transition-colors"
            >
              Annuleren
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- HOOFDAPPLICATIE (App.tsx) ---

const Footer: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <footer className="w-full text-center text-white text-sm p-2 mt-auto bg-qrios-primary">
      {time.toLocaleDateString('nl-BE')} - {time.toLocaleTimeString('nl-BE')}
    </footer>
  );
};

function App() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [testStartTime, setTestStartTime] = useState<Date | null>(null);
  const [testEndTime, setTestEndTime] = useState<Date | null>(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentAttemptNumber, setCurrentAttemptNumber] = useState(1);
  const [history, setHistory] = useState<Attempt[]>([]);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isSkipLevelModalOpen, setIsSkipLevelModalOpen] = useState(false);
  
  const handleStart = () => {
    setGameState('info');
  };

  const handleResetRequest = () => {
    setIsResetModalOpen(true);
  };
  
  const confirmReset = () => {
    setGameState('welcome');
    setStudentInfo(null);
    setTestStartTime(null);
    setTestEndTime(null);
    setCurrentLevel(1);
    setCurrentAttemptNumber(1);
    setHistory([]);
    setCurrentQuestions([]);
    setIsResetModalOpen(false);
  };
  
  const cancelReset = () => {
    setIsResetModalOpen(false);
  };

  const handleSkipLevel = () => {
    const skippedAttempt: Attempt = {
      level: currentLevel,
      attemptNumber: currentAttemptNumber,
      startTime: new Date(),
      endTime: new Date(),
      score: 0,
      answers: {},
      questions: currentQuestions,
      passed: true, // Treat skip as a pass
      durationInSeconds: 0,
      skipped: true,
    };
    
    setHistory(prev => [...prev, skippedAttempt]);

    if (currentLevel < 3) {
      startQuiz(currentLevel + 1, 1);
    } else {
      setTestEndTime(new Date());
      setGameState('end');
    }
  };

  const handleSkipLevelRequest = () => {
    setIsSkipLevelModalOpen(true);
  };

  const handleConfirmSkip = (code: string): boolean => {
    if (code === 'Qrios') {
      handleSkipLevel();
      setIsSkipLevelModalOpen(false);
      return true;
    }
    return false;
  };

  const handleCancelSkip = () => {
    setIsSkipLevelModalOpen(false);
  };

  const handleInfoSubmit = (info: StudentInfo) => {
    setStudentInfo(info);
    setTestStartTime(new Date());
    startQuiz(1, 1);
  };
  
  const startQuiz = (level: number, attempt: number) => {
    const questions = QUESTION_BANK.filter(q => q.level === level)
      .sort(() => 0.5 - Math.random())
      .slice((attempt - 1) * QUESTIONS_PER_QUIZ, attempt * QUESTIONS_PER_QUIZ);
    
    setCurrentQuestions(questions);
    setCurrentLevel(level);
    setCurrentAttemptNumber(attempt);
    setGameState('quiz');
  };

  const handleQuizEnd = (answers: { [questionId: string]: UserAnswer }, durationInSeconds: number, timeUp: boolean) => {
    let score = 0;
    currentQuestions.forEach(q => {
      const userAnswer = answers[q.id];
      if (userAnswer === q.correctAnswer) {
        score++;
      }
    });

    const passed = score >= PASSING_SCORE && !timeUp;

    const newAttempt: Attempt = {
      level: currentLevel,
      attemptNumber: currentAttemptNumber,
      startTime: new Date(Date.now() - durationInSeconds * 1000),
      endTime: new Date(),
      score,
      answers,
      questions: currentQuestions,
      passed,
      durationInSeconds,
      timeUp
    };

    setHistory(prev => [...prev, newAttempt]);
    setGameState('results');
  };

  const handleNextStep = () => {
    const lastAttempt = history[history.length - 1];
    if (lastAttempt.passed) {
      if (lastAttempt.level < 3) {
        startQuiz(lastAttempt.level + 1, 1);
      } else {
        setTestEndTime(new Date());
        setGameState('end');
      }
    } else { 
      if (lastAttempt.attemptNumber < 2) {
        startQuiz(lastAttempt.level, 2);
      } else {
        setTestEndTime(new Date());
        setGameState('end');
      }
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} />;
      case 'info':
        return <InfoScreen onSubmit={handleInfoSubmit} />;
      case 'quiz':
        return <QuizScreen 
                  key={`${currentLevel}-${currentAttemptNumber}`}
                  questions={currentQuestions} 
                  level={currentLevel} 
                  onQuizEnd={handleQuizEnd} 
                />;
      case 'results':
        return <ResultsScreen 
                  attempt={history[history.length - 1]} 
                  history={history}
                  onNext={handleNextStep}
                />;
      case 'end':
        const lastPassedLevel = history.filter(h => h.passed).sort((a,b) => b.level - a.level)[0]?.level || 0;
        return <EndScreen 
                  achievedLevel={lastPassedLevel}
                  history={history}
                  studentInfo={studentInfo!}
                  testStartTime={testStartTime!}
                  testEndTime={testEndTime!}
                />;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="bg-qrios-light min-h-screen flex flex-col items-center text-qrios-dark font-sans">
       <Header />
       {gameState !== 'welcome' && (
        <div className="w-full flex justify-center items-center gap-4 p-1 bg-qrios-light border-b border-gray-200">
          <button
            onClick={handleResetRequest}
            className="bg-white border border-gray-300 text-qrios-dark hover:bg-gray-100 font-semibold py-1.5 px-3 rounded-lg text-xs transition-colors shadow-sm"
          >
            Home
          </button>
          {gameState === 'quiz' && (
            <button
              onClick={handleSkipLevelRequest}
              className="bg-qrios-secondary text-white hover:bg-opacity-90 font-semibold py-1.5 px-3 rounded-lg text-xs transition-colors shadow-sm"
            >
              Niveau overslaan
            </button>
          )}
        </div>
       )}
       <main className="w-full max-w-4xl mx-auto flex-grow flex flex-col items-center p-2">
        {renderContent()}
       </main>
      <Footer />
      <ConfirmationModal
        isOpen={isResetModalOpen}
        onConfirm={confirmReset}
        onCancel={cancelReset}
        message="Ben je zeker dat je de test wil verlaten?"
      />
      <TeacherCodeModal
        isOpen={isSkipLevelModalOpen}
        onConfirm={handleConfirmSkip}
        onCancel={handleCancelSkip}
      />
    </div>
  );
}

// --- STARTPUNT VAN DE APP ---

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);