document.addEventListener('DOMContentLoaded', function() {
  // Tutaj będziemy wczytywać dane i aktualizować stronę
});

async function loadData() {
  // Wczytujemy dane z pliku JSON
  var response = await fetch('data.json');
  var data = await response.json();

  // Aktualizujemy stronę na podstawie wczytanych danych
  document.getElementById("deposits").innerHTML = 
    data.deposits.map(deposit => `${deposit.address}: ${deposit.amount} XEC`).join('<br>');
  document.getElementById("prizePool").innerHTML = data.prizePool + " XEC";
  document.getElementById("previousWinner").innerHTML = 
    `Adres: ${data.previousWinner.address}, wygrana: ${data.previousWinner.prize} XEC`;
}

function updatePage() {
  // Tutaj będziemy aktualizować stronę na podstawie wczytanych danych
}

function startCountdown() {
  // Ustalamy datę i czas następnego losowania
  var nextDraw = new Date();
  nextDraw.setDate(nextDraw.getDate() + ((6 - nextDraw.getDay() + 7) % 7)); // Następna sobota
  nextDraw.setHours(15);
  nextDraw.setMinutes(0);
  nextDraw.setSeconds(0);

  // Uruchamiamy odliczanie
  var interval = setInterval(function() {
    var now = new Date().getTime();
    var distance = nextDraw - now;

    // Obliczamy ile dni, godzin, minut i sekund pozostało do następnego losowania
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Wyświetlamy odliczanie na stronie
    document.getElementById("countdown").innerHTML = days + " dni " + hours + " godz. "
    + minutes + " min. " + seconds + " sek.";

    // Jeżeli odliczanie dobiegło końca, zatrzymujemy je
    if (distance < 0) {
      clearInterval(interval);
      document.getElementById("countdown").innerHTML = "CZAS NA LOSOWANIE!";
    }
  }, 1000);
}
