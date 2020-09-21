import axios from 'axios';
import config from '../configuration';

const createForm = async () => {
  try {
    return await axios.post(config.API_ENDPOINT + '/api/forms');
  } catch (err) {
    throw err;
  }
};

const getFormById = async (id) => {
  try {
    return await axios.get(config.API_ENDPOINT + `/api/forms/${id}`);
  } catch (err) {
    throw err;
  }
};

const getForms = async () => {
  try {
    return await axios.get(config.API_ENDPOINT + '/api/forms');
  } catch (err) {
    throw err;
  }
};

export { createForm, getFormById, getForms };
