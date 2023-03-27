
module.exports =  (sequelize , DataTypes) => {

const User = sequelize.define('User', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }, 
  branch:{
    type: DataTypes.STRING,
    allowNull: false
 },
 name:{
    type: DataTypes.STRING,
    allowNull: false
 },
 phone:{
    type: DataTypes.INTEGER,
    allowNull: false
 },
 load:{
    type: DataTypes.INTEGER,
    allowNull: false
 },
 age:{
    type: DataTypes.INTEGER,
    allowNull: false
 },
 email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
   }
 },
 password:{
    type: DataTypes.STRING,
    allowNull: false,
 },
 type:{
    type: DataTypes.STRING,
    allowNull: false,
 },
 date:{
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
 }
}, {
    tableName: 'User',
    timestamps: true
});

return User;

}