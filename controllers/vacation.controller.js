import Vacation from '../models/vacation.js';
import { Op } from 'sequelize';

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
  if (!name || !department || !vacationDays || !vacationStartDay || !vacationEndDate) {
   return res.status(400).json({ message: 'All required fields must be filled' });
  }

  const newVacation = await Vacation.create({
   name,
   department,
   vacationDays,
   vacationStartDay,
   vacationEndDate,
   vacationDescription,
   L1: 'In Progress',
   L2: 'In Progress',
   L3: 'In Progress',
   L4: 'In Progress'   
  });

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
  const vacations = await Vacation.findAll({
   attributes: ['id', 'name', 'vacationStartDay', 'vacationEndDate', 'vacationDays', 'vacationDescription', 'L1', 'L2', 'L3', 'L4']
  });
  res.status(200).json(vacations); 
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Error retrieving vacations', error });
 }
};


export const getVacationCountsByState = async (req, res) => {
 try {
  const vacations = await Vacation.findAll(); 

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

export const acceptVacation = async (req, res) => {
 const { vacationId } = req.params;

 try {
  const vacation = await Vacation.findByPk(vacationId);

  if (!vacation) {
   return res.status(404).json({ message: 'Vacation not found' });
  }

  vacation.L1 = 'Accepted';
  vacation.L2 = 'Accepted';
  vacation.L3 = 'Accepted';
  vacation.L4 = 'Accepted';

  vacation.L1_ACCEPT_DATE = new Date();
  vacation.L2_ACCEPT_DATE = new Date();
  vacation.L3_ACCEPT_DATE = new Date();
  vacation.L4_ACCEPT_DATE = new Date();

  await vacation.save();

  res.status(200).json({
   message: 'Vacation accepted successfully',
   vacation
  });
 } catch (error) {
  console.error('Error accepting vacation:', error);
  return res.status(500).json({ message: 'Internal server error' });
 }
};


export const countInProgressVacations = async (req, res) => {
 try {
  const inProgressCount = await Vacation.count({
   where: {
    [Op.or]: [
     { L1: 'In Progress' },
     { L2: 'In Progress' },
     { L3: 'In Progress' },
     { L4: 'In Progress' }
    ],
    [Op.not]: {
     [Op.and]: [
      { L1: 'Accepted' },
      { L2: 'Accepted' },
      { L3: 'Accepted' },
      { L4: 'Accepted' }
     ]
    }
   }
  });
  res.status(200).json({ inProgressCount });
 } catch (error) {
  console.error('Error counting in-progress vacations:', error);
  res.status(500).json({ message: 'Internal server error' });
 }
};