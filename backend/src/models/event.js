const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  Event.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      eventAt: DataTypes.DATE,
      attendees: DataTypes.INTEGER,
      location: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      isActive: DataTypes.BOOLEAN,
    },
    {
      freezeTableName: true,
      sequelize,
      modelName: 'Event',
      tableName: 'Events',
    }
  );
  return Event;
};
