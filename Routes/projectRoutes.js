const express = require('express')

let routes = function(Project){
    const projectRouter = express.Router()


     projectRouter.route('/')
     .post(function(req, res){
        let project =  new Project(req.body)

        project.save()
        res.status(201).send(project)

    })
    .get(function(req, res){

        var query = {}

        if(req.query.title)
        {
            query.title = req.query.title
        }

        Project.find(query,function(err,projects){
            if(err)
                res.status(500).send(err)
            else
                res.json(projects)
        });
    });
        projectRouter.use('/:itemId',function(req,res,next){
            Project.findById(req.params.itemId,function(err,project){
                if(err)
                    res.status(500).send(err)
                else if(project){
                    req.project = project
                    next()
                }else
                    res.status(404).send('no projects found')
            })
        })
    projectRouter.route('/:itemId')
    .get(function(req, res){
            
        res.json(req.project);
    })
    .put(function(req,res){
        Project.findById(req.params.itemId,function(err,project){
            if(err)
                res.status(500).send(err)
            else
                project.title = req.body.title
                project.info = req.body.info
                project.date = req.body.date
                project.read = req.body.read
                project.save(function(err){
                    if(err)
                        res.status(500).send(err)
                    else{
                        res.json(req.project)
                    }
                });
        })
    })
    .patch(function(req,res){
        if(req.body._id)
            delete req.body._id
        for(let p in req.body){
            req.project[p] = req.body[p]
        }
        req.project.save(function(err){
            if(err)
                res.status(500).send(err)
            else{
                res.json(req.project)
            }
        });
    }).delete(function(req,res){
        req.project.remove(function(err){
            if(err){
                res.status(500).send(err)
            }else
                res.status(204).send('deleted')
        })
    })
    return projectRouter
}

module.exports = routes