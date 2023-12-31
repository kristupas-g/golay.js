# golay.js

## Golėjaus kodo implementacija JavaScript kalba

### Kas implementuota

Vektoriaus, teksto, nuotraukos užkodavimas, dekodavimas

### Darbo valandos
Implementacija su vartotojo sąsaja užtruko ~8 valandas

### Bibliotekos

Implementacija nenaudoja jokių bibliotekų

### Programos paleidimas

Norint naudoti programą užtenka `ui.html` failą atidaryti naršyklėje.

### Programos failai

- `binaryMatrix.js` - klasė, skirta dirbti su dvejatainėmis matricomis
- `constants.js` - konstantinės matricos G, H, B
- `golayCode.js` - klasė, kuri užkoduoja ir dekoduoja dvejatainę matricą
- `utils.js` - pagalbinės funkcijos
- `ui.html`, `styles.css`, `ui.js`, `handleImage.js`, `handleText.js` - failai, dirbantys su vartotojo sąsaja

### Priimti programiniai sprendimai

Jei įvesties ilgis nėra 12 kartotinis, bus pridėta `n` 0 prie įvesties vektoriaus prieš užkoduojant. Dekodavus pridėti 0 yra pašalinami.

### Eksperimentai

Tyrinėjama implementacijos našumas užkoduojant ir dekoduojant skirtingo dydžio nuotraukas su skirtingomis tikimybėmis klaidai įvykti. X ašyje matome paveikslėlių rezoliuciją, o Y ašyje matome pasirinktą tikimybę įvykti klaidai. Visi duomenys pateikti milisekundėmis.

Vizuolizuotus duomenis galima pažiūrėti skyriuje *Lentelės*

#### Užkodavimas

| 32x32 | 64x64 | 128x128 |
| ----- | ----- | ------- |
| 72    | 1137  | 17763   |


#### Dekodavimas

|   | 32x32 | 64x64 | 128x128 |
| - | ----- | ----- | ------- |
| 0 | 54    | 620   | 8894    |
| 3 | 63    | 624   | 8966    |
| 6 | 65    | 642   | 8967    |
| 9 | 62    | 663   | 9283    |


#### Išvados

Iš duomenų matome, kad padarytas klaidų kiekis neturi įtakos dekodavimo procesui. Kadangi matome, kad užkodavimo algoritmas trunka ilgai, galima teigti, kad norint pagreitinti algoritmą reikėtų optimizuoti matricos daugybos funkciją.

### Naudojimo instrukcija

1. Spausti `Random Input`, bus užpildytas atsitiktinai sugeneruotas vektorius, kurį reikia užkoduoti. Vektorių galima redaguoti.

   ![](https://github.com/kristupas-g/golay.js/assets/78504062/51285f9d-19a7-4b9b-8b07-2ce1e53c610a)

2. Spausti `Encode`, vektorius bus užkoduotas.

   ![](https://github.com/kristupas-g/golay.js/assets/78504062/c9b98960-9dc4-469f-a249-8244bb081e45)

3. Pasirinkti klaidos tikimybę `Error chance` lauke.

   ![](https://github.com/kristupas-g/golay.js/assets/78504062/d6095b58-2440-4c49-8160-2b3d7d971ae2)

4. Spausti `Add Noise & Transmit`, pridėta klaidų, rezultatas įrašomas į `Transmitted Vector` lauką.

   ![](https://github.com/kristupas-g/golay.js/assets/78504062/ca733cbe-e964-4249-9528-cdf2e0695aa3)

5. Spausti `Decode`, vektorius gautas iš dekodavimo funkcijos bus `Decoded Vector` laukelyje, o galutinis rezultatas `Result` laukelyje.

   ![](https://github.com/kristupas-g/golay.js/assets/78504062/db05c6a3-3218-461d-a5cb-65efc8362d4c)

6. Norint užkoduoti nuotrauką spausti `Browse` mygtuką ir pasirinkti `bmp` nuotrauką. Ekrane atsiras originali nuotrauka, nuotrauka siunčiama be kodavimo, nuotrauka siunčiama su kodavimu.

   ![](https://github.com/kristupas-g/golay.js/assets/78504062/7f1b6028-7616-49af-936a-f02195af4744)

7. Norint užkoduoti tekstą užpildykite `Text to encode` lauką.

   ![](https://github.com/kristupas-g/golay.js/assets/78504062/121e0eba-4664-4d21-8255-63d210dd8e86)

   Spauskite `Go` mygtuką.

   ![](https://github.com/kristupas-g/golay.js/assets/78504062/f8044962-23f6-4021-8c7a-de6b1a4f7209)

   Ekrane atsiras tekstas su klaidomis ir užkoduotas tekstas siunčiamas kanalu ir dekoduotas.

## Literatūros sąrašas

[Specifikacija](https://klevas.mif.vu.lt)

## Lenteles 

![encoding graph](https://github.com/kristupas-g/golay.js/assets/78504062/dde8c8d0-e7dc-47f0-90d3-ae45b7903197)
![decoding graph](https://github.com/kristupas-g/golay.js/assets/78504062/f6f1d319-62d2-4f2b-87e5-a7588af78946)