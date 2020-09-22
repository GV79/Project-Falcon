const express = require('express');
const router = express.Router();

const Form = require('../models/Form');
const { v4: uuidv4 } = require('uuid');

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
      await Form.query().delete().where('uuid', id);
      res.status(200).send();
    } catch (err) {
      console.log(`[${req.method} - ${req.path}] Error: ${err}`);
      res.status(400).json({ message: err });
    }
  })
  /* Creating a form */
  .post('/', async (req, res) => {
    try {
      const newId = uuidv4(); // for identifying forms and generating links

      await Form.query().insert({
        uuid: newId,
        title: 'Untitled form',
        description: '',
        status: true,
        fields: JSON.stringify([]),
      });

      res.status(200).json({ uuid: newId });
    } catch (err) {
      console.log(`[${req.method} - ${req.path}] Error: ${err}`);
      res.status(400).json({ message: err });
    }
  })
  /* Updating form */
  .put('/', async (req, res) => {
    try {
      let { data, id } = req.body;
      data.fields = JSON.stringify(data.fields);
      await Form.query().patch(data).where('uuid', id);
      res.status(200).send();
    } catch (err) {
      console.log(`[${req.method} - ${req.path}] Error: ${err}`);
      res.status(400).json({ message: err });
    }
  });

/* Form Fields Routes */
router
  .post('/:id/fields', async (req, res) => {
    try {
      let { data, field } = req.body;
      const { id } = req.params;
      data.fields.push(field);
      data.fields = JSON.stringify(data.fields);
      await Form.query().patch(data).where('uuid', id);
      res.status(200).send();
    } catch (err) {
      console.log(`[${req.method} - ${req.path}] Error: ${err}`);
      res.status(400).json({ message: err });
    }
  })
  .delete('/:id/fields/:fieldId', async (req, res) => {
    try {
      const { id, fieldId } = req.params;
      let [form] = await Form.query().where('uuid', id);
      form.fields = JSON.stringify(form.fields.filter((field) => field.id !== fieldId));
      await Form.query().patch(form).where('uuid', id);
      res.status(200).send();
    } catch (err) {
      console.log(`[${req.method} - ${req.path}] Error: ${err}`);
      res.status(400).json({ message: err });
    }
  });

/* Form Attributes Routes */
router
  .get('/:id/status', async (req, res) => {
    try {
      const { id } = req.params;
      const status = await Form.query().select('status').where('uuid', id);
      console.log(status);
      res.status(200).send({ status: status[0] });
    } catch (err) {
      console.log(`[${req.method} - ${req.path}] Error: ${err}`);
      res.status(400).json({ message: err });
    }
  })
  .post('/:id/status', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await Form.query().patch({ status }).where('uuid', id);
      res.status(200).send();
    } catch (err) {
      console.log(`[${req.method} - ${req.path}] Error: ${err}`);
      res.status(400).json({ message: err });
    }
  });

module.exports = router;
