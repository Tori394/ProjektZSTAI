# Projekt Końcowy ZTPAI – Katalog Ozdób Świątecznych

Projekt jest aplikacją webową służącą jako katalog ozdób świątecznych. Umożliwia użytkownikom przeglądanie dostępnych produktów (zawierających informacje takie jak nazwa, cena, rozmiar i kolor). Ze względów bezpieczeństwa dostęp do przeglądania katalogu wymaga zalogowania, a dane użytkowników są trwale i bezpiecznie przechowywane w bazie danych.

---

## 🚀 Technologie i Architektura

### Backend (Spring Boot)
* **Język i Framework:** Java 25, Spring Boot 4.0.3 (moduł Spring Web).
* **Baza Danych:** Relacyjna baza danych **H2** działająca w trybie w pamięci (in-memory).
* **ORM:** Spring Data JPA. Automatyczne generowanie schematów tabel (`@Entity`, `@Id`) oraz uproszczona obsługa operacji CRUD za pomocą wbudowanych interfejsów repozytoriów.
* **Testowanie:** JUnit 5 oraz Mockito.

### Frontend (React)
* Dynamiczny i responsywny interfejs użytkownika stworzony przy użyciu biblioteki **React**.

### Użytkownicy i Role
Aplikacja obsługuje dwa typy użytkowników:
1. **Admin:** Ma pełny dostęp do wszystkich funkcji, w tym zarządzanie ozdobami (dodawanie, usuwanie).
2. **User:** Może przeglądać katalog ozdób, ale nie ma uprawnień do zarządzania.

### Modele Danych
* **User:** Reprezentuje użytkownika systemu, zawiera pola takie jak `username`, `password` (bezpiecznie hashowane), `role` (Admin/User) oraz `createdAt`.
* **Ornament:** Reprezentuje ozdobę świąteczną, zawiera pola takie jak `name`, `price`, `size` i `color`.

### Wzorce Projektowe
* **Architektura Warstwowa:** Struktura projektu jest zorganizowana z wyraźnym podziałem na warstwy: kontrolery (obsługa żądań HTTP REST), serwisy (logika biznesowa) oraz repozytoria (dostęp do bazy danych).
* **Wzorzec DTO:** Zamiast bezpośredniego zwracania encji bazodanowych, komunikacja z klientem odbywa się poprzez bezpieczne obiekty transferu danych (DTO).

---

## 🔐 Uwierzytelnianie (JSON Web Token)

Bezpieczeństwo aplikacji opiera się na mechanizmie JWT i jest realizowane w następujących krokach:
1. **Uwierzytelnienie:** Użytkownik przesyła swoje dane logowania w ciele żądania POST. Aplikacja weryfikuje je z informacjami zapisanymi w bazie danych (hasła są bezpiecznie hashowane za pomocą `BCryptPasswordEncoder`).
2. **Generowanie Tokenu:** Jeśli dane są poprawne, serwer generuje unikalny token JWT podpisany tajnym kluczem. Zawiera on podstawowe informacje: nazwę użytkownika, przypisaną rolę oraz czas wygaśnięcia. Token jest zwracany do klienta w odpowiedzi HTTP.
3. **Autoryzacja:** Przy każdej kolejnej próbie dostępu do chronionych zasobów, klient musi załączyć otrzymany token w nagłówku żądania.
4. **Weryfikacja:** Żądanie przechodzi przez specjalnie przygotowany filtr (`JwtAuthenticationFilter`), który przechwytuje token, weryfikuje jego podpis oraz datę ważności. Jeśli jest poprawny, aplikacja identyfikuje użytkownika i pozwala na wykonanie akcji.

---

## 🛠 Wymagania Środowiskowe

Do poprawnego uruchomienia projektu na lokalnej maszynie niezbędne są:
* **Java 25**
* **Node.js** (wersja 18 lub nowsza) oraz menedżer paczek **npm**
* **IDE** (Zalecane IntelliJ IDEA)
* Baza danych H2 (wbudowana w projekt, nie wymaga instalacji).

---

## ⚙️ Konfiguracja (application.properties)

Główna konfiguracja backendu znajduje się w pliku `src/main/resources/application.properties`. Ponieważ projekt korzysta z wbudowanej bazy danych H2, nie wymaga ona stawiania zewnętrznego serwera bazy danych.

Najważniejsze ustawienia konfiguracyjne:
* `spring.datasource.url=jdbc:h2:mem:testdb` – adres bazy danych in-memory.
* `spring.h2.console.enabled=true` – umożliwia podgląd tabel w przeglądarce pod adresem `http://localhost:8080/h2-console`.

---

## Uruchomienie projektu
Aby uruchomić aplikację lokalnie, wykonaj poniższe kroki w dwóch osobnych oknach terminala.

### 1. Uruchomienie Backendu (Spring Boot)
Po sklonowaniu repozytorium należy przejść do głównego katalogu projektu i uruchomić aplikację za pomocą Mavena:
```bash
mvn spring-boot:run
```
Backend będzie nasłuchiwał na porcie 8080

### 2. Uruchomienie Frontendu (React)
Następnie przejść do folderu frontend i uruchomić aplikację React za pomocą polecenia:
```bash
npm install # Instalacja zależności przed pierwszym uruchomieniem
npm start
```
Aplikacja frontendowa będzie dostępna pod adresem `http://localhost:3000`.