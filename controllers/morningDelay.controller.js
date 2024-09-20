import MorningDelay from '../models/morningDelay.js';
import { Op } from 'sequelize';

// Function to add a new morning delay
export const addMorningDelay = async (req, res) => {
 const {
  name,
  day,
  description,
  time
 } = req.body;

 try {
  // Validate that all required fields are present
  if (!name || !day || !time) {
   return res.status(400).json({ message: 'All required fields must be filled' });
  }

  // Create a new morning delay entry
  const newMorningDelay = await MorningDelay.create({
   name,
   day,
   description,
   time,
   L1: 'In Progress',  // Default value for L1 approval status
   L2: 'In Progress',  // Default value for L2 approval status
   L3: 'In Progress',  // Default value for L3 approval status
   L4: 'In Progress'   // Default value for L4 approval status
  });

  // Respond with the newly created morning delay entry
  return res.status(201).json({
   message: 'Morning delay created successfully',
   morningDelay: newMorningDelay
  });

 } catch (error) {
  console.error('Error creating morning delay:', error);
  return res.status(500).json({ message: 'Internal server error', error: error.message });
 }
};


// Get all morning delays
export const getAllMorningDelays = async (req, res) => {
 try {
  const delays = await MorningDelay.findAll();  // Fetch all morning delay records
  res.status(200).json(delays);
 } catch (error) {
  console.error('Error fetching morning delays:', error);
  res.status(500).json({ message: 'Error fetching morning delays', error });
 }
};

// Get the count of accepted and not accepted Morning Delays
export const getMorningDelayCountsByAcceptance = async (req, res) => {
 try {
  // Count accepted: where all L fields are "Accepted"
  const acceptedCount = await MorningDelay.count({
   where: {
    L1: 'Accepted',
    L2: 'Accepted',
    L3: 'Accepted',
    L4: 'Accepted',
   },
  });

  // Count not accepted: where any L field is not "Accepted"
  const notAcceptedCount = await MorningDelay.count({
   where: {
    [Op.or]: [
     { L1: { [Op.ne]: 'Accepted' } },
     { L2: { [Op.ne]: 'Accepted' } },
     { L3: { [Op.ne]: 'Accepted' } },
     { L4: { [Op.ne]: 'Accepted' } },
    ],
   },
  });

  res.json({
   accepted: acceptedCount,
   notAccepted: notAcceptedCount,
  });
 } catch (error) {
  console.error('Error fetching morning delay counts:', error);
  res.status(500).json({ error: 'Internal server error' });
 }
};