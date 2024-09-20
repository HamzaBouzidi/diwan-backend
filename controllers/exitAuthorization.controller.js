import Exit from '../models/exitAuthorization.js';
import { Op } from 'sequelize';

// Function to add a new exit authorisation
export const addExitAuthorisation = async (req, res) => {
 const {
  name,
  day,
  exitStartTime,
  exitEndTime,
  exitDescription
 } = req.body;

 try {
  // Validate that all required fields are present
  if (!name || !day || !exitStartTime || !exitEndTime) {
   return res.status(400).json({ message: 'All required fields must be filled' });
  }

  // Create a new exit authorisation request
  const newExitAuthorisation = await Exit.create({
   name,
   day,
   exitStartTime,
   exitEndTime,
   exitDescription,
   L1: 'In Progress',  // Default value for L1 approval status
   L2: 'In Progress',  // Default value for L2 approval status
   L3: 'In Progress',  // Default value for L3 approval status
   L4: 'In Progress'   // Default value for L4 approval status
  });

  // Respond with the newly created exit authorisation
  return res.status(201).json({
   message: 'Exit authorisation created successfully',
   exitAuthorisation: newExitAuthorisation
  });

 } catch (error) {
  console.error('Error creating exit authorisation:', error);
  return res.status(500).json({ message: 'Internal server error', error: error.message });
 }
};



// Get all exits
export const getAllExits = async (req, res) => {
 try {
  const exits = await Exit.findAll();  // Fetch all exit records from the database
  res.status(200).json(exits);
 } catch (error) {
  console.error('Error fetching exits:', error);
  res.status(500).json({ message: 'Error fetching exits', error });
 }
};


// Get the count of accepted and not accepted Exit Authorizations
export const getExitCountsByAcceptance = async (req, res) => {
 try {
  // Count accepted: where all L fields are "Accepted"
  const acceptedCount = await Exit.count({
   where: {
    L1: 'Accepted',
    L2: 'Accepted',
    L3: 'Accepted',
    L4: 'Accepted',
   },
  });

  // Count not accepted: where any L field is not "Accepted"
  const notAcceptedCount = await Exit.count({
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
  console.error('Error fetching exit counts:', error);
  res.status(500).json({ error: 'Internal server error' });
 }
};
