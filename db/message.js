/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('message', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    MsgType: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    MsgId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    MediaUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Content: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    MediaId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    PicUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CreateTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    FromUserName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ToUserName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Format: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Recognition: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ThumbMediaId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    accountId: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'message'
  });
};
