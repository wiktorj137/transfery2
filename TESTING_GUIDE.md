# 🧪 Przewodnik testowania formularza 3-krokowego

## 🚀 Uruchomienie

```bash
npm run dev
```

Aplikacja dostępna pod: **http://localhost:3002**

---

## ✅ Scenariusze testowe

### Test 1: Podstawowy przepływ (Happy Path)

**Krok 1:**
1. Wpisz "Lotnisko Kraków" w pole odbioru
2. Wybierz "Lotnisko Kraków-Balice im. Jana Pawła II (KRK)" z listy
3. Wpisz "Rynek" w miejsce docelowe
4. Wybierz adres z sugestii
5. Wybierz jutrzejszą datę i godzinę (np. 14:00)
6. Pozostaw 1 pasażera
7. Kliknij **"Dalej"**

**Oczekiwany rezultat:** ✅ Przejście do kroku 2

---

**Krok 2:**
1. Zostaw pole promo code puste
2. Zauważ ceny przy każdym typie pojazdu (np. Standard: 80 PLN)
3. Wybierz **"Premium"**
4. Kliknij **"Przejdź do płatności"**

**Oczekiwany rezultat:** ✅ Przejście do kroku 3

---

**Krok 3:**
1. Sprawdź podsumowanie (czy wszystko się zgadza)
2. Wpisz dane:
   - Imię: Jan
   - Nazwisko: Kowalski
   - Email: jan@test.pl
   - Telefon: 123456789
3. Wybierz **"Zapłać kierowcy"**
4. Kliknij **"Potwierdź rezerwację"**

**Oczekiwany rezultat:** ✅ Alert "Rezerwacja potwierdzona!" + przekierowanie

---

### Test 2: Kod promocyjny

**Krok 2:**
1. Wpisz **"PROMO10"** w pole kodu
2. Kliknij **"Zastosuj"**
3. Sprawdź czy:
   - ✅ Pojawił się komunikat "Kod zastosowany! Zniżka -10%"
   - ✅ Ceny się przeliczają (np. Standard: ~~80 PLN~~ → 72 PLN)
   - ✅ Pole jest zablokowane (disabled)
   - ✅ Przycisk pokazuje checkmark ✓

**Test nieprawidłowego kodu:**
1. Odśwież stronę
2. Przejdź do kroku 2
3. Wpisz **"INVALID"**
4. Kliknij **"Zastosuj"**

**Oczekiwany rezultat:** ❌ Komunikat "Kod nieprawidłowy"

---

### Test 3: Walidacja formularzy

**Krok 1 - puste pola:**
1. Zostaw wszystkie pola puste
2. Kliknij **"Dalej"**

**Oczekiwany rezultat:** ❌ Błędy walidacji pod polami

**Krok 3 - błędny email:**
1. Wpisz "nieprawidlowy-email"
2. Spróbuj wysłać formularz

**Oczekiwany rezultat:** ❌ "Podaj prawidłowy email"

---

### Test 4: Nawigacja wstecz

**Scenariusz:**
1. Wypełnij krok 1 → przejdź dalej
2. Wypełnij krok 2 → przejdź dalej
3. W kroku 3 kliknij **"Wstecz"**
4. Sprawdź czy wybory z kroku 2 są zachowane
5. Kliknij **"Wstecz"** ponownie
6. Sprawdź czy dane z kroku 1 są zachowane

**Oczekiwany rezultat:** ✅ Wszystkie dane zachowane

---

### Test 5: LocalStorage (persistence)

**Scenariusz:**
1. Wypełnij krok 1
2. Przejdź do kroku 2
3. Wybierz pojazd + wpisz kod PROMO10
4. **Odśwież stronę (F5)**

**Oczekiwany rezultat:** 
✅ Formularz wraca do kroku 2 z zachowanymi danymi:
- Kod promocyjny zastosowany
- Wybrany pojazd zaznaczony
- Wszystkie dane z kroku 1 zachowane

---

### Test 6: Różne trasy i ceny

**Trasy do przetestowania:**

| Odbiór | Cel | Odległość | Standard | Premium | Van | VIP |
|--------|-----|-----------|----------|---------|-----|-----|
| Lotnisko KRK | Rynek Główny | ~20km | 80 PLN | 120 PLN | 144 PLN | 200 PLN |
| Lotnisko KRK | Zakopane | ~100km | 320 PLN | 480 PLN | 576 PLN | 800 PLN |
| Lotnisko KRK | Wieliczka | ~15km | 65 PLN | 98 PLN | 117 PLN | 163 PLN |

**Z kodem PROMO10 (-10%):**
- Standard: 72 PLN, 288 PLN, 59 PLN
- Premium: 108 PLN, 432 PLN, 88 PLN

---

### Test 7: Responsywność (mobile)

**Chrome DevTools:**
1. Otwórz DevTools (F12)
2. Włącz tryb urządzeń mobilnych (Ctrl+Shift+M)
3. Testuj na różnych rozdzielczościach:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)
   - Desktop (1920px)

**Sprawdź:**
- ✅ Przyciski klikalne (wystarczająco duże)
- ✅ Formularze czytelne
- ✅ Karty pojazdów układają się w 1 kolumnę na mobile
- ✅ Progress bar widoczny i czytelny

---

### Test 8: Edge cases

**Maksymalna liczba pasażerów:**
1. Wybierz Van lub VIP
2. Ustaw 8 pasażerów
3. Sprawdź czy cena się nie zmienia (powinna być taka sama)

**Bardzo długa trasa:**
1. Odbiór: Lotnisko Kraków
2. Cel: Gdańsk
3. Sprawdź czy cena jest realistyczna (~1200 PLN dla Standard)

**Bardzo krótka trasa:**
1. Odbiór: Rynek Główny, Kraków
2. Cel: Plac Matejki, Kraków (~1-2km)
3. Cena minimalna: ~25-26 PLN (3×2km + 20 start)

---

## 🐛 Known Issues (TODO)

1. **Płatność online** - obecnie tylko alert, wymaga integracji Braintree
2. **Email confirmation** - brak wysyłki, wymaga backendu
3. **Walidacja telefonu** - akceptuje dowolny string, potrzebna lepsza regex
4. **Data w przeszłości** - Flatpickr ma `minDate: 'today'`, ale można wpisać ręcznie
5. **Duplikaty kodów promo** - po odświeżeniu można ponownie użyć tego samego kodu

---

## 🎯 Checklist przed produkcją

- [ ] Wszystkie testy przechodzą
- [ ] Brak błędów w konsoli
- [ ] Build bez ostrzeżeń (`npm run build`)
- [ ] Responsywność sprawdzona na realnych urządzeniach
- [ ] Integracja Braintree (płatności online)
- [ ] Backend API dla zapisywania rezerwacji
- [ ] Email confirmation
- [ ] Analytics (Google Analytics / Plausible)
- [ ] SEO metadata
- [ ] Favicon + Open Graph images

---

## 📊 Metryki do monitorowania

Po wdrożeniu śledź:

1. **Conversion Rate:**
   - Krok 1 → Krok 2: powinno być >80%
   - Krok 2 → Krok 3: powinno być >70%
   - Krok 3 → Potwierdzenie: powinno być >90%

2. **Najpopularniejsze:**
   - Trasy (top 5)
   - Typy pojazdów
   - Metoda płatności (online vs kierowca)

3. **Kody promocyjne:**
   - Ile razy użyty PROMO10
   - Conversion rate z kodem vs bez kodu

---

**Happy Testing! 🚀**
