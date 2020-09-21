const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const Form = require('../models/Form');

router
  .get('/', async (req, res) => {
    try {
      console.log('woohooo');
      const forms = await Form.query();
      console.log(forms);
      res.status(200).json({});
    } catch (err) {
      res.status(400).json({ message: err });
    }
  })
  .get('/:id', async (req, res) => {
    try {
      const { id } = request.body;
      const forms = await Form.query().findById;
      res.status(200).json({});
    } catch (err) {
      res.status(400).json({ message: err });
    }
  })
  .post('/', async (req, res) => {
    try {
      /* Creating a form */
      const newId = uuidv4(); // for identifying forms and generating links

      const form = await Form.query().insert({
        uuid: newId,
        title: 'Untitled form',
        description: '',
        status: true,
        fields: [],
      });

      console.log(form);

      res.status(200).json({ uuid: newId });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  })
  .put('/', () => {
    try {
      res.status(200).json({ routines: JSON.stringify(routines), selectedRoutine: userData.routine });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  })
  .delete('/', () => {
    try {
      res.status(200).json({ routines: JSON.stringify(routines), selectedRoutine: userData.routine });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });

module.exports = router;
