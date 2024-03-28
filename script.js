// Define total earnings, total worked hours, and pending worked hours globally
var totalEarnings = parseFloat(localStorage.getItem('totalEarnings')) || 0;
var totalHoursWorked = 0;
var pendingHoursWorked = 0;
var exchangeRate = 78; // INR per USD

// Call updateSavings function when Enter key is pressed
document.getElementById('hours').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        updateSavings();
    }
});

// Initialize savings table with stored data
document.addEventListener('DOMContentLoaded', function () {
    var savingsData = JSON.parse(localStorage.getItem('savingsData')) || [];
    savingsData.forEach(function (entry) {
        addSavingsEntry(entry);
        totalHoursWorked += entry.hoursWorked;
    });
    updateSummary();
});


// Update savings
function updateSavings() {
    var hoursInput = document.getElementById('hours').value.trim();
    var hoursWorked = parseFloat(hoursInput);

    if (isNaN(hoursWorked) || hoursWorked <= 0) {
        alert('Please enter a valid number for hours worked.');
        return;
    }

    var hourlyRate = 41; // USD

    // Calculate earnings
    var earnings = hoursWorked * hourlyRate * exchangeRate;
    var date = new Date().toLocaleDateString();

    // Update total earnings
    totalEarnings += earnings;
    localStorage.setItem('totalEarnings', totalEarnings);

    // Update total worked hours
    totalHoursWorked += hoursWorked;

    // Display daily details
    var dailyDetails = "<p>Date: " + date + ", Hours Worked: " + hoursWorked + ", Earnings: " + numberWithCommas(earnings.toFixed(2)) + " INR</p>";
    document.getElementById('daily-details').innerHTML = dailyDetails;

    // Display pending amount
    var pendingAmount = 2000000 - totalEarnings; // Total INR goal is 20 lakhs
    var pendingAmountUSD = pendingAmount / exchangeRate;
    document.getElementById('pending-amount-inr').textContent = numberWithCommas(pendingAmount.toFixed(2));
    document.getElementById('pending-amount-usd').textContent = numberWithCommas(pendingAmountUSD.toFixed(2));

    // Update savings table
    var savingsEntry = { date: date, hoursWorked: hoursWorked, earnings: earnings.toFixed(2) };
    addSavingsEntry(savingsEntry);

    // Save data to local storage
    var savingsData = JSON.parse(localStorage.getItem('savingsData')) || [];
    savingsData.push(savingsEntry);
    localStorage.setItem('savingsData', JSON.stringify(savingsData));

    // Clear input field
    document.getElementById('hours').value = '';

    // Add floating characters
    addFloatingCharacter();

    // Update summary
    updateSummary();
}

// Update summary
function updateSummary() {
    document.getElementById('total-hours').textContent = totalHoursWorked.toFixed(2);
    var pendingHours = (2000000 - totalEarnings) / (41 * exchangeRate);
    document.getElementById('pending-hours').textContent = pendingHours.toFixed(2);

    var today = new Date();
    var targetDate = new Date('2024-09-28'); // September 28, 2024
    var remainingDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24)); // Calculate remaining days

    var remainingAmount = 2000000 - totalEarnings; // Remaining amount to be saved
    var idealHours = remainingAmount / (41 * exchangeRate * remainingDays); // Calculate ideal hours

    document.getElementById('pending-amount-inr').textContent = numberWithCommas(remainingAmount.toFixed(2));
    document.getElementById('pending-amount-usd').textContent = numberWithCommas((remainingAmount / exchangeRate).toFixed(2));
    document.getElementById('ideal-hours').textContent = idealHours.toFixed(2);
}


// Function to add comma separators to numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to add savings entry to the table
function addSavingsEntry(entry) {
    var tableRow = "<tr><td>" + entry.date + "</td><td>" + entry.hoursWorked + "</td><td>" + numberWithCommas(entry.earnings) + "</td></tr>";
    document.querySelector("#savings-table tbody").innerHTML += tableRow;
}

// Function to add floating characters
function addFloatingCharacter() {
    var character = document.createElement('div');
    character.classList.add('floating-character');
    character.style.left = Math.random() * window.innerWidth + 'px';
    character.style.top = Math.random() * window.innerHeight + 'px';
    document.getElementById('animation-container').appendChild(character);

    setTimeout(function () {
        character.remove();
    }, 5000);
}

// Add floating characters every 2 seconds
setInterval(addFloatingCharacter, 100);

