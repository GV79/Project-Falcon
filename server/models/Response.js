/* Model for responses to different forms */

const { Model } = require('objection');

class ResponseModel extends Model {
  static get tableName() {
    return 'responses';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = ResponseModel;
