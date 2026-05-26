---
title: Informatinis mąstymas 2.0
lang: Lithuaniun
translatedFrom: "[QR21](QR21.md)"
aliases:
  - QR21_it
draft:
cssclasses:
  - quick_read
list_hide: true
sidebar: false
---

**Informatinis mąstymas (angl. Computational thinking, CT)** tapo kompiuterių mokslo kertiniu akmeniu. Matti Tedre ir jo komanda neseniai pristatė CT2.0[^1], kad padėtų besimokantiesiems atskirti tradicinius taisyklėmis pagrįstus problemų sprendimo metodus (CT1.0) nuo duomenimis pagrįstų metodų (CT2.0), kuriuos naudoja DI sistemos. Kadangi sistemose vis dažniau naudojami ir taisyklėmis, ir duomenimis pagrįsti elementai, besimokantiesiems labai svarbu suprasti jų skirtumus ir mokėti dirbti su abiem paradigmomis.


>[!example]- Summary
>## Pagrindinės sąvokos
>
>### Problemų sprendimas
>
>- CT1.0 taiko taisyklėmis pagrįstus problemų sprendimo metodus, panašius į tuos, kurie naudojami „Scratch“ ir „Python“.
>- CT2.0 pereina prie duomenimis pagrįsto požiūrio į problemų sprendimą.
>- Modelio vertinimas, duomenų kokybė ir šališkumas tampa svarbūs CT2.0, nes ydingi duomenys gali lemti nesąžiningus rezultatus.
>
>### Teisingumas
>
>- CT1.0 paprastai moko, kad teisingumas yra dvejetainis, o programos arba generuoja, arba negeneruoja teisingų rezultatų.
>- CT2.0 matuoja tikslumo laipsnį, o MM modeliai generuoja prognozes ir patikimumo lygius.
>
>### Trikdžių šalinimas
>
>- CT1.0 atveju trikdžių šalinimas yra struktūrizuotas ir skaidrus. Klaidos sprendžiamos stebint programos vykdymą žingsnis po žingsnio.
>- CT2.0 atveju MM modeliai primena neskaidrias juodąsias dėžes. Problemos nustatomos analizuojant įvesties ir išvesties duomenis.
>- Tam reikia pakeisti trikdžių šalinimo mąstyseną, daugiausia dėmesio skiriant mokymo duomenų tobulinimui, parametrų derinimui ir testavimui su įvairiais duomenimis.
>

![](../assets/img/quickreads/QR21_lt_CT_1.0_2.0.svg)

## Problemų sprendimas

CT yra sistema, skirta suprasti problemų sprendimą naudojant skaičiavimus. Tradicinis CT1.0 atsirado iš ankstyvųjų skaičiavimo sąvokų, naudojant taisyklėmis pagrįstą metodą, pagal kurį kompiuterinės programos vykdo tikslius nurodymus: esant gerai apibrėžtai įvesties informacijai, nurodymai yra vykdomi žingsnis po žingsnio, kad būtų gautas nuspėjamas rezultatas. Mokymui naudojant CT1.0, besimokantieji išmoksta suskaidyti užduotį į dalis ir parašyti aiškius nurodymus kiekvienam žingsniui, prieš įgyvendinant šiuos nurodymus tokiose priemonėse, kaip „Scratch“ ir tokiose kalbose, kaip „Python“. Priešingai, problemų sprendimas taikant CT2.0 naudoja duomenimis pagrįstus metodus¹. Užuot rašę aiškius nurodymus, besimokantieji išmoksta rinkti, valyti, žymėti ir tvarkyti didelius kiekius svarbių duomenų. Tada besimokantieji naudoja šiuos duomenis mašininio mokymosi (MM) sistemoms apmokyti, kad jos atpažintų modelius ir generuotų prognozes bei išspręstų problemas. Pavyzdžiui, pagal CT1.0 metodą, klasėje besimokantieji galėtų sukurti įrankį, kuris klasifikuotų kates pagal „If...Then“ taisykles apie ūsus ir smailias ausis. Tačiau pagal CT2.0 modelį, jie naudotų daug kačių atvaizdų, kad pakankamai tiksliai apmokytų modelį. Kadangi duomenys yra šio proceso pagrindas, duomenų kokybė, vertinimas ir šališkumas tampa itin svarbiomis sąvokomis: ydingi arba šališki duomenų rinkiniai gali lemti nepatikimus arba nesąžiningus rezultatus. Šiuolaikinės programos derina ir taisyklėmis, ir duomenimis pagrįstus metodus – nuo DI generuojamo teksto ir vaizdų iki veido atpažinimo programinės įrangos ir socialinių tinklų rekomendacijų. Suprasdami ne tik CT1.0, bet ir CT2.0, besimokantieji gali ne tik efektyviai dirbti su šiais įrankiais, bet ir būti aktyviais dalyviais bei kūrėjais, o ne pasyviais vartotojais mūsų vis labiau duomenimis pagrįstoje visuomenėje[^2].

## Teisingumo suvokimas

Teisingumas yra svarbi skaičiavimo sąvoka, lemianti, ar programa veikia taip, kaip numatyta. Pagal CT1.0 metodą dažnai mokome besimokančiuosius, kad teisingumas reiškia, jog programa yra arba teisinga, arba neteisinga. Šis metodas pabrėžia tikslumą, kai nurodymai turi būti sintaksiškai taisyklingi, parašyti logiškai ir duoti laukiamą rezultatą. CT1.0 būdingos taisyklėmis pagrįstos programos reikalauja didelio skaidrumo – kiekvienas nurodymas yra parašytas aiškiai ir atsekamas, todėl galima nustatyti klaidas, išbandyti ir įdiegti pataisymus. Pagal CT2.0 metodą, teisingumas nereiškia tik „teisingas“ arba „neteisingas“. Daugelio MM modelių rezultatai yra paremti tikimybe pagrįstomis prognozėmis, kurių patikimumo lygis gali būti skirtingas[^1]. Pavyzdžiui, MM modelis gali klasifikuoti katės nuotrauką 95 % patikimumu. Net ir gerai apmokyti MM modeliai, nepaisant to, kad jie apmokyti dirbti su dideliais duomenų kiekiais, gali generuoti klaidas, ypač naudojant naujus įvesties duomenis. Pavyzdžiui, katės atvaizdas gali būti neteisingai klasifikuojamas kaip šuns kai patikimumo rodiklis yra 60 %. Kūrėjai apibrėžia priimtinus teisingumo lygius projektuodami ir kurdami MM modelius. Tam reikia, kad kūrėjai atidžiai suderintų apmokymo procesą ir nustatytų tinkamas patikimumo ribas, nustatančias, ar prognozė yra priimtina konkrečiame kontekste. Pasikeitus teisingumo sąvokai pedagogai turi padėti jauniems žmonėms lavinti kritinio mąstymo įgūdžius, susijusius su duomenimis pagrįstais įrankiais ir DI sistemomis. Galėtume padėti besimokantiesiems užduoti gilesnius klausimus: „Kiek patikima ši prognozė remiantis naujais duomenimis?“ arba „Kokie šališkumai gali būti mokymo duomenyse?“ Pagal CT2.0 metodą, apibrėždami teisingumą ar tinkamumą kaip nuolatinį vertinimo procesą ir nuolatinį modelių tobulinimą, siekiant pagerinti jų patikimumą realiose taikomosiose programose, o ne gauti fiksuotą rezultatą, mes ruošiame besimokančiuosius ne tik naudoti DI įrankius, bet ir atpažinti sistemos apribojimus bei galimą žalą, kurią daro sistemos išvediniai.

## Trikdžių šalinimas

Trikdžių šalinimu vadinama dar viena praktika, kuri CT1.0 ir CT2.0 metoduose įgauna skirtingas formas. Pavyzdžiui, jei taisyklėmis pagrįsta programa, įdiegta „Scratch“ arba „Python“, neveikia taip, kaip tikėtasi, besimokantieji gali matyti kintamąsias reikšmes, nustatyti lūžio taškus arba atsekti kodą eilutė po eilutės, kad surastų, kur įvyko klaida. Dėl didelio tokių programų skaidrumo galime naudoti sistemingas ir struktūrizuotas trikdžių šalinimo praktikas. Tačiau MM modeliai dažnai laikomi juodosiomis dėžėmis[^3] ir jų neskaidrumas apsunkina trikdžių šalinimą taikant CT2.0 metodą. MM modeliai yra sudėtingi, tarpusavyje susiję tinklai su milijardais parametrų, kurie lemia rezultatus ir prognozes tokiais būdais, kurių neįmanoma atsekti žingsnis po žingsnio. Kai vaizdų klasifikatorius neteisingai pažymi katės vaizdą kaip šuns, besimokantieji negali tiesiog rasti klaidą sukeliančios kodo eilutės, nes tokios nėra. Vietoj to, CT2.0 trikdžių šalinimas apima mokymo duomenų kokybės tikrinimą ir gerinimą, kintamųjų ir parametrų derinimą bei testavimą su įvairiais įvesties duomenimis, siekiant nustatyti klaidų modelius (pvz., katės su smailiomis ausimis dažniau klaidingai klasifikuojamos kaip šunys). Trikdžių šalinimas nuo šiol reikalauja, kad pedagogai susitelktų ne į klaidų paieškas ir taisymą, o į tai, kaip duomenų ir parametrų pakeitimai gali paveikti bendrą rezultatą.

## Kuo svarbus CT2.0

Be CT2.0, šiandieniniai besimokantieji liks pasyvūs vartotojai, o ne informuoti dalyviai pasaulyje, kurį vis labiau formuoja duomenimis pagrįstos DI technologijos. Sujungdami CT2.0 su tradiciniu informatiniu mąstymu, besimokantieji įgyja tikslų supratimą apie skaičiavimo sistemas, įskaitant tai, kuo duomenimis pagrįstose sistemose skiriasi problemų sprendimas, teisingumas ir trikdžių šalinimas. Tai suteikia besimokantiesiems galimybę kritiškai vertinti MM modelius, suprasti, kaip duomenys yra naudojami modeliams mokyti, nustatyti galimus šališkumus ir netgi kurti savo mašininio mokymosi projektus. CT2.0 diegimas daro kompiuteriją realistiškesne ir labiau atspindinčia tikrąjį pasaulį, siūlydamas besimokantiesiems kelius, peržengiančius tradicinio programavimo ribas, link būsimų karjeros galimybių, kuriose gebėjimas naudotis DI yra labai svarbus.


### Šaltiniai

[^1]: Tedre, M., et al. (2021). CT 2.0. [the-cc.io/qr21\_1](the-cc.io/qr21_1)

[^2]: Vartiainen, H., et al. (2021). Machine learning for middle schoolers: Learning through data-driven design. [the-cc.io/qr21\_2](the-cc.io/qr21_2)

[^3]: Hitron, T., et al. (2019). Can children understand machine learning concepts? The effect of uncovering black boxes. [the-cc.io/qr21\_3](the-cc.io/qr21_3)

[Šaltinio pdf](https://static.raspberrypi.org/files/curriculum/quickreads/21-Pedagogy_Summary_Computational_Thinking_2_2025.pdf)
