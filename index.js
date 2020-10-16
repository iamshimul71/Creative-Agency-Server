const express = require('express')
const {ObjectId} = require('mongodb')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5j0vg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 5000



const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const servicecollection = client.db("Agency").collection("service");
  const AdminCollection = client.db("Agency").collection("AdminCollection");
  const AdninServiceCollection = client.db("Agency").collection("AdninServiceCollection");
  const OrderCollection = client.db("Agency").collection("OrderCollection");
  
  const ReviewCollection = client.db("Agency").collection("ReviewCollection");
  app.post('/serviceData',(req,res)=>{
    const service = req.body
    servicecollection.insertMany(service).limit(2)
   .then(result=>{

   })

  })

  

  app.post('/AddOrder',(req,res)=>{
    const order = req.body
    OrderCollection.insertOne(order)
   .then(result=>{
          res.send(result.insertedCount>0)
   })

  })
  app.get('/getorderallData',(req,res)=>{
    OrderCollection.find({})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })

  app.post('/AddReview',(req,res)=>{
    const order = req.body
    ReviewCollection.insertOne(order)
   .then(result=>{
          res.send(result.insertedCount>0)
   })

  })

  app.post('/AddSerciceAdmin',(req,res)=>{
    const order = req.body
    AdninServiceCollection.insertOne(order)
   .then(result=>{
          res.send(result.insertedCount>0)
   })

  })


  app.post('/add-admin',(req,res)=>{
    const email = req.body
    AdminCollection.insertOne(email)
    .then(result=>{
      res.send(result.insertedCount>0)
    })
    .catch(err=>console.log(err))
  })
  


  app.get('/servicesingleData/:id',(req,res)=>{
     
    servicecollection.find({_id: ObjectId(req.params.id)})
    .toArray((err,documents)=>{
      res.send(documents[0])
    })
   

})

  app.get('/serviceallData',(req,res)=>{
    servicecollection.find({})
    .toArray((err,documents)=>{
      res.send(documents)
    })

})
app.get('/AdminServiceDaTA',(req,res)=>{
  AdninServiceCollection.find({})
  .toArray((err,documents)=>{
    res.send(documents)
  })

})





app.get('/serviceListEmail',(req,res)=>{
     
  OrderCollection.find({email:req.query.email})
  .toArray((err,documents)=>{
    res.send(documents)
  })
 

})
app.get('/OrderListEmail',(req,res)=>{
     
  ReviewCollection.find({email:req.query.email})
  .toArray((err,documents)=>{
    res.send(documents)
  })
 

})

app.post('/isAdmin',(req,res)=>{
   const email = req.body.email  
  AdminCollection.find({email:email})
  .toArray((err,admin)=>{
    res.send(admin.length>0)
  })
 

})


  
});


app.listen(process.env.PORT || port)