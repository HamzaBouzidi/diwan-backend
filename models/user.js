import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  // Import sequelize instance

// Define the User model
const User = sequelize.define('usersn', {
 USER_ID: {
  autoIncrement: true,
  type: DataTypes.BIGINT,
  allowNull: false,
  primaryKey: true
 },
 Name_user: {
  type: DataTypes.TEXT,
  allowNull: true,
 },
 login_user: {
  type: DataTypes.TEXT,
  allowNull: true,
 },
 pwd_user: {
  type: DataTypes.TEXT,
  allowNull: true,
 },
 Action_user: {
  type: DataTypes.TEXT,
  allowNull: true,
 },
 State: {
  type: DataTypes.BOOLEAN,
  allowNull: true,
 },
 ref_emp: {
  type: DataTypes.TEXT,
  allowNull: true,
 },
 ACCEPT_MODIFY: {
  type: DataTypes.BOOLEAN,
  allowNull: true,
 },
 COST_CENTER_TO_MANAGE: {
  type: DataTypes.TEXT,
  allowNull: true,
 },
 WhareHouse_To_Manage: {
  type: DataTypes.TEXT,
  allowNull: true,
 },
 job: {
  type: DataTypes.TEXT,
  allowNull: true,
 },
 datapic: {
  type: DataTypes.BLOB('long'),
  allowNull: true,
 },
}, {
 freezeTableName: true,  // Prevent Sequelize from pluralizing table names
 timestamps: false,  // Disable createdAt and updatedAt timestamps
});

// Export the model
export default User;
