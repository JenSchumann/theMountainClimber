const express = require('express');
const router = express.Router();
const Mountain = require('../models/mountains.js');
const Climber = require('../models/climbers.js')
const bcrypt = require('bcrypt');

router.get('/', (req, res)=>{
  console.log(req.session, ' this is req.session in auth route')
	Climber.find({}, (err, foundClimbers)=>{
		res.render('climbers/index.ejs', {
			climbers: foundClimbers
		});
	})
});

router.post('/', (req, res)=>{
  // res.send(req.body);
	Climber.create(req.body, (err, createdClimber)=>{
    res.send(createdClimber);
    // createdClimber.mountains.push(req.body.fourteeners);
		// res.redirect('/climbers');
	});
});

router.get('/new', (req, res)=>{
  Mountain.find({}, (err, allMountains)=>{
        res.render('climbers/new.ejs', {
            mountains: allMountains
        });
    });
});

router.get('/:id', (req, res)=>{
	Climber.findById(req.params.id, (err, foundClimber)=>{
		res.render('climbers/show.ejs', {
			climber: foundClimber
		});
	});
});

router.delete('/:id', (req, res)=>{

	Climber.findByIdAndRemove(req.params.id, (err, foundClimber)=>{
		const mountainIds = [];
		for (let i = 0; i < foundClimber.mountains.length; i++) {
			mountainIds.push(foundClimber.mountains[i]._id);
		}
		Mountain.remove(
			{
				_id : {
					$in: mountainIds
				}
			},
			(err, data)=>{
				res.redirect('/climbers');
			}
		);
	});
});

router.get('/:id/edit', (req, res)=>{
	Climber.findById(req.params.id, (err, foundClimber)=>{
		res.render('climbers/edit.ejs', {
			climber: foundClimber
		});
	});
});

router.put('/:id', (req, res)=>{
	Climber.findByIdAndUpdate(req.params.id, req.body, ()=>{
		res.redirect('/climbers');
	});
});

module.exports = router;
