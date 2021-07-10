const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const generateScaperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json()); // will allow our app to parse json input

app.get('/', (req, res) => {
  res.send('Welcome to Amazon Scraper API');
});

// GET Product Details
app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScaperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`
    );

    const jsonFormat = JSON.parse(response);

    res.json(jsonFormat);
  } catch (err) {
    res.json(err);
  }
});

// GET Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScaperUrl(
        api_key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );

    const jsonFormat = JSON.parse(response);

    res.json(jsonFormat);
  } catch (err) {
    res.json(err);
  }
});

// GET Product Offers
app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScaperUrl(
        api_key
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );

    const jsonFormat = JSON.parse(response);

    res.json(jsonFormat);
  } catch (err) {
    res.json(err);
  }
});

// GET Search Results
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScaperUrl(
        api_key
      )}&url=https://www.amazon.com/s?k=${searchQuery}`
    );

    const jsonFormat = JSON.parse(response);

    res.json(jsonFormat);
  } catch (err) {
    res.json(err);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
