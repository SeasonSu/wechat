/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('articles', {
    id: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    thumb_media_id: {
      type: DataTypes.INTEGER(100),
      allowNull: true
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    digest: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    show_cover_pic: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    content_source_url: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'articles'
  });
};
