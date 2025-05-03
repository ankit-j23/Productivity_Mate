import Todo from "../models/todos.model.js"

export const getTodos = async (req , res) =>{
    try {
        //getting the user id from req
        const userId = req.user.id           // Todo: Confirm if `req.user.id` is correct or if `_id` is needed

        //fetching the todos for the corresponding user with the above id
        const todos = await Todo.find({ user:userId});

        res.status(200).json(todos)
    } catch (error) {
        console.log("Some error occured in the getTodos controller" + error.message)
        res.status(500).json({message : "Internal server error"})
    }
}
export const addTodo = async (req , res) =>{
    try {
        const { todo , isCompleted } = req.body;

        const newTodo = new Todo({
            user : req.user.id,
            todo,
            isCompleted
        })

        const savedTodo = await newTodo.save();

        res.status(201).json(savedTodo);
        // console.log(req.user.id)
        // console.log(req.body)

    } catch (error) {
        console.log("Some error occured in the addTodo Controller" + error.message)
        res.status(500).json({message : "Internal server error"})
    }
}
export const updateTodo = async (req , res) =>{
    try {
        const { isCompleted , todo } = req.body;
        let newTodo = {};
        
        //saving the todo in newNote
        if(todo){
            newTodo.todo = todo;
        }
        if(typeof isCompleted !== 'undefined'){
            newTodo.isCompleted = isCompleted;
        }

        //finding the todo to be updated
        const existingTodo = await Todo.findById(req.params.id);

        if(!existingTodo){
            return res.status(404).json({message : "Todo not found"});
        }

        //comparing the id of the todo
        if(existingTodo.user.toString() !== req.user.id){                    // Todo: Confirm if `req.user.id` is correct or if `_id` is needed
            return res.status(403).json({message : "Update not allowed"})
        }

        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id , {$set : newTodo} , {new : true})

        res.status(200).json(updatedTodo)

    } catch (error) {
        console.log("Some error occured in the updateTodo controller" + error.message)
        res.status(500).json({message : "Internal server error"})
    }
}
export const deleteTodo = async (req , res) =>{
    try {
        //getting the todo with id
        let existingTodo = await Todo.findById(req.params.id);

        if(!existingTodo){
            return res.status(404).json({message : "Todo not found"})
        }

        //comparing the todo id
        if(existingTodo.user.toString() !== req.user.id){
            return res.status(403).json({message : "Deletion not allowed"})
        }

        await Todo.findByIdAndDelete(req.params.id);

        res.status(200).json({message : "Todo deleted successfully"})

    } catch (error) {
        console.log("Some error occured in the deletetodo controller")
        res.status(500).json({message : "Internal server error"})
    }
}

