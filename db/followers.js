/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('followers', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    openid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    headimgurl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nickname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    groupid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    subscribe: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    subscribe_time: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    accountId: {
      type: DataTypes.STRING(11),
      allowNull: true
    }
  }, {
    tableName: 'followers'
  });
};
