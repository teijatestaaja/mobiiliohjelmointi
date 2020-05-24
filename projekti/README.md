# Mobiiliohjelmointi 2020 - loppuprojekti

Tekijä: Teija Alasalmi

Loppuprojektini aiheena on [React Native](https://reactnative.dev/) -mobiilisovellus, jolla voi hakea maita englanninkielisestä [REST Countries APIsta](https://restcountries.eu/). Jos hakuehdon täyttäneitä maita on alle 10, sovellus näyttää hakuehdon täyttäneet maat listassa. Käyttäjä voi valita tarkasteluun yksittäisen maan tarkemmat tiedot, jolloin sovellus näyttää maan tiedoista

- lipun
- pääkaupungin
- asukasmäärän
- kaikki maan viralliset kielet

Käyttäjä voi navigoida maan tiedoista takaisin hakusivulle. Lisäksi sovellus tallentaa ja näyttää aiemmat hakusanat, ja käyttäjä voi tyhjentää hakuhistorian.

Esittelyvideot: [osa 1](https://github.com/teijatestaaja/mobiiliohjelmointi/tree/master/projekti/esittely/esittely_osa1.MOV), [osa2](https://github.com/teijatestaaja/mobiiliohjelmointi/tree/master/projekti/esittely/esittely_osa2.MOV)

Kuvat:

![Etusivu](https://github.com/teijatestaaja/mobiiliohjelmointi/tree/master/projekti/esittely/etusivu.png "Etusivu")
![Maan tiedot](https://github.com/teijatestaaja/mobiiliohjelmointi/tree/master/projekti/esittely/maan_tiedot.png "Maan tiedot")
![Hakuhistoria](https://github.com/teijatestaaja/mobiiliohjelmointi/tree/master/projekti/esittely/etusivu.png "Hakuhistoria")

## Sovelluksen komponentit

- [App.js](App.js) - Pääkomponentti
- [Home.js](Home.js) - Hakusivu
- [CountryInfo.js](CountryInfo.js) - Maan tietojen näyttäminen
- [SearchHistory.js](SearchHistory.js) - Hakuhistorian näyttäminen

## Käytetyt teknologiat, kirjastot, valmiit komponentit ja API:t

- [React Native](https://reactnative.dev/) - Ulkoasuun käytettyjä elementtejä View, FlatList, Text sekä StyleSheet
- [React Native Elements](https://react-native-elements.github.io/react-native-elements/) - Ulkoasuun käytettyjä elementtejä Button, Input, ListItem
- [Stack navigation](https://reactnavigation.org/docs/stack-navigator/) - Navigointiin sovelluksen sivujen välillä
- [Expo SQLite](https://docs.expo.io/versions/latest/sdk/sqlite/) - Tehtyjen hakujen tallentamiseen
- [SQLite](https://www.sqlite.org/index.html) - Syntaksi käytetyille sql:n lauseille
- [REST Countries API](https://restcountries.eu/) - Maiden tietojen hakemiseen API:sta
- [react-native-svg](https://github.com/react-native-community/react-native-svg) - API:sta haettujen maiden lippujen näyttämiseen

## Näitä kokeiltu myös

- [react-native-svg-uri](https://github.com/vault-development/react-native-svg-uri) - Joidenkin maiden lippujen näyttämisessä oli [ongelmia](https://github.com/vault-development/react-native-svg-uri/issues/171), jolloin sovellus kaatui.
- [react-native-svg-image](https://github.com/chitezh/react-native-svg-image) - Käyttää WebViewta joka on poistettu React Nativesta, joten kirjasto oli vanhentunut.

## Kohdattuja ongelmia

- API:ssa jotkut lippujen kuvat, esim. [Suomen lippu](https://restcountries.eu/data/fin.svg) ovat todella isoja verrattuna muihin. Näiden näyttäminen sovelluksessa ei onnistu oikein, joten tähän pitäisi keksiä joku ratkaisu.

## Miten jatkokehittäisin sovellusta

- Kunkin maan nimi sekä kaikki kielten nimet näytetään nyt englanniksi. Tähän voisi käyttää [Expon lokalisointia](https://docs.expo.io/versions/latest/sdk/localization/).
- Aiempien hakusanojen näyttäminen linkkeinä maiden tietoihin, jos kyseessä on oikea maa. Nyt näkyy vain millä sanoilla on haettu, jos annettu hakusana oli muu kuin tyhjä. Tässä voitaisiin näyttää vain ne hakusanat, jotka ovat oikeasti maita, ja näyttää maan nimenä linkki maan tietoihin.
- Haku myös suomenkielisellä hakusanalla. Tähän voisi käyttää [REST Countries API:n altSpellings-kenttää](https://restcountries.eu/#api-endpoints-response-example).
- Tässä voisi näyttää myös maan kartan tai pääkaupungin sään jostain toisesta API:sta, esim. [WeatherStack](https://weatherstack.com/).
- Error-viestien tyhjentäminen, jos virheellisen haun jälkeen käydään katsomassa hakuhistoriaa ja palataan takaisin pääsivulle.
- Maiden merkitseminen suosikiksi ja suosikkien näyttäminen omalla sivullaan.

## Mitä opin tästä projektista

Opin paitsi koodaamaan yksinkertaisen tietokantaa ja ulkopuolista API:a käyttävän React Native -sovelluksen ja käyttämään erilaisia React Native Elements -komponetteja, myös ratkomaan ongelmia kaikenlaisiin virheilmoituksiin liittyen, sekä etsimään tietoa verkosta liittyen käytettyihin kirjastoihin ja komponetteihin. Lisäksi tuli debugattua aika paljon ja Expolla testattua sovellusta ihan oikeassa mobiililaitteessa, mikä oli hauskaa.
