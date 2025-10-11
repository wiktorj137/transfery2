# Transfer Lotniskowy - System Rezerwacji

Aplikacja webowa do rezerwacji transferów lotniskowych w Polsce.

## Technologie

- Next.js 15.5.4 z TypeScript
- Tailwind CSS 4
- React Hook Form + Zod
- Flatpickr
- next-intl (wsparcie wielojęzyczności)
- Nominatim API (geokodowanie adresów)

## Instalacja i uruchomienie

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:3000`

## Funkcjonalność

### Formularz rezerwacji
Trzy-krokowy proces rezerwacji:
1. Wybór lokalizacji, daty/czasu i liczby pasażerów
2. Kod promocyjny i wybór pojazdu z prezentacją cen
3. Dane kontaktowe i metoda płatności

### Kalkulacja ceny
Podstawowa formuła cenowa:
```
cena = (dystans_km * 3 PLN + 20 PLN) * mnożnik_pojazdu * (1 - rabat)
```

Dostępne pojazdy:
- Standard (1.0x) - VW Passat, Toyota Camry
- Premium (1.5x) - Mercedes E-Class, BMW 5
- Van (1.8x) - Mercedes V-Class, VW Caravelle
- VIP (2.5x) - Mercedes S-Class, BMW 7

### Kody promocyjne
Wspierane kody rabatowe:
- PROMO10 - 10% zniżki

### Metody płatności
- Płatność online (Braintree integration)
- Płatność kierowcy (gotówka/karta)

## Wielojęzyczność

Aplikacja obsługuje następujące języki:
- Polski (domyślny)
- Francuski
- Włoski

Pliki tłumaczeń znajdują się w katalogu `messages/`.

## Deployment na GitHub Pages

Projekt jest skonfigurowany do automatycznego deploymentu na GitHub Pages:

1. W ustawieniach repozytorium przejdź do Settings > Pages
2. W sekcji "Build and deployment" wybierz Source: GitHub Actions
3. Przy każdym push do main branch, aplikacja zostanie automatycznie zbudowana i wdrożona

Aplikacja dostępna pod adresem: `https://wiktorj137.github.io/transfery2/`

## Struktura projektu

```
src/
  app/          - Strony aplikacji (App Router)
  components/   - Komponenty React
  config/       - Konfiguracja tras
  types/        - Typy TypeScript
messages/       - Pliki tłumaczeń
public/         - Zasoby statyczne
```

## Komendy

```bash
npm run dev       # Serwer deweloperski
npm run build     # Build produkcyjny
npm run start     # Serwer produkcyjny
npm run lint      # Sprawdzenie ESLint
```

## Konfiguracja środowiska

Skopiuj `.env.example` do `.env.local` i uzupełnij wymagane zmienne:

```bash
cp .env.example .env.local
```

Wymagane zmienne środowiskowe dla integracji Braintree znajdują się w pliku `.env.example`.
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Przewodnik testowania z przykładami
- **[TODO.md](./TODO.md)** - Lista rzeczy do zrobienia (backend, integracje)

## 🌐 Deploy

### Vercel (1 klik)

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

Bez konfiguracji - działa od razu!

## 📄 Licencja

MIT
