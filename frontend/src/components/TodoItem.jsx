import { CheckSquare, Delete, Edit, Square } from "lucide-react";
import React from "react";
import { useDispatch , useSelector } from "react-redux";
import { deleteTodo, setCurrentTodo, updateTodo } from "../features/todo/TodoSlice";

const TodoItem = ({todo}) => {
  const dispatch = useDispatch();
  const{currentTodo} = useSelector((state)=>state.todo)

  const handleEdit = () =>{
    dispatch(setCurrentTodo({id:todo._id , todo:todo.todo}))
    // console.log(currentTodo) agar i don't use useeffect then it show null for the first time which i have solved in the todolist
  }

  const toggleCheck = ( ) =>{
    try {
      dispatch(updateTodo({id:todo._id , updates:{isCompleted: !todo.isCompleted}})).unwrap();

    } catch (error) {
      console.log("Error in toggleCheck Function in the todoItem component" + error)
    }

  }

  const handleDeleteTodo = () =>{
    try {
      dispatch(deleteTodo(todo._id)).unwrap()
    } catch (error) {
      console.log("some error occured in the handleDeleteTodo function in the todoitem component" + error)
    }
  }

  return (
    <div className="flex flex-col w-full gap-0.5 shadow-lg">
      <div className="flex justify-between ">
        <div className="flex gap-2">
          <div onClick={toggleCheck}>
            {!todo.isCompleted ? (
              <Square className=" size-4 2xl:size-5 text-green-800/80 cursor-pointer" />
            ):
            <CheckSquare className=" size-4 2xl:size-5 text-green-800/80 cursor-pointer"/>
            }
          </div>
          <p className={`font-sans -mt-0.5 lg:-mt-1.5 text-sm lg:text-md 2xl:text-lg ${!todo.isCompleted ? '' : 'line-through'}`}>
            {todo.todo}
          </p>
        </div>
        <div className="flex gap-1 lg:gap-2 max-lg:ml-1">
          <button><Edit onClick={handleEdit} className="size-4 2xl:size-5 text-green-800/80 cursor-pointer" /></button>
          <button><Delete onClick={handleDeleteTodo} className="size-4 2xl:size-5 text-green-800/80 cursor-pointer" /></button>
        </div>
      </div>
      <hr className="w-full text-black/60" />
    </div>
  );
};

export default TodoItem;
