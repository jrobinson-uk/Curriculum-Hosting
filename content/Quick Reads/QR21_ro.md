---
title: Gândire Computațională 2.0
lang: Romanian
translatedFrom: "[QR21](QR21.md)"
aliases:
  - QR21_ro
draft:
cssclasses:
  - quick_read
list_hide: true
sidebar: false
---

**Gândirea computațională** (Computational Thinking - CT), a devenit o piatră de temelie a educației în domeniul informaticii. Conceptul de gândire computațională 2.0 (CT2.0) a fost introdus recent de Matti Tedre și echipa sa[^1] pentru a-i ajuta pe elevi să distingă între abordările tradiționale bazate pe reguli (CT1.0) pentru a rezolva probleme și abordările bazate pe date (CT2.0) folosite de sistemele de inteligență artificială. Pe măsură ce sistemele includ din ce în ce mai mult atât elemente bazate pe reguli, cât și elemente bazate pe date, este esențial ca elevii să înțeleagă diferențele și să poată lucra cu ambele paradigme.

>[!example]- Summary
>## Concepte-cheie
>
>### Rezolvarea de probleme
>
>- CT1.0 aplică abordări bazate pe reguli pentru a rezolva probleme, precum cele utilizate în Scratch și Python.
>- CT2.0 aduce o schimbare spre o abordare bazată pe date pentru rezolvarea de probleme.
>- Evaluarea modelelor, calitatea datelor și prejudecățile din date devin importante în CT2.0, întrucât datele eronate pot duce la rezultate inechitabile.
>
>### Corectitudinea
>
>- În CT1.0 învățăm despre corectitudine că este binară – programele produc sau nu produc rezultate corecte.
>- În CT2.0 corectitudinea este măsurată pe niveluri – modelele de învățare automată generează predicții și scoruri de încredere.
>
>### Depanarea
>
>- În CT1.0, depanarea este structurată și transparentă. Erorile sunt remediate prin urmărirea execuției programului pas cu pas.
>- În CT2.0, modelele de învățare automată sunt ca niște „cutii negre” opace. Problemele sunt identificate prin analiza datelor de intrare și a rezultatelor.
>- Acest lucru necesită o schimbarea de mentalitate în ceea ce privește depanarea: trebuie să ne concentrăm pe îmbunătățirea datelor de antrenament, reglarea parametrilor și testarea cu seturi diverse de date.
>

![](../assets/img/quickreads/QR21_ro_CT_1.0_2.0.svg)

## Rezolvarea de probleme

Gândirea computațională este un cadru pentru înțelegerea rezolvării de probleme prin calcul. Gândirea computațională tradițională (CT1.0) a apărut din conceptele informaticii timpurii, folosind o abordare bazată pe reguli, în care programele de calculator urmează instrucțiuni precise: cu date de intrare bine definite, instrucțiunile sunt urmate pas cu pas pentru a produce un rezultat previzibil. Atunci când predăm despre CT1.0, elevii învață să împartă problema în mai multe părți și să scrie instrucțiuni clare pentru fiecare pas, înainte de a le implementa în aplicații precum Scratch sau în limbaje precum Python. În schimb, rezolvarea de problemele în CT2.0 se mută către o abordare bazată pe date¹. În loc să scrie instrucțiuni explicite, elevii învață să colecteze, să curețe, să eticheteze și să organizeze cantități mari de date relevante. Apoi folosesc aceste date pentru a antrena sisteme de învățare automată (Machine Learning - ML), care identifică tipare și creează modele capabile să genereze predicții și să rezolve probleme. De exemplu, în CT1.0, elevii ar putea crea un instrument care clasifică pisici folosind reguli de tipul „Dacă... atunci...” despre mustăți și urechi ascuțite. În CT2.0, ei ar folosi mai multe imagini cu pisici pentru a antrena un model care să le clasifice cu acuratețe. Deoarece datele sunt centrale în acest proces, calitatea datelor, evaluarea lor și prejudecățile din ele devin concepte critice: seturile de date defectuoase sau părtinitoare pot duce la rezultate care nu sunt de încredere sau sunt inechitabile. Aplicațiile moderne combină ambele abordări, și cea bazată pe reguli și cea bazată pe date — de la textele și imaginile generate cu IA, la aplicațiile de recunoaștere facială și recomandările de pe rețele sociale. Înțelegerea atât a CT1.0, cât și a CT2.0 le oferă elevilor încrederea de a lucra eficient cu aceste instrumente și de a fi participanți activi și creatori, nu doar consumatori pasivi, în societățile noastre tot mai bazate pe date[^2].

## Înțelegerea corectitudinii

Corectitudinea este un concept important în informatică și determină dacă un program funcționează așa cum s-a intenționat. În CT1.0, îi învățăm adesea pe elevi că această corectitudine se referă la faptul că un program este fie corect, fie incorect. Această abordare pune accent pe precizie: instrucțiunile trebuie să fie corecte, logice și să producă rezultatul așteptat. În CT1.0, programele bazate pe reguli presupun un nivel ridicat de transparență: fiecare instrucțiune este scrisă explicit și poate fi urmărită de la un capăt la altul, erorile pot fi identificate, iar corecțiile pot fi testate și implementate. În CT2.0, corectitudinea nu mai este definită rigid, un program nu mai poate fi catalogat doar ca fiind corect sau incorect. Rezultatele multor modele de învățare automată sunt predicții bazate pe probabilități, cu scoruri variabile de încredere[^1]. De exemplu, un model de învățare automată ar putea clasifica o imagine a unei pisici cu un scor de încredere de 95%. Chiar și modelele de învățare automată bine antrenate, în ciuda faptului că sunt antrenate pe cantități mari de date, ar putea produce erori, în special cu date de intrare noi. De exemplu, o imagine cu o pisică ar putea fi clasificată greșit drept câine, cu un scor de încredere de 60%. Dezvoltatorii definesc care sunt nivelurile acceptabile de corectitudine atunci când proiectează și construiesc modele de învățare automată. Acest lucru presupune ca dezvoltatorii să ajusteze cu atenție procesul de antrenament și să stabilească praguri de încredere adecvate pentru a determina dacă o predicție este acceptabilă într-un anumite context. Pentru profesori, această schimbare în înțelegerea corectitudinii necesită dezvoltarea gândirii critice în rândul tinerilor în legătură cu instrumentele bazate pe date și sistemele AI. I-am putea îndruma pe elevi să pună întrebări mai profunde precum: „Cât de fiabilă este această predicție cu date noi?” sau „Ce prejudecăți ar putea exista în datele de antrenament?” Astfel, corectitudinea în CT2.0 nu se mai referă la un rezultat fix, ci devine un proces continuu de evaluare și rafinare a modelelor pentru a le îmbunătăți rezultatele în aplicațiile din viața reală. Această perspectivă asupra corectitudinii îi pregătește pe elevi nu doar să utilizeze IA, ci să și recunoască limitările și potențialele efecte negative ale rezultatelor generate de aceste sisteme.

## Depanarea

Depanarea (debugging), este o altă practică ce ia forme diferite în CT1.0 și CT2.0. De exemplu, dacă un program bazat pe reguli, implementat în Scratch sau Python, nu funcționează cum trebuie, elevii pot afișa valorile variabilelor, pot seta puncte de oprire sau pot parcurge codul linie cu linie pentru a identifica eroarea. Datorită nivelului de transparență ridicat în astfel de programe, putem utiliza practici de depanare sistematice și structurate. Pe de altă pare, modelele de învățare automată sunt adesea văzute ca niște „cutii negre”[^3], iar această opacitate face depanarea mult mai dificilă. Modelele de învățare automată sunt rețele complicate, interconectate, cu miliarde de parametri care determină rezultatele și predicțiile, iar asta face imposibilă urmărirea lor pas cu pas. De exemplu, dacă un clasificator de imagini etichetează greșit o pisică drept câine, elevii pur și simplu nu au cum să găsească linia de cod care cauzează eroarea, deoarece nu există una. În schimb, depanarea în CT2.0 presupune analizarea și îmbunătățirea calității datelor de antrenament, reglarea variabilelor și a parametrilor și testarea cu un set divers de date pentru a identifica tipare în erori (de exemplu, pisicile cu urechi ascuțite sunt mai des clasificate greșit drept câini). Asta înseamnă că, în ceea ce privește depanarea, profesorii trebuie să treacă de la căutarea și identificarea erorilor din cod la a se concentra pe modul în care schimbările din date și parametrii pot afecta performanța sistemului.

## De ce gândirea computațională 2.0 este importantă

Fără CT2.0, elevii de azi vor rămâne consumatori pasivi, în loc să fie participanți informați într-o lume tot mai influențată de AI și tehnologiile bazate pe date. Integrarea CT2.0 alături de gândirea computațională tradițională le oferă elevilor o înțelegere corectă a sistemelor informatice, inclusiv a diferențelor în modul în care sunt abordate rezolvarea de probleme, corectitudinea și depanarea. Acest lucru le va da încrederea să evalueze critic modelele de învățare automată, să înțeleagă cum sunt folosite datele de antrenament, să identifice potențialele prejudecăți din date și chiar să-și creeze propriile lor proiecte de învățare automată. Adoptarea CT2.0 face ca informatica să fie mai realistă și mai conectată la lumea reală, oferindu-le elevilor căi către viitoare cariere dincolo de programarea tradițională, în care literația AI este crucială.

## Concepte-cheie

### Rezolvarea de probleme

- CT1.0 aplică abordări bazate pe reguli pentru a rezolva probleme, precum cele utilizate în Scratch și Python.
- CT2.0 aduce o schimbare spre o abordare bazată pe date pentru rezolvarea de probleme.
- Evaluarea modelelor, calitatea datelor și prejudecățile din date devin importante în CT2.0, întrucât datele eronate pot duce la rezultate inechitabile.

### Corectitudinea

- În CT1.0 învățăm despre corectitudine că este binară – programele produc sau nu produc rezultate corecte.
- În CT2.0 corectitudinea este măsurată pe niveluri – modelele de învățare automată generează predicții și scoruri de încredere.

### Depanarea

- În CT1.0, depanarea este structurată și transparentă. Erorile sunt remediate prin urmărirea execuției programului pas cu pas.
- În CT2.0, modelele de învățare automată sunt ca niște „cutii negre” opace. Problemele sunt identificate prin analiza datelor de intrare și a rezultatelor.
- Acest lucru necesită o schimbarea de mentalitate în ceea ce privește depanarea: trebuie să ne concentrăm pe îmbunătățirea datelor de antrenament, reglarea parametrilor și testarea cu seturi diverse de date.

### Referințe

[^1]: Tedre, M., et al. (2021). CT 2.0. [the-cc.io/qr21\_1](the-cc.io/qr21_1)

[^2]: Vartiainen, H., et al. (2021). Machine learning for middle schoolers: Learning through data-driven design. [the-cc.io/qr21\_2](the-cc.io/qr21_2)

[^3]: Hitron, T., et al. (2019). Can children understand machine learning concepts? The effect of uncovering black boxes. [the-cc.io/qr21\_3](the-cc.io/qr21_3)

[Source pdf](https://static.raspberrypi.org/files/curriculum/quickreads/21-Pedagogy_Summary_Computational_Thinking_2_2025.pdf)
