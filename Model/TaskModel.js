const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: 
    { type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        required: true 
    },
    title:
    { type: String, 
       required: true
    },
    description:
     { type: String, 
        required: true
     },
    status: 
    { type: String,
         enum: ['Pending', 'Completed','Approved'], 
         default: 'Pending' },
});

 
const Task= mongoose.model('Task', taskSchema);
module.exports=Task