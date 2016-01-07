(function (ideaController) {
    
    var mongodb = require("mongodb");
    var mongoUrl = "mongodb://localhost:27017/nodees6trials";
    var ideaDB = null;
    
    ideaController.getDb = function (callback) {
        if (!ideaDB) {    
            mongodb.MongoClient.connect(mongoUrl, function (err, db) {
                if (err) {
                    callback(err, null);
                } else {
                    ideaDB = {
                        db: db,
                        ideas: db.collection("ideas")
                    };
                    callback(null, ideaDB);
                }
            });
        } else {
            callback(null, ideaDB);
        }
    }
    
    ideaController.init = function(app) {
        
       app.get("/idea/seed",function(request, response){
           var seedIdeas = [
                {title : "Seed Idea 1"},
                {title : "Seed Idea 2"},
                {title : "Seed Idea 3"},
                {title : "Seed Idea 4"},    
           ];
           ideaController.getDb(function(err,db){
               if(err){
                   console.log("Failed to seed databaase :" + err);
               }
               seedIdeas.forEach(function (item) {
                   db.ideas.insert(item, function (err) {
                       if (err) {
                           console.log("Failed to insert idea into database");
                       }
                   });
                });
                response.send("Seed Data Added");        
            });
       });
       
       app.get("/idea",function(request, response){
           ideaController.getDb(function(err, db) {
               db.ideas.find().toArray(function(err, results){
                    response.render("idea", {
                        ideas: results
                    });    
               });
           });
       });  
    }
    
})(module.exports);