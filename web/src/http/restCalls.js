import axios from 'axios';
import config from '../configuration';

const addFormField = async (data, field) => {
  try {
    const { uuid } = data;
    return await axios.post(config.API_ENDPOINT + `/forms/${uuid}/fields`, { data, field });
  } catch (err) {
    throw err;
  }
};

const createForm = async () => {
  try {
    return await axios.post(config.API_ENDPOINT + '/forms');
  } catch (err) {
    throw err;
  }
};

const deleteFieldById = async (formId, fieldId) => {
  try {
    return await axios.delete(config.API_ENDPOINT + `/forms/${formId}/fields/${fieldId}`);
  } catch (err) {
    throw err;
  }
};

const deleteFormById = async (id) => {
  try {
    return await axios.delete(config.API_ENDPOINT + `/forms/${id}`);
  } catch (err) {
    throw err;
  }
};

const getFormById = async (id) => {
  try {
    return await axios.get(config.API_ENDPOINT + `/forms/${id}`);
  } catch (err) {
    throw err;
  }
};

const getForms = async () => {
  try {
    return await axios.get(config.API_ENDPOINT + '/forms');
  } catch (err) {
    throw err;
  }
};

const getResponses = async (id) => {
  try {
    return await axios.get(config.API_ENDPOINT + `/responses/${id}`);
  } catch (err) {
    throw err;
  }
};

const submitResponse = async (id, response) => {
  try {
    return await axios.post(config.API_ENDPOINT + '/responses', { formId: id, response });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateForm = async (data, id) => {
  try {
    return await axios.put(config.API_ENDPOINT + '/forms', { data, id });
  } catch (err) {
    throw err;
  }
};

const updateFormStatus = async (uuid, status) => {
  try {
    return await axios.put(config.API_ENDPOINT + `/forms/${uuid}/status`, { status });
  } catch (err) {
    throw err;
  }
};

export {
  addFormField,
  createForm,
  deleteFieldById,
  deleteFormById,
  getFormById,
  getForms,
  getResponses,
  submitResponse,
  updateForm,
  updateFormStatus,
};
