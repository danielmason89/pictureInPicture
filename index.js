const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new Quote
function newQuote() {
  showLoadingSpinner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blacnk and replace with unknown
  if (!quote.author) {
    authorText.textContent = "Phuong Nguyen";
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling
  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set the quote, Hide the loader\
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Get Quotes from Api
async function getQuotes() {
  showLoadingSpinner();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    getQuotes();
  }
}

// Tweet a Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event listener
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
