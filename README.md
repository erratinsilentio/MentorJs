# Mentor JS - zadania rekrutacyjne

W powyższym repozytorium zawarte są wszystkie trzy zadania rekrutacyjne na stanowisko Mentor JS w firmie GoIT. Struktura projektu podzielona jest na trzy odrębne pliki HTML, wraz z odpowiadającymi im plikami Javascript. Czyli całość podzielona na każde zadanie - odrębnie dla czytelności. Index.html stanowi zadanie numer jeden.

Zdecydowałem się nie korzystać z żadnego bundlera pokroju Vite czy Webpack - dla utrzymania prostoty na potrzeby odtworzenia warunków uczestniczenia w kursie.

## Zadanie 1

Zgodnie z zaleceniami, tworzymy klasę o nazwie StringBuilder. Przy definiowaniu klasy uzywamy tzw. konstruktora, który przyjmuje wartości jakich chcemy uzyc tworząc nowy obiekt klasy. W tym przypadku jest to baseString, z domyślną wartością równą "", czyli pustemu stringowi. Domyślna wartość będzie uzyta jeśli nie określimy jej przy tworzeniu obiektu. Wartość baseString przypisujemy do właściwości obiektu nazwanej "value".

Następnie definiujemy metody klasy, czyli odpowiednio append, prepend i pad:

- W append przyjmujemy parametr 'str', którego uzywamy do zmodyfikowania właściwości value. Chcemy dodać parametr na koniec value, co mozemy zrobić poprzez dodawanie, w tym przypadku skrócone za pomocą operatora '+='. Następnie zwracamy this, co pozwoli nam na wywołanie kolejnych metod funkcji jedna po drugiej.

- Analogicznie w prepend, dodajemy paratetr 'str' na początek value, zamiast na końcu.

- Podobnie jak w powyzszych przykładach, w metodzie pad dodajemy str dwukrotnie, na początku i na końcu value.

W kazdej z metod, tworzymy tez nową, zmodyfikowaną zmienną o nazwie formattedStr, która podany wcześniej parametr zamienia na String. To na wypadek, gdyby podana została np. liczba - wtedy metody działałyby w niepoządany sposób.

Idąc za przykładem podanym w treści zadania, tworzymy nowy obiekt klasy StringBuilder, i za pomocą zdefiniowanych wcześniej metod modyfikujemy właściwośc value obiektu. Na koniec wyświetlamy value w konsoli, by przekonać się czy metody działają poprawnie.

## Zadanie 2

W tym zadaniu zaczynamy od deklaracji naszych zmiennych - czyli referencji do elementów html naszej strony (input, przyciski, oraz div#boxes), oraz określamy dwie dodatkowe zmienne.

- baseSize - wartość stanowiąca bok pierwszego tworzonego przez nas diva

- additionalSize - wartość, o którą będziemy powiększać bok każdego kolejnego diva w kolekcji

Następnie tworzymy dwie funkcje pomocnicze:

- createArray - funkcja, która tworzy tablicę o długości podanej przez nas w inpucie. Będzie nam potrzebna do stworzenia kolekcji divów. Wartość podana w inpucie to String, dlatego używając funkcji Number() zamieniamy ją w liczbę.

- createRandomBG - funkcja tworząca trzy losowe wartości, które razem utworzą przypadkowy kolor tła.

Potem przechodzimy do zbudowania funkcji tworzącej nasze divy, oraz przypisującej je do istniejącego już kontenera o id #boxes:

- Jeśli w inpucie wpisaliśmy liczbę 3, funkcja createArray zwróci nam tablicę [0, 1, 2] - czyli o odpowiedniej długości, wypełnioną liczbami od 0. Na tej tablicy używamy funkcji forEach(), która wykona dane przez nas zadania dla każdego elementu tablicy po kolei.

- W tym przypadku dla każdego elementu tablicy tworzymy nowy element div. Jeśli tablica ma długośc = 3, tworzymy 3 elementy. Każdy kolejny będzie miał długość i szerokośc powiększoną o ustalone wcześniej 10px, pomnożone razy swoje miejsce w tablicy (która zaczyna się od 0). Czyli drugi element jest powiększony o 1 _ 10px, trzeci o 2 _ 10px, itd...

- Przy użyciu funkcji createRandomBG, każdy element ma przypisane losowy kolor tła.

Potem oczywiście utworzone elementy przypisujemy do div#boxes, oraz zmieniamy wartość zmienianego przez nas inputa z powrotem na pustą.

Potrzebujemy jeszcze funkcji removeBoxes(), która będzie resetowała zawartość naszego diva o id #boxes na pustą - możemy to zrobić poprzez zmianę właściwości innerHTML na "", czyli pustego stringa.

Na koniec, na przyciskach do tworzenia i usuwania tworzymy event listenery, które przy zdarzeniu kliknięcia w przycisk wykonają odpowienio funkcje createBoxes lub removeBoxes.

## Zadanie 3

Na początku deklarujemy zmienne, będące referencjami do elementów naszego dokumentu HTML, oraz tworzymy zmienne "page" i "loading", które będą nam potrzebne przy ponownym pobieraniu obrazków.

Tworzymy również pusty element, który dodajemy na naszej listy w której będą również pobrane obrazki. Ten element zawsze będzie na końcu listy - będziemy do obserwować, żeby wiedzieć kiedy pobrać kolejną porcję obrazków.

Dodajemy event listener do formularza, dzięki którego za każdym razem gdy naciśniemy przycisk "submit", uruchomiona zostanie funkcja pobierająca pierwszą porcję obrazków. Za każdym uruchomieniem przycisku, pobrane wcześniej obrazki się resetują, a liczba strony zmienia się na 1.

Tworzymy nową instancję IntersectionObserver - jest to api wbudowane w język Javascript, które pozwala monitorować widoczność danego przez nas elementu strony. W tym przypadku jest to utworzony wcześniej observedElement.

W funkcji handleIntersection ustalamy co się dzieje, kiedy określony przez nas element stanie się widoczny. Jeśli observedElement jest pierwszym (czyli jedynym) elementem galerii, nie wykonujemy żadnych czynności i opuszczamy funkcję poprzez return. Jest to dla nas znak, że żadne obrazki nie zostały jeszcze pobrane.

Jeśli jednak observedElement nie jest jedynym elementem galerii, a staje sie widoczny - pobieramy nową porcję obrazków, tak jakbyśmy byli na kolejnej stronie.

Asynchroniczna funkcja loadImages ustawia loading na "true", następnie używając naszego klucza API (uzyskanego poprzez rejestrację na stronie PixaBay) wysyła żądanie do strony z obrazkami. Przy użyciu funkcji fetch pobierane są dane, które następnie zmieniamy do formatu JSON.

Sprawdzamy czy dane zawierają obrazy, jeśli tak - wyświetlamy obrazy. Jeśli nie, wyświetlamy odpowiedni komunikat. Jeśli wystąpił błąd, również informujemy o tym użytkownika.

Tworzymy funkcję displayImages, wyświetlającą obrazki na stronie:

- Dla każdego zdjęcia w tablicy tworzymy elementy HTML (li, img)

- Określamy ich właściwości takie jak alt czy src, korzystając z danych otrzymanych od Pixabay

- korzystając z biblioteki basicLightbox, dla każdego obrazka tworzymy też modal wyświetlający jego powiększony rozmiar po kliknięciu (kod dosłownie skopiowany z dokumentacji tej biblioteki).

- Dodajemy element img do elementu li, a element li dodajemy do naszego elementu #gallery - korzystając z funkcji insertBefore, obrazki dodajemy tak, by nasz obserwowany element pozostawał na końcu listy.
