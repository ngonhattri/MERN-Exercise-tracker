const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
       .then(exercises => res.json(exercises))
       .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const categoryName = req.body.categoryName;
    const difficulty = req.body.difficulty;
    const question = req.body.question;
    const correctAnswer = req.body.correctAnswer;
    
    const newExercise = new Exercise({
        username,
        categoryName,
        difficulty,
        question,
        correctAnswer
    });

    newExercise.save()
       .then(() => res.json('Exercise added!'))
       .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error' + err));
}); 

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(exercise => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error' + err));
}); 

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
        exercise.username = req.body.username;
        exercise.categoryName = req.body.categoryName;
        exercise.difficulty = req.body.difficulty;
        exercise.question = req.body.question;
        exercise.correctAnswer = req.body.correctAnswer;

        exercise.save()
            .then(() => res.json('Exercise updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error' + err));
}); 
module.exports = router;