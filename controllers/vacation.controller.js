import Vacation from '../models/vacation.js';

// Function to add a new vacation request
export const addVacation = async (req, res) => {
 const {
  name,
  department,
  vacationDays,
  vacationStartDay,
  vacationEndDate,
  vacationDescription
 } = req.body;

 try {
  // Validate that all required fields are present
  if (!name || !department || !vacationDays || !vacationStartDay || !vacationEndDate) {
   return res.status(400).json({ message: 'All required fields must be filled' });
  }

  // Create a new vacation request
  const newVacation = await Vacation.create({
   name,
   department,
   vacationDays,
   vacationStartDay,
   vacationEndDate,
   vacationDescription,
   L1: 'In Progress',  // Default value for L1 approval status
   L2: 'In Progress',  // Default value for L2 approval status
   L3: 'In Progress',  // Default value for L3 approval status
   L4: 'In Progress'   // Default value for L4 approval status
  });

  // Respond with the newly created vacation
  return res.status(201).json({
   message: 'Vacation request created successfully',
   vacation: newVacation
  });

 } catch (error) {
  console.error('Error creating vacation:', error);
  return res.status(500).json({ message: 'Internal server error' });
 }
};



export const getAllVacations = async (req, res) => {
 try {
  const vacations = await Vacation.findAll();  // Fetch all vacations from the database
  res.status(200).json(vacations);  // Send the vacations as JSON response
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Error retrieving vacations', error });
 }
};


// Function to get vacation counts by state
export const getVacationCountsByState = async (req, res) => {
 try {
  const vacations = await Vacation.findAll(); // Fetch all vacations

  // Initialize counters
  let inProgressCount = 0;
  let refusedCount = 0;
  let acceptedCount = 0;

  vacations.forEach(vacation => {
   const statuses = [vacation.L1, vacation.L2, vacation.L3, vacation.L4];

   if (statuses.includes('Refused')) {
    refusedCount++;
   } else if (statuses.every(status => status === 'Accepted')) {
    acceptedCount++;
   } else {
    inProgressCount++;
   }
  });

  // Return the counts in JSON format
  res.json({
   inProgress: inProgressCount,
   refused: refusedCount,
   accepted: acceptedCount,
  });
 } catch (error) {
  console.error('Error fetching vacation data:', error);
  res.status(500).json({ error: 'Internal server error' });
 }
};
