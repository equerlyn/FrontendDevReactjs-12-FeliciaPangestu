const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());

app.get('/api/restaurants', async (req, res) => {
  try {
    const response = await axios.get(process.env.BASE_URL, {
      params: {
        query: 'Malang',
        type: 'restaurant',
        key: process.env.API_KEY,
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/restaurant/photo', async (req, res) => {
  try { 
    if (!req.query.photoreference) {
      return res.status(400).json({ error: 'Parameter photoreference is required' });
    }
    const response = await axios.get(process.env.PHOTO_URL, {
      params: {
        photo_reference: req.query.photoreference,
        maxheight: 400,
        maxwidth: 400,
        key: process.env.API_KEY,
      },
      responseType: 'arraybuffer',
    });
    
    const imageData = Buffer.from(response.data, 'binary').toString('base64');
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    res.json(imageUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.get('/api/restaurant/:placeid', async (req, res) => {
  try {
    const response = await axios.get(process.env.DETAIL_URL, {
      params: {
        place_id: req.params.placeid,
        key: process.env.API_KEY,
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
