
import { Todo } from "../../types"
import Task from "./Task"

export default async function TodoTable()
{
    let myTodo_list: Todo[] = []
    try
    {
        const response = await fetch("https://todo-fastapi-iota.vercel.app/todos");    
        const data = await response.json();
        myTodo_list = data.sort((a:Todo,b:Todo)=> a.id - b.id)
    }
    catch
    {
        throw (`Failed to fetch data`);
    }

    return(
        <table className="w-full">
            <thead>
                <tr className="flex justify-between items-center px-2 py-1 bg-gray-100 shadow-md">
                    <th>Task</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    myTodo_list.map((task:Todo)=>(
                        <Task key={task.id} task={task}></Task>
                    ))
                }
            </tbody>
        </table>
    )
}