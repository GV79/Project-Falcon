import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.status(202).json({ routines: JSON.stringify(routines), selectedRoutine: userData.routine });
  } catch (err) {
    const { status, message } = handleError(err);
    res.status(status).json({ message });
  }
});

module.exports = router;
