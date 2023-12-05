# golay.js
### Golėjaus kodo implementacija JavaScript kalba

## Kas implementuota
Vektoriaus, teksto, nuotraukos užkodavimas, dekodavimas

## Bibliotekos
Implementacija nenaudoja jokių bibliotekų

## Programos paleidimas
Norint naudoti programa užtenka `ui.html` failą atidaryti naršyklėje.

## Programos failai
`binaryMatrix.js`- klasė, skirta dirbti su dvejatainėmis matricomis
`constants.js`- konstantinės matricos G, H, B
`golayCode.js` - klasė kuri užkoduoja, dekoduoja dvejaitine matrica
`utils.js`- pagalbinės funkcijos
`ui.html, styles.css ui.js handleImage.js handleText.js` - failai dirbantys su vartotojo sąsaja

## Naudojimo instrukcija
1. Spausti `Random Input`, bus užplidyta atsitiktinai sugeneruotas vektorius kurį reikia užkoduoti. Vektorių galima redaguoti.
<img width="576" alt="image" src="https://github.com/kristupas-g/golay.js/assets/78504062/51285f9d-19a7-4b9b-8b07-2ce1e53c610a">

2. Spausti `Encode`, vektorius bus užkoduotas.
   
<img width="566" alt="image" src="https://github.com/kristupas-g/golay.js/assets/78504062/c9b98960-9dc4-469f-a249-8244bb081e45">

3. Pasirinkti klaidos tikimybe `Error chance` lauke

<img width="582" alt="image" src="https://github.com/kristupas-g/golay.js/assets/78504062/d6095b58-2440-4c49-8160-2b3d7d971ae2">

6. Spausti `Add Noise & Transmit`, pridėta klaidų, rezultatas įrašomas į `Transmitted Vector`lauką.

<img width="560" alt="image" src="https://github.com/kristupas-g/golay.js/assets/78504062/ca733cbe-e964-4249-9528-cdf2e0695aa3">

8. Spausti `Decode`, vektorius gautas iš dekodavimo funkcijos bus `Decoded Vector`laukelyje, o galutinis rezultatas `Result`laukelyje
   
<img width="578" alt="image" src="https://github.com/kristupas-g/golay.js/assets/78504062/db05c6a3-3218-461d-a5cb-65efc8362d4c">.

10. Norint užokduoti nuotrauką spausti `Browse`mygtuką ir pasirinkti `bmp`nuortauką. Ekrane atsiras originali nuotrauka, nuotrauka siusta be kodavimo, nuotrauka siųsta su kodavimu.

<img width="486" alt="image" src="https://github.com/kristupas-g/golay.js/assets/78504062/7f1b6028-7616-49af-936a-f02195af4744">

12. Norint užkoduoti tekstą užpildykite `Text to encode` lauką

<img width="608" alt="image" src="https://github.com/kristupas-g/golay.js/assets/78504062/121e0eba-4664-4d21-8255-63d210dd8e86">

Spauskite `Go`mygtuką 

<img width="570" alt="image" src="https://github.com/kristupas-g/golay.js/assets/78504062/f8044962-23f6-4021-8c7a-de6b1a4f7209">

Ekrane atsiras tekstas su klaidomis ir užkoduotas tekstas siųstas kanalu ir dekoduotas.





## Literatūros sąrašas
[Specifikacija](https://klevas.mif.vu.lt/~skersys/doc/ktkt/literatura12.pdf)
