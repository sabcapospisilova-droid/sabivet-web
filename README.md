# SabiVet

První funkční statická verze webu terénní veterinární praxe MVDr. Sabiny Pospíšilové. HTML, CSS a JavaScript, bez instalace závislostí, sestavování a administrace. Žádné veřejné nasazení není nastaveno.

## Jak web zobrazit

Stáhněte celý projekt (ne jen HTML), rozbalte jej a otevřete `index.html` v běžném prohlížeči. Fotografie, písma a styly se načítají místně, internet není nutný. Externí odkazy samozřejmě připojení potřebují.

Volitelně z adresáře projektu spusťte:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Na stejném počítači pak otevřete `http://127.0.0.1:8000`. Server zpřístupňuje web pouze lokálně; zastavíte jej pomocí Ctrl+C. Adresu cloudového localhostu nelze otevřít na vlastním počítači.

Pro kontrolu mobilu zapněte ve vývojářských nástrojích prohlížeče režim zařízení, případně zúžte okno. Zkontrolujte úvod, obě fotografie O mně, seznamy služeb, kontakt a mobilní Menu. Odkazy na telefon a e-mail otevírají příslušnou aplikaci; web neposílá formulář.

## Předloha a současná omezení

Zdrojem je dodané `sabivet (1).pdf`, výhradně strany 1–4. Strany 5–7 nejsou použity. Texty zůstávají podle PDF, včetně původního znění „porody a hříbat“ a „dermatologická problémy“. Případné jazykové opravy je vhodné nejprve odsouhlasit.

Strana 3 obsahuje šest bloků: dvě varianty každé skupiny služeb. Na webu je každá skupina jednou, v pořadí Koně, Psi a kočky, Přežvýkavci; zvoleno první zobrazení každé skupiny. U psů a koček je tedy fotografie vlevo. Seznam služeb pochází z této varianty. Opakované navigace jsou nahrazeny jednou horní navigací. Na mobilu jsou fotografie a texty pod sebou, s vodorovnými nadpisy.

Fotografie, pergamen, logo, mapa a QR byly přímo vytaženy z PDF, nejsou nahrazeny jinými obrázky. Rozlišení odpovídá exportu PDF, nikoli originálním fotografiím. Okraje fotografií a jejich přechody jsou přiblíženy pomocí CSS, přesné masky z Canvy zatím nejsou k dispozici. Původní vektorové ikony a svislá dekorativní linka jsou převedeny přímo z PDF do `assets/icons/`. Použity jsou původní Instagram, Facebook, telefon (obrysový i plný), obálka, adresa, směrovník, cestovné a ikony osoby, stáje a srdce. Tlačítko mobilního menu používá jednoduché jednobarevné SVG, protože v desktopové předloze mobilní tlačítko není. Barevné emoji web nepoužívá.

Písma Cormorant Garamond, Forum, Wellfleet, Quintessential a Lora byla identifikována ve stranách 1–4 PDF. Úplná písma s českými znaky jsou uložena místně v `assets/fonts/`, stažená z oficiálního repozitáře `https://github.com/google/fonts/tree/main/ofl` včetně licencí OFL. Prohlížeč je při zobrazení webu nestahuje z žádné externí služby.

Odkazy na telefon, e-mail, mapy a PetExpert jsou převzaté z PDF. Názvy sociálních profilů jsou zatím pouze text: skutečné cílové adresy nebyly v prvních čtyřech stranách PDF uvedeny, proto nejsou domyšlené.

## Jak upravovat

- Texty, kontakty a seznamy služeb: `index.html`, sekce jsou označeny ID `uvod`, `o-mne`, `sluzby`, `kontakt`.
- Fotografie a grafika: `assets/images/`; podrobnosti a požadované originály v `PODKLADY.md`.
- Barvy, velikosti, rozvržení a mobilní verze: `style.css`. Vínová barva je v proměnné `--wine`; jde o vizuální přiblížení PDF, přesný HEX může dodat autorka.
- Mobilní menu, Escape a zvýraznění odkazu dle adresy: `script.js`.

Při změně obrázků zachovejte názvy, nebo upravte cestu v HTML/CSS. Při změně poměru stran upravte také HTML `width` a `height`. U fotografií ponechte vhodný popis `alt`.

## Budoucí práce v cloudu

Použijte existující checkout `/workspace/sabivet-web`. Úloha je již izolovaná; nevytvářejte další Git worktree, pokud o něj uživatel výslovně nepožádá. Není nutný instalační příkaz. Živé procesy nemusí po obnovení prostředí přežít; místní server případně spusťte uvedeným příkazem. Nevytvářejte veřejné nasazení bez pokynu uživatele.


## Upravená verze (listopad 2026)
Web je rozdělen do čtyř stránek: index.html, o-mne.html, sluzby.html, kontakt.html. Otevírejte index.html ze **zcela rozbalené** složky, ne přímo ze ZIPu. Všechny soubory assets musí zůstat vedle HTML. Úvodní obrázek uvod.png má pouze 800 × 532 px; pro vyšší ostrost jej nahraďte originálem ve větším rozlišení při zachování názvu. Velká mapa odstraněna, malá odkazuje na původní Google Mapy.
