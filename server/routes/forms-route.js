const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const Form = require('../models/Form');

/* Form Routes */
router
  .get('/', async (req, res) => {
    try {
      const forms = await Form.query();
      res.status(200).json(forms);
    } catch (err) {
      console.log(`[${req.method} - ${req.path}] Error: ${err}`);
      res.status(400).json({ message: err });
    }
  })
  .get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const forms = await Form.query().where('uuid', id);
      res.status(200).json(forms[0]);
    } catch (err) {
      console.log(`[${req.method} - ${req.path}] Error: ${err}`);
      res.status(400).json({ message: err });
    }
  })
  .delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const what = await Form.query().delete().where('uuid', id);
      res.status(200).send();
    } catch (err) {
      console.log(`[${req.method} - ${req.path}] Error: ${err}`);
      res.status(400).json({ message: err });
    }
  })
  .post('/', async (req, res) => {
    try {
      /* Creating a form */
      const newId = uuidv4(); // for identifying forms and generating links

      await Form.query().insert({
        uuid: newId,
        title: 'Untitled form',
        description: '',
        status: true,
        fields: [],
      });

      res.status(200).json({ uuid: newId });
    } catch (err) {
      console.log(`[${req.method} - ${req.path}] Error: ${err}`);
      res.status(400).json({ message: err });
    }
  })
  .put('/', async (req, res) => {
    try {
      const { data, id } = req.body;
      await Form.query().patch(data).where('uuid', id);
      res.status(200).send();
    } catch (err) {
      console.log(`[${req.method} - ${req.path}] Error: ${err}`);
      res.status(400).json({ message: err });
    }
  });

/* Form Fields Routes */
router.put('/:id/fields', async (req, res) => {
  try {
    const { fields, id } = req.body;
    const forms = await Form.query().patch({ fields }).where('uuid', id);
    res.status(200).send();
  } catch (err) {
    console.log(`[${req.method} - ${req.path}] Error: ${err}`);
    res.status(400).json({ message: err });
  }
});

module.exports = router;
