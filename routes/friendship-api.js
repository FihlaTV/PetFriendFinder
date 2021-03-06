const models = require('../models');

module.exports = function(app){
    //Get all friendships
    app.get('/api/friendships', function(req, res){
        models.Friendships.findAll().then(function(dbFriendship){
            res.json(dbFriendship);
        });
    });

    //Get friends of a certain pet
    app.get('/api/friendships/:id', function(req, res){
        models.Friendships.findAll({
            where: {myPetId: req.params.id}
        }).then(function(dbFriendship){
            res.json(dbFriendship);
        });
    });

    //Create friendship
    app.post('/api/friendships', function(req, res){
        models.Friendships.findOne({
            where: {
                myPetId: req.body.myPetId,
                friendPetId: req.body.friendPetId
            }
        }).then(data => {
            if(!data){
                models.Friendships.create({
                    myPetId: req.body.myPetId,
                    friendPetId: req.body.friendPetId
                }).then(function(dbFriendship){
                    models.Pets.findAll({
                        where:
                        {
                            $or: [
                                { id: req.body.myPetId },
                                { id: req.body.friendPetId }
                              ]
                        }
        
                    }).then(function(petsData){
                        //res.json(petsData);
                        res.send('Friend Added!');
                    });
                });
            }
            else{
                console.log("friendship already exists");
                res.send("friendship already exists");
            }
        });
    });

}