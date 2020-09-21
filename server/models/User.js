const { Model } = require('objection');

class UserModel extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = UserModel;
