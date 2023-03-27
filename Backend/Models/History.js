module.exports =  (sequelize , DataTypes) => {

    const History = sequelize.define('History', {
    
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount:{
        type: DataTypes.INTEGER,
         allowNull: false,
      },
      generate:{
         type: DataTypes.DATE,
         allowNull: false,
      },
      due:{
         type: DataTypes.DATE,
         allowNull: false,
      }
}, {
    tableName: 'history',
    timestamps: true
});

return History;

}