/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('material', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    key: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'material'
  });
};
