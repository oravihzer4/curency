const API_KEY = "158ce1ff1d1bd340440172df";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertButton = document.getElementById("convert");
const result = document.getElementById("result");

async function populateCurrencies() {
  try {
    const response = await fetch(`${API_URL}USD`);
    const data = await response.json();
    const currencies = Object.keys(data.conversion_rates);

    currencies.forEach((currency) => {
      const optionFrom = document.createElement("option");
      const optionTo = document.createElement("option");
      optionFrom.value = currency;
      optionFrom.textContent = currency;
      optionTo.value = currency;
      optionTo.textContent = currency;
      fromCurrency.appendChild(optionFrom);
      toCurrency.appendChild(optionTo);
    });
    fromCurrency.value = "USD";
    toCurrency.value = "EUR";
  } catch (error) {
    console.error("Error fetching currencies:", error);
  }
}

async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    result.textContent = "Please enter a valid amount.";
    return;
  }

  try {
    const response = await fetch(`${API_URL}${from}`);
    const data = await response.json();
    const rate = data.conversion_rates[to];
    const convertedAmount = (amount * rate).toFixed(2);

    result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
  } catch (error) {
    console.error("Error converting currency:", error);
    result.textContent = "Error fetching conversion rates. Try again later.";
  }
}

populateCurrencies();
convertButton.addEventListener("click", convertCurrency);
