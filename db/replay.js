/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('replay', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    word: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'replay'
  });
};
