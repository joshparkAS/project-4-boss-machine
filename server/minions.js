const express = require('express');
const minionRouter = express.Router();

const workRouter = require('./work');

minionRouter.use('/work', workRouter);
minionRouter.use('/ideas', ideaRouter);

const {   createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
  } = require('./db');

// .use function that checks if minionId exists for every call that uses path /:minionId
minionRouter.use('/:minionId', (req, res, next) => {
	const minionId = req.params.minionId;
	let arr = getAllFromDatabase('minions');
	if (arr[minionId] !== -1) {
    	return res.status(404).send('Minion with that id does not exist');
 	} else {
 		req.minion = arr[minionId];
 		req.id = minionId;
 	}
 	next();
});

// gets all minions
minionRouter.get('/', (req, res, next) => {
  let arr = getAllFromDatabase('minions');
  res.send(arr);
});

// gets a single minion
minionRouter.get('/:minionId', (req, res, next) => {
	const getMinion = getFromDatabaseById('minions',req.id);
	res.send(getMinion);
});

minionRouter.put('/:minionId', (req, res, next) => {
	const putMinion = req.body;
	updateInstanceInDatabase('minions', putMinion);
 	res.status(200).send(putMinion);
});

minionRouter.post('/', (req, res, next) => {
	const newMinion = req.body;
	if (typeof(newMinion.salary) === 'number' && newMinion.name) {
		addToDatabase('minions',newMinion);
		res.status(201).send(newMinion);
	} else {
		res.status(201).send();
	}
});

minionRouter.delete('/:minionId', (req, res, next) => {
	deleteFromDatabasebyId('minions', req.id);
	res.status(204).send();
})

module.exports = minionRouter;