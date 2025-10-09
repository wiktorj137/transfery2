# 🚕 Transfer Lotniskowy - System Rezerwacji

Nowoczesna aplikacja do rezerwacji transferów lotniskowych. **100% darmowa, bez kart kredytowych, bez rejestracji!**

## 🚀 Tech Stack

- **Next.js 15.5.4** + TypeScript + Tailwind CSS 4
- **Nominatim (OpenStreetMap)** - Autocomplete adresów (całkowicie darmowe!)
- **Flatpickr** - Date/Time picker
- **React Hook Form + Zod** - Walidacja

## ⚡ Quick Start

```bash
npm install
npm run dev
```

**To wszystko! Działa od razu, bez konfiguracji!**

## ✅ Funkcje

### 🎯 Formularz rezerwacji (3 kroki)
- ✅ **Krok 1:** Lokalizacje + data/czas + pasażerowie
- ✅ **Krok 2:** Kod promocyjny + wybór pojazdu z cenami
- ✅ **Krok 3:** Dane kontaktowe + wybór płatności
- ✅ Progress bar (wizualizacja postępu)
- ✅ Nawigacja wstecz między krokami
- ✅ LocalStorage persistence (dane przetrwają odświeżenie)

### 💰 System cenowy
- ✅ Autocomplete adresów dla Polski (Nominatim)
- ✅ Automatyczna kalkulacja ceny (dystans × stawka × typ pojazdu)
- ✅ Kody promocyjne (PROMO10 = -10% zniżki)
- ✅ Ceny wyświetlane przy każdym typie pojazdu
- ✅ Wizualizacja zniżki (przekreślona cena)

### 🚗 Typy pojazdów
- ✅ Standard (1.0x) - VW Passat / Toyota Camry
- ✅ Premium (1.5x) - Mercedes E / BMW 5
- ✅ Van (1.8x) - Mercedes V / VW Caravelle
- ✅ VIP (2.5x) - Mercedes S / BMW 7

### 💳 Płatności
- ✅ Płatność online (przygotowane pod Braintree)
- ✅ Zapłać kierowcy (gotówka/karta)

### 🎨 UI/UX
- ✅ Polski date/time picker (Flatpickr)
- ✅ Walidacja formularzy (React Hook Form + Zod)
- ✅ Responsywny design (mobile-first)
- ✅ **Bez API keys, bez kart, bez rejestracji**

## 💰 Koszty

**0 PLN** - wszystko darmowe:
- Nominatim OSM - unlimited requests (z rate limiting)
- Flatpickr - open source
- Next.js - darmowy hosting na Vercel

## 🧮 Model biznesowy

### Wzór cenowy
```
cena_bazowa = (dystans_km × 3 PLN) + 20 PLN start
cena_pojazdu = cena_bazowa × mnożnik_typu_pojazdu
cena_końcowa = cena_pojazdu × (1 - zniżka_z_kodu_promo)
```

### Przykłady (Lotnisko → Centrum, 20km)

**Bez kodu promocyjnego:**
- Standard (1.0x): **80 PLN**
- Premium (1.5x): **120 PLN**
- Van (1.8x): **144 PLN**
- VIP (2.5x): **200 PLN**

**Z kodem PROMO10 (-10%):**
- Standard: ~~80 PLN~~ → **72 PLN**
- Premium: ~~120 PLN~~ → **108 PLN**
- Van: ~~144 PLN~~ → **130 PLN**
- VIP: ~~200 PLN~~ → **180 PLN**

### Popularne trasy
- Lotnisko → Centrum (20km): 80-200 PLN
- Lotnisko → Zakopane (100km): 320-800 PLN
- Lotnisko → Katowice (60km): 200-500 PLN

## 🛠️ Komendy

```bash
npm run dev          # Dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
```

## 📚 Dokumentacja

- **[FORMULARZ_CHANGELOG.md](./FORMULARZ_CHANGELOG.md)** - Szczegółowy opis zmian w formularzu 3-krokowym
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Przewodnik testowania z przykładami
- **[TODO.md](./TODO.md)** - Lista rzeczy do zrobienia (backend, integracje)

## 🌐 Deploy

### Vercel (1 klik)

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

Bez konfiguracji - działa od razu!

## 📄 Licencja

MIT
