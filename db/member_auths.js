/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member_auths', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    identity_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    indentifier: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    openid: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'member_auths'
  });
};
