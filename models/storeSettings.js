export default (sequelize, DataTypes) => {
  const StoreSettings = sequelize.define('StoreSettings', {
    openingHour: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: '08:00:00',
    },
    closingHour: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: '18:00:00',
    },
    availableDays: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [ "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    },
    specificAvailableDates: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    deliveryFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    }
  });

  return StoreSettings;
};
