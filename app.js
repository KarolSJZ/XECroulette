document.addEventListener('DOMContentLoaded', function() {
  // Load the data and start the countdown
  loadData();
  startCountdown();
});

async function loadData() {
  // Load the data from the JSON file
  var response = await fetch('data.json');
  var data = await response.json();

  // Update the page with the loaded data
  document.getElementById("deposits").innerHTML = 
    data.deposits.map(deposit => `${deposit.address}: ${deposit.amount} XEC`).join('<br>');
  document.getElementById("prizePool").innerHTML = data.prizePool + " XEC";
  document.getElementById("previousWinner").innerHTML = 
    `Address: ${data.previousWinner.address}, Prize: ${data.previousWinner.prize} XEC`;
}

function startCountdown() {
  // Set the date and time of the next draw
  var nextDraw = new Date();
  nextDraw.setDate(nextDraw.getDate() + ((6 - nextDraw.getDay() + 7) % 7)); // Next Saturday
  nextDraw.setHours(15);
  nextDraw.setMinutes(0);
  nextDraw.setSeconds(0);

  // Start the countdown
  var interval = setInterval(function() {
    var now = new Date().getTime();
    var distance = nextDraw - now;

    // Calculate the number of days, hours, minutes, and seconds until the next draw
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the countdown on the page
    document.getElementById("countdown").innerHTML = days + " days " + hours + " hrs "
    + minutes + " mins " + seconds + " secs";

    // If the countdown is over, stop it
    if (distance < 0) {
      clearInterval(interval);
      document.getElementById("countdown").innerHTML = "TIME FOR THE DRAW!";
    }
  }, 1000);
}
