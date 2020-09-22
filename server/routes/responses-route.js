const express = require('express');
const router = express.Router();

const Response = require('../models/Response');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

/* Response Routes */
router
  .get('/:id', async (req, res) => {
    try {
      const { id } = req.params; // form ID
      const data = await Response.query().where('formId', id);
      res.status(200).json(data);
    } catch (err) {
      console.log(`[${req.method} - ${req.path}] Error: ${err}`);
      res.status(400).json({ message: err });
    }
  })
  .post('/', async (req, res) => {
    try {
      const {
        formId,
        response: { answers, signature },
      } = req.body;

      if (signature && signature.length > 0) {
        cloudinary.uploader.upload(signature, async (err, result) => {
          await Response.query().insert({
            signature: err ? '' : result.url,
            formId,
            answers: JSON.stringify(answers),
          });
          res.status(200).send();
        });
      } else {
        await Response.query().insert({
          signature: '',
          formId,
          answers: JSON.stringify(answers),
        });
        res.status(200).send();
      }
    } catch (err) {
      console.log(`[${req.method} - ${req.path}] Error: ${err}`);
      res.status(400).json({ message: err });
    }
  });

module.exports = router;
