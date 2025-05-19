const express = require('express');
const mongoose= require ('mongoose');
const cors= require('cors');



const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://abhirambca2021:abhi@cluster0.qqp1mke.mongodb.net/Root?retryWrites=true&w=majority&appName=Cluster0'
 ).then(()=>console.log("mongodb connected")
).catch(err=>console.log("momgodb error")
)


// model

const noteSchema = new mongoose.Schema ({
    title:String,
    text:String
})
const Note = mongoose.model('Note',noteSchema)

    // Routes


    // Get all notes 

    app.get('/notes',async(req,res)=>{
        const notes = await Note.find();
        res.json(notes)
    })





    app.post('/notes',async(req,res)=>{
       
       try{
         const newNote = new Note (req.body);
        await newNote.save();
        res.json(newNote)
       }catch(err){
        console.error(err);
        res.status(500).json({message:"error"})
       }
    })


    // update


    app.put('/notes/:id',async(req,res)=>{
        const updateNote = await Note.findByIdAndUpadte(rep.params.id,req.body,{new:true});
        res.json(updateNote)
    })


    //  delete note 

    app.delete('notes/:id' , async(req,res)=>{
        await Note.findByIdAndDelete(req.params.id);
        res.json({message:'note deleted'})
    })


    app.get('/',(req,res)=>{
        res.send("server is running")
    })








    app.listen(5001,()=>{
        console.log('Server running');
        
    })
