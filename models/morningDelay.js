import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Define the MorningDelay model
const MorningDelay = sequelize.define('morningDelay', {
 name: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
   notEmpty: {
    msg: 'Name cannot be empty',
   },
  },
 },
 day: {
  type: DataTypes.DATEONLY,
  allowNull: false,
  validate: {
   isDate: {
    msg: 'Day must be a valid date',
   },
   notEmpty: {
    msg: 'Day cannot be empty',
   },
  },
 },
 description: {
  type: DataTypes.TEXT,
  allowNull: true,  // Description is optional
 },
 time: {
  type: DataTypes.TIME,
  allowNull: false,
  validate: {
   notEmpty: {
    msg: 'Time cannot be empty',
   },
  },
 },

 // L1 - First Level Director's Acceptance Fields
 L1: {
  type: DataTypes.STRING,
  allowNull: true,
  defaultValue: 'In Progress',  // Default value for L1
 },
 L1_COMMENT: {
  type: DataTypes.STRING,
  allowNull: true,  // Optional comment for L1
 },
 L1_ID_EMP: {
  type: DataTypes.INTEGER,
  allowNull: true,  // Employee ID of the first director who accepted
  validate: {
   isInt: {
    msg: 'L1_ID_EMP must be an integer',
   },
  },
 },
 L1_ACCEPT_DATE: {
  type: DataTypes.DATEONLY,
  allowNull: true,  // Date when L1 was accepted
  validate: {
   isDate: {
    msg: 'L1_ACCEPT_DATE must be a valid date',
   },
  },
 },

 // L2 - Second Level Director's Acceptance Fields
 L2: {
  type: DataTypes.STRING,
  allowNull: true,
  defaultValue: 'In Progress',  // Default value for L2
 },
 L2_COMMENT: {
  type: DataTypes.STRING,
  allowNull: true,  // Optional comment for L2
 },
 L2_ID_EMP: {
  type: DataTypes.INTEGER,
  allowNull: true,  // Employee ID of the second director who accepted
  validate: {
   isInt: {
    msg: 'L2_ID_EMP must be an integer',
   },
  },
 },
 L2_ACCEPT_DATE: {
  type: DataTypes.DATEONLY,
  allowNull: true,  // Date when L2 was accepted
  validate: {
   isDate: {
    msg: 'L2_ACCEPT_DATE must be a valid date',
   },
  },
 },

 // L3 - Third Level Director's Acceptance Fields
 L3: {
  type: DataTypes.STRING,
  allowNull: true,
  defaultValue: 'In Progress',  // Default value for L3
 },
 L3_COMMENT: {
  type: DataTypes.STRING,
  allowNull: true,  // Optional comment for L3
 },
 L3_ID_EMP: {
  type: DataTypes.INTEGER,
  allowNull: true,  // Employee ID of the third director who accepted
  validate: {
   isInt: {
    msg: 'L3_ID_EMP must be an integer',
   },
  },
 },
 L3_ACCEPT_DATE: {
  type: DataTypes.DATEONLY,
  allowNull: true,  // Date when L3 was accepted
  validate: {
   isDate: {
    msg: 'L3_ACCEPT_DATE must be a valid date',
   },
  },
 },

 // L4 - Fourth Level Director's Acceptance Fields
 L4: {
  type: DataTypes.STRING,
  allowNull: true,
  defaultValue: 'In Progress',  // Default value for L4
 },
 L4_COMMENT: {
  type: DataTypes.STRING,
  allowNull: true,  // Optional comment for L4
 },
 L4_ID_EMP: {
  type: DataTypes.INTEGER,
  allowNull: true,  // Employee ID of the fourth director who accepted
  validate: {
   isInt: {
    msg: 'L4_ID_EMP must be an integer',
   },
  },
 },
 L4_ACCEPT_DATE: {
  type: DataTypes.DATEONLY,
  allowNull: true,  // Date when L4 was accepted
  validate: {
   isDate: {
    msg: 'L4_ACCEPT_DATE must be a valid date',
   },
  },
 },

}, {
 tableName: 'morning_delays',  // Table name in the DB
 timestamps: true,  // Enable createdAt, updatedAt
});

export default MorningDelay;
