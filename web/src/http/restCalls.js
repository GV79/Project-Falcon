import axios from 'axios';
import config from '../configuration';

const createForm = async () => {
  try {
    return await axios.post(config.API_ENDPOINT + '/api/forms');
  } catch (err) {
    throw err;
  }
};

const deleteFormById = async (id) => {
  try {
    return await axios.delete(config.API_ENDPOINT + `/api/forms/${id}`);
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

const updateForm = async (data, id) => {
  try {
    return await axios.put(config.API_ENDPOINT + '/api/forms', { data, id });
  } catch (err) {
    throw err;
  }
};

export { createForm, deleteFormById, getFormById, getForms, updateForm };
