const Task=require('../Model/TaskModel');
const User=require('../Model/UserModel');

module.exports.CreateTask=async(req,res)=>{
    const {title,description}=req.body;
    try{
        const task=new Task({user:req.user._id,title,description})
        await task.save()
        res.status(200).json({task})
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }

}
module.exports.UpdateStatus=async(req,res)=>{
    const {taskId,status}=req.body;
    try{
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.status = status;
        await task.save();
        res.status(200).json({message:task});
    }
catch(err){
    console.error(err.message);
        res.status(500).send('Server error');
}
}


module.exports.getTasks=async(req,res)=>{
    // try {
        const tasks = await Task.find({ user: req.user._id});
        res.status(200).json({message:tasks})
    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server error');
    // }
}
module.exports.getAllTasks=async(req,res)=>{
    try {
        const tasks = await Task.find({ });
        res.status(200).json({message:tasks})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
module.exports.dashbordcount=async (req, res) => {
    try {
        const activeUserCount = await User.countDocuments({}); 
        const totalTaskCount = await Task.countDocuments({}); 
        res.status(200).json({ activeUserCount, totalTaskCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}
module.exports.approveTask=async(req,res)=>{
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        task.status = 'Approved';
        await task.save();
        res.status(200).json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}