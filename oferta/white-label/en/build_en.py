"""Builds en/index.html from the Polish page by replacing texts (keeps one design)."""
import os, re
HERE = os.path.dirname(os.path.abspath(__file__))
s = open(os.path.join(HERE, '..', 'index.html'), encoding='utf-8').read()
s = s.replace('../../audyt-wp/', '../../../audyt-wp/').replace('../../wp-demos/', '../../../wp-demos/').replace('src="img/', 'src="../img/')
s = s.replace('wp-demos/law-pl/', 'wp-demos/law/').replace('wp-demos/restaurant-pl/', 'wp-demos/restaurant/')
pairs = [
    ('<html lang="pl">', '<html lang="en">'),
    ('<title>Podwykonawca white label dla agencji: strony i sklepy WordPress</title>', '<title>White-label WordPress partner for agencies: websites and shops</title>'),
    (re.search(r'<meta name="description" content="[^"]*">', s).group(0), '<meta name="description" content="WordPress websites and WooCommerce shops for agencies, under the agency\'s brand: one page 1,200 PLN, 5–10 page site 2,500 PLN, shop from 3,500 PLN, maintenance from 300 PLN a month. NDA, transfer of rights, payment via Useme.">'),
    ('<link rel="canonical" href="https://frameoneproduction-hash.github.io/portfolio/oferta/white-label/">', '<link rel="canonical" href="https://frameoneproduction-hash.github.io/portfolio/oferta/white-label/en/">'),
    ('<meta property="og:title" content="Podwykonawca white label dla agencji: WordPress i WooCommerce">', '<meta property="og:title" content="White-label WordPress partner for agencies">'),
    ('<meta property="og:description" content="Ty prowadzisz klienta, ja robię stronę pod Twoją marką. Stałe ceny, NDA, przeniesienie praw.">', '<meta property="og:description" content="You own the client, I build the site under your brand. Fixed prices, NDA, transfer of rights.">'),
    ('<meta property="og:url" content="https://frameoneproduction-hash.github.io/portfolio/oferta/white-label/">', '<meta property="og:url" content="https://frameoneproduction-hash.github.io/portfolio/oferta/white-label/en/">'),
    ('<meta property="og:locale" content="pl_PL">', '<meta property="og:locale" content="en_GB">'),
    ('<nav aria-label="Język"><a href="en/" hreflang="en" lang="en">English</a></nav>', '<nav aria-label="Language"><a href="../" hreflang="pl" lang="pl">Polski</a></nav>'),
    ('<p class="kicker">Dla agencji marketingowych i interaktywnych</p>', '<p class="kicker">For marketing and digital agencies</p>'),
    ('<h1>Podwykonawca white label: strony i sklepy WordPress</h1>', '<h1>White-label partner: WordPress websites and shops</h1>'),
    ('<p class="lead">Ty prowadzisz klienta i trzymasz marżę. Ja robię stronę pod Twoją marką: bez mojego logo, bez kontaktu z Twoim klientem, ze stałą ceną znaną przed wyceną dla klienta.</p>', '<p class="lead">You own the client and keep the margin. I build the site under your brand: no credit to me, no contact with your client, and a fixed price you know before you quote.</p>'),
    ('<div class="time">do 7 dni roboczych</div><ul><li>jedna strona z sekcjami</li><li>wersja mobilna</li><li>formularz kontaktowy</li><li>podstawowe SEO i RODO</li></ul>', '<div class="time">up to 7 business days</div><ul><li>one page with sections</li><li>mobile version</li><li>contact form</li><li>basic SEO and GDPR</li></ul>'),
    ('<h3>Strona 5–10 podstron</h3>', '<h3>Website, 5–10 pages</h3>'),
    ('<div class="time">do 14 dni roboczych</div><ul><li>do 10 podstron</li><li>edycja treści w WordPressie</li><li>formularze, mapa, blog</li><li>podstawowe SEO i RODO</li></ul>', '<div class="time">up to 14 business days</div><ul><li>up to 10 pages</li><li>content editing in WordPress</li><li>forms, map, blog</li><li>basic SEO and GDPR</li></ul>'),
    ('<h3>Sklep WooCommerce</h3>', '<h3>WooCommerce shop</h3>'),
    ('<div class="time">od 15 dni roboczych</div><ul><li>do 50 produktów na start</li><li>płatności i dostawy</li><li>maile do klientów</li><li>regulamin wstawia klient</li></ul>', '<div class="time">from 15 business days</div><ul><li>up to 50 products to start</li><li>payments and shipping</li><li>customer emails</li><li>terms provided by the client</li></ul>'),
    ('<h3>Opieka</h3>', '<h3>Maintenance</h3>'),
    ('<div class="time">za jedną stronę</div><ul><li>aktualizacje WordPressa i wtyczek</li><li>kopie zapasowe</li><li>sprawdzenie po aktualizacji</li><li>drobne zmiany w treści</li></ul>', '<div class="time">per website</div><ul><li>WordPress and plugin updates</li><li>backups</li><li>check after each update</li><li>small content changes</li></ul>'),
    ('<small>/ mies.</small>', '<small>/ month</small>'),
    ('<p class="small">Ceny netto dla agencji. Projekt graficzny według Twojej makiety (Figma, PDF) albo od zera w ramach ceny; 2 rundy poprawek w każdym pakiecie. Większe lub nietypowe projekty wyceniam przed startem.</p>', '<p class="small">Net prices for agencies. Design from your mockup (Figma, PDF) or from scratch within the price; 2 rounds of revisions in every package. Larger or unusual projects are quoted before we start.</p>'),
    ('<h2>Jak pracuję pod Twoją marką</h2>', '<h2>How I work under your brand</h2>'),
    ('<h3>Bez śladu podwykonawcy</h3><p>Żadnego „wykonanie: …” w stopce, w kodzie ani w panelu. Konta, wtyczki i licencje są na danych Twojego klienta albo Twoich.</p>', '<h3>No trace of a subcontractor</h3><p>No “made by …” in the footer, the code or the admin. Accounts, plugins and licences are in your client’s name or yours.</p>'),
    ('<h3>Ty rozmawiasz z klientem</h3><p>Nie kontaktuję się z Twoim klientem. Pytania i postępy idą do Ciebie, na piśmie, z podglądem strony do pokazania.</p>', '<h3>You talk to the client</h3><p>I never contact your client. Questions and progress go to you, in writing, with a preview link you can show.</p>'),
    ('<h3>NDA i prawa autorskie</h3><p>Podpisuję NDA na Twoim wzorze przed startem. Autorskie prawa majątkowe przechodzą na Twoją agencję w umowie przez Useme.</p>', '<h3>NDA and copyright</h3><p>I sign your NDA before we start. Copyright in the work is transferred to your agency in the contract made through Useme.</p>'),
    ('<h3>Stała cena i termin</h3><p>Znasz koszt, zanim wycenisz projekt klientowi. Termin podaję na starcie i trzymam go albo uprzedzam wcześniej, dlaczego się przesuwa.</p>', '<h3>Fixed price and deadline</h3><p>You know the cost before you quote your client. I give a deadline at the start and keep it, or warn you early if it moves and why.</p>'),
    ('<h3>Standard techniczny</h3><p>Wersja mobilna sprawdzana na telefonie, formularze testowane, teksty alternatywne, kontrast, baner cookies. Bez ciężkich kreatorów stron, chyba że ich chcesz.</p>', '<h3>Technical standard</h3><p>Mobile version checked on a phone, forms tested, alt text, contrast, cookie banner. No heavy page builders unless you want them.</p>'),
    ('<h3>Przekazanie</h3><p>Strona na hostingu Twojego klienta lub Twoim, kopia zapasowa i krótka instrukcja edycji, którą możesz dać klientowi pod swoim logo.</p>', '<h3>Handover</h3><p>The site on your client’s hosting or yours, a backup and a short editing guide you can give the client under your logo.</p>'),
    ('<h2>Jak zaczynamy</h2>', '<h2>How we start</h2>'),
    ('<li><strong>Brief</strong>Przesyłasz brief, makietę albo przykłady. Odpowiadam z terminem w ciągu dnia roboczego.</li>', '<li><strong>Brief</strong>Send a brief, a mockup or examples. I reply with a deadline within one business day.</li>'),
    ('<li><strong>NDA i umowa</strong>NDA na Twoim wzorze, umowa i płatność do depozytu przez Useme.</li>', '<li><strong>NDA and contract</strong>Your NDA, then a contract and payment held by Useme until you accept the work.</li>'),
    ('<li><strong>Realizacja</strong>Podgląd strony na serwerze testowym, 2 rundy poprawek.</li>', '<li><strong>Build</strong>A preview on a test server, 2 rounds of revisions.</li>'),
    ('<li><strong>Przekazanie</strong>Wdrożenie, kopia, instrukcja. 14 dni bezpłatnych poprawek błędów.</li>', '<li><strong>Handover</strong>Launch, backup, guide. 14 days of free bug fixes.</li>'),
    ('<h2>Przykłady</h2>', '<h2>Examples</h2>'),
    ('alt="Strona kancelarii na WordPressie, projekt koncepcyjny"', 'alt="Law firm website on WordPress, concept project"'),
    ('<strong>Kancelaria na WordPressie</strong><span>Projekt koncepcyjny, firma fikcyjna. Bloki Gutenberga, edycja treści w panelu.</span>', '<strong>Law firm on WordPress</strong><span>Concept project, fictional company. Gutenberg blocks, content edited in the admin.</span>'),
    ('alt="Strona restauracji na WordPressie, projekt koncepcyjny"', 'alt="Restaurant website on WordPress, concept project"'),
    ('<strong>Restauracja na WordPressie</strong><span>Projekt koncepcyjny, firma fikcyjna. Karta dań i rezerwacja w jednym miejscu.</span>', '<strong>Restaurant on WordPress</strong><span>Concept project, fictional company. Menu and booking in one place.</span>'),
    ('alt="Strona testowa z pokazowego audytu WordPress po naprawie"', 'alt="Test site from the demo WordPress audit, after fixes"'),
    ('<strong>Audyt i naprawa WordPressa</strong><span>Strona testowa przygotowana do pokazu: 8,3 MB → 77 kB, 18 problemów naprawionych.</span>', '<strong>WordPress audit and fixes</strong><span>A test site built for the demo: 8.3 MB → 77 kB, 18 issues fixed. In Polish.</span>'),
    ('<p class="small">To projekty koncepcyjne. Prace dla agencji zostają pod Twoją marką i nie trafiają do mojego portfolio bez Twojej zgody.</p>', '<p class="small">These are concept projects. Work for agencies stays under your brand and never goes into my portfolio without your permission.</p>'),
    ('<h2>Częste pytania</h2>', '<h2>FAQ</h2>'),
    ('<details><summary>Czy podpiszesz NDA?</summary><p>Tak, na Twoim wzorze, przed przesłaniem danych klienta.</p></details>', '<details><summary>Will you sign an NDA?</summary><p>Yes, your template, before you share any client data.</p></details>'),
    ('<details><summary>Jak wygląda faktura?</summary><p>Rozliczamy się przez Useme: płatność trafia do depozytu i jest wypłacana po akceptacji pracy, a Twoja agencja dostaje fakturę VAT od Useme.</p></details>', '<details><summary>How does invoicing work?</summary><p>Through Useme: the payment is held until you accept the work, and your agency gets a VAT invoice from Useme.</p></details>'),
    ('<details><summary>Czy potrzebuję dawać dostęp do kont klienta?</summary><p>Do hostingu i panelu najlepiej przez osobne konto użytkownika dla mnie; nie podawaj swoich haseł ani haseł klienta.</p></details>', '<details><summary>Do I need to share client logins?</summary><p>For hosting and the admin, please create a separate user account for me; never share your own or your client’s passwords.</p></details>'),
    ('<details><summary>Czy robisz też inne rzeczy niż WordPress?</summary><p>Tak: audyty dostępności, lokalizację sklepów, automatyzacje. Napisz, czego potrzebuje Twój klient.</p></details>', '<details><summary>Do you do more than WordPress?</summary><p>Yes: accessibility audits, shop localisation, automations. Tell me what your client needs.</p></details>'),
    ('<details><summary>Czy przyjmujesz stałą współpracę?</summary><p>Tak. Przy kilku projektach w miesiącu ustalamy stały termin startu i jeden kanał zgłoszeń.</p></details>', '<details><summary>Do you take ongoing work?</summary><p>Yes. With several projects a month we agree on a regular start slot and one channel for requests.</p></details>'),
    ('<div><h2>Wyślij brief pierwszego projektu</h2><p>Odpowiem z terminem i ceną w ciągu dnia roboczego.</p></div>', '<div><h2>Send the brief for your first project</h2><p>I’ll reply with a deadline and price within one business day.</p></div>'),
    ('<a class="btn" href="https://useme.com/pl/roles/contractor/maria-www-aplikacje-ai,722622/">Napisz przez Useme</a>', '<a class="btn" href="https://useme.com/en/roles/contractor/maria-www-aplikacje-ai,722622/">Message me on Useme</a>'),
    ('<footer>Maria | WWW · Aplikacje · AI, rozliczenia przez Useme. Przykłady na tej stronie to projekty koncepcyjne firm fikcyjnych.</footer>', '<footer>Maria | WWW · Aplikacje · AI, payments via Useme. The examples on this page are concept projects for fictional companies.</footer>'),
]
for a, b in pairs:
    assert a in s, a[:70]
    s = s.replace(a, b)
s = s.replace('1 200 zł <small>netto</small>', '1,200 PLN <small>net</small>').replace('2 500 zł <small>netto</small>', '2,500 PLN <small>net</small>').replace('od 3 500 zł <small>netto</small>', 'from 3,500 PLN <small>net</small>').replace('od 300 zł', 'from 300 PLN')
left = [w for w in ['zł', 'Przykład', 'Ceny', 'netto', 'dni robocz'] if w in s]
open(os.path.join(HERE, 'index.html'), 'w', encoding='utf-8').write(s)
print('left PL words:', left)
