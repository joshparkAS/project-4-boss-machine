const express = require('express');
const ideaRouter = express.Router();

module.exports = ideaRouter;

const {   createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
  } = require('./db');

  
// .use function that checks if minionId exists for every call that uses path /:minionId
ideaRouter.use('/:ideaId', (req, res, next) => {
	const ideaId = req.params.ideaId;
	let arr = getAllFromDatabase('ideas');
	if (arr[ideaId] !== -1) {
    	return res.status(404).send('Idea with that id does not exist');
 	} else {
 		req.idea = arr[ideaId];
 		req.id = ideaId;
 	}
 	next();
});


ideaRouter.get('/', (req, res, next) => {
  let arr = getAllFromDatabase('ideas');
  res.send(arr);
});

ideaRouter.get('/:ideaId', (req, res, next) => {
	const getIdea = getFromDatabaseById('ideas',req.id);
	res.send(getIdea);
});

ideaRouter.put('/:ideaId', (req, res, next) => {
	const putIdea = getFromDatabaseById('ideas', req.id);
 	putIdea.name = req.body.name;
 	putIdea.title = req.body.title;
 	putIdea.weaknesses = req.body.weaknesses;
 	putIdea.salary = req.body.salary;
 	res.status(200).send(putMinion);
});

ideaRouter.post('/', (req, res, next) => {
	const newIdea = req.query;
	if (typeof(newIdea.weeklyRevenue) === 'number' && newIdea.numWeeks === 'number') {
		addToDatabase('ideas',newIdea);
		res.status(201).send(newIdea);
	} else {
		res.status(201).send();
	}
});

ideaRouter.delete('/:ideaId', (req, res, next) => {
	deleteFromDatabasebyId('ideas', req.id);
	res.status(204).send();
})