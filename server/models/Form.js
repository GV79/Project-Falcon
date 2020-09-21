const { Model } = require('objection');

class FormModel extends Model {
  static get tableName() {
    return 'forms';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = FormModel;
