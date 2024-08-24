import { Todo } from "../../types"
import Task from "./Task"

export default async function TodoTable()
{
    const response = await fetch("http://127.0.0.1:8000/todos");
    const data = await response.json();
    const myTodo_list: Todo[] = data.sort((a:Todo,b:Todo)=> a.id - b.id)

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