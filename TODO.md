# TODO - Rzeczy do zrobienia później

## ✅ Ukończone (2025-10-09)

### ✨ Formularz 3-krokowy
- [x] Podział formularza na 3 kroki z progress barem
- [x] Krok 1: Lokalizacje, data, pasażerowie
- [x] Krok 2: Promo code + wybór pojazdu z cenami
- [x] Krok 3: Dane kontaktowe + wybór płatności
- [x] LocalStorage persistence (dane przetrwają odświeżenie)
- [x] Walidacja z Zod dla każdego kroku
- [x] Nawigacja wstecz między krokami
- [x] System kodów promocyjnych (PROMO10 = -10%)
- [x] Wyświetlanie cen przy każdym typie pojazdu
- [x] Usunięcie pola "Numer lotu"
- [x] Opcja "Zapłać kierowcy" vs "Płatność online"

---

## 🔴 Priorytet wysoki (wymaga backendu)

### 1. Email z potwierdzeniem rezerwacji
- [ ] Integracja z serwisem email (SendGrid / Mailgun / AWS SES)
- [ ] Template emaila z potwierdzeniem
- [ ] Wysyłka po udanej płatności
- [ ] Email z danymi kierowcy 24h przed transferem

### 2. Zapisywanie rezerwacji do bazy danych
- [ ] Endpoint: `POST /api/bookings` - utworzenie rezerwacji
- [ ] Endpoint: `GET /api/bookings` - lista rezerwacji (dla admina)
- [ ] Endpoint: `GET /api/bookings/:id` - szczegóły rezerwacji
- [ ] Endpoint: `PATCH /api/bookings/:id` - aktualizacja (status, notatki)
- [ ] Endpoint: `DELETE /api/bookings/:id` - anulowanie

### 3. Prawdziwa integracja z Braintree
- [ ] Zamienić mockowe `/api/braintree/token` na prawdziwe wywołanie SDK
- [ ] Zamienić mockowe `/api/braintree/checkout` na `gateway.transaction.sale()`
- [ ] Obsługa błędów płatności
- [ ] Webhook od Braintree dla statusu płatności

### 4. Autentykacja admina
- [ ] System logowania (email + hasło)
- [ ] JWT tokens / Sessions
- [ ] Middleware do ochrony route `/admin`
- [ ] Role użytkowników (admin, driver, user)

### 5. Panel kierowcy
- [ ] Przypisywanie kierowców do przejazdów
- [ ] Widok kierowcy - lista jego przejazdów
- [ ] Aktualizacja statusu przejazdu przez kierowcę
- [ ] Nawigacja GPS do klienta

## 🟡 Priorytet średni

### 6. Edycja rezerwacji przez admina
- [ ] Formularz edycji w `BookingDetails.tsx`
- [ ] Zmiana statusu (pending → confirmed → in_progress → completed)
- [ ] Dodawanie/edycja notatek admina
- [ ] Przypisywanie kierowcy do przejazdu
- [ ] Historia zmian (kto, kiedy, co zmienił)

### 7. Powiadomienia SMS
- [ ] Integracja z Twilio / SMS API
- [ ] SMS do klienta po potwierdzeniu rezerwacji
- [ ] SMS z danymi kierowcy 24h przed transferem
- [ ] SMS do kierowcy o nowym przejeździe

### 8. Faktury VAT
- [ ] Generowanie faktur PDF
- [ ] Wysyłka faktury na email
- [ ] Panel z listą faktur dla klienta
- [ ] Integracja z systemem księgowym

### 9. Statystyki i raporty
- [ ] Dashboard z wykresami (przychody, liczba przejazdów)
- [ ] Raport dzienny/tygodniowy/miesięczny
- [ ] Najpopularniejsze trasy
- [ ] Statystyki kierowców (liczba przejazdów, średnia ocena)

### 10. System ocen
- [ ] Klient ocenia przejazd (1-5 gwiazdek)
- [ ] Komentarz do przejazdu
- [ ] Średnia ocena kierowcy
- [ ] Wyświetlanie ocen na stronie głównej

## 🟢 Priorytet niski (nice to have)

### 11. Panel klienta
- [ ] Logowanie dla klientów
- [ ] Historia przejazdów
- [ ] Powtórzenie rezerwacji (te same dane)
- [ ] Zapisane adresy (dom, praca, lotnisko)
- [ ] Ulubieni kierowcy

### 12. Kody rabatowe
- [ ] System kuponów rabatowych
- [ ] Generowanie kodów promocyjnych
- [ ] Walidacja kodu przy płatności
- [ ] Tracking wykorzystania kodów

### 13. Powiadomienia push
- [ ] Web push notifications
- [ ] Powiadomienie o przyjeździe kierowcy
- [ ] Powiadomienie o zmianie statusu

### 14. Mapa na żywo
- [ ] Integracja z Google Maps / Mapbox
- [ ] Pozycja kierowcy na żywo
- [ ] Klient widzi gdzie jest kierowca
- [ ] Szacowany czas przyjazdu (ETA)

### 15. Multi-język
- [ ] Tłumaczenia (PL, EN, DE)
- [ ] i18n setup (next-intl / react-i18next)
- [ ] Przełącznik języka w headerze

### 16. Responsywna aplikacja mobilna
- [ ] PWA (Progressive Web App)
- [ ] Możliwość dodania do ekranu głównego
- [ ] Offline mode
- [ ] Push notifications w aplikacji

### 17. Program lojalnościowy
- [ ] Punkty za przejazdy
- [ ] Rabaty dla stałych klientów
- [ ] System poleceń (referral)

## 🔧 Techniczne TODO

### 18. Testy
- [ ] Unit testy (Jest + React Testing Library)
- [ ] E2E testy (Playwright / Cypress)
- [ ] Testy integracyjne API

### 19. Optymalizacja
- [ ] Lazy loading komponentów
- [ ] Image optimization (Next.js Image)
- [ ] Caching (Redis dla API)
- [ ] CDN dla statycznych plików

### 20. Monitoring i logi
- [ ] Sentry / LogRocket dla błędów
- [ ] Analytics (Google Analytics / Plausible)
- [ ] Performance monitoring
- [ ] Error tracking

### 21. Backup i bezpieczeństwo
- [ ] Automatyczne backupy bazy danych
- [ ] Rate limiting dla API
- [ ] CAPTCHA przy rezerwacji
- [ ] Walidacja CSRF
- [ ] Szyfrowanie wrażliwych danych

---

## 📝 Notatki techniczne

### Struktura bazy danych (przykład)
```
Tables:
- users (id, email, password, role)
- bookings (id, customer_id, pickup, dropoff, date, vehicle_type, price, status)
- drivers (id, user_id, name, phone, vehicle, plate, rating)
- payments (id, booking_id, amount, method, transaction_id, status)
- reviews (id, booking_id, rating, comment, created_at)
- promo_codes (id, code, discount, valid_from, valid_to, used_count)
```

### API Endpoints (do zrobienia)
```
POST   /api/auth/login
POST   /api/auth/register
GET    /api/bookings
POST   /api/bookings
GET    /api/bookings/:id
PATCH  /api/bookings/:id
DELETE /api/bookings/:id
GET    /api/drivers
POST   /api/drivers
PATCH  /api/drivers/:id
POST   /api/payments/checkout
GET    /api/payments/:id
POST   /api/reviews
GET    /api/reviews/:bookingId
```
