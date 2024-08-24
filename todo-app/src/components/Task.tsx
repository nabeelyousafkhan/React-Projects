'use client'
import { CiSquareCheck } from "react-icons/ci";
import { Todo } from "../../types";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Tooltips from "./ToolTips";
import { Modal } from "./ui/Modal";
import { change_status, delete_task } from "@/actions/actions";
import toast from "react-hot-toast";

export default function Task({task}: {task:Todo})
{
    const hndleStatus = async () => {
        const response = await change_status(
            task.id,
            task.name,
            task.is_complete
        )

            if(response.status=='success')
            {
                toast.success(response.message)
            }
            else if(response.status=='error')
            {
                toast.error(response.message)
            }
    }

    const handleDelete = async () =>{
        const response = await delete_task(task.id)
            if(response.status=='success')
            {
                toast.success(response.message)
            }
            else if(response.status=='error')
            {
                toast.error(response.message)
            }
    }

    return(
        <tr className="flex justify-between items-center border-b border-gray-300 px-2 py-2">
            <td>{task.name}</td>
            <td className="flex gap-x-2">
                <Tooltips tool_tip_content="Mark as Complete">
                <button onClick={hndleStatus}>
                <CiSquareCheck size={24} 
                className={`${task.is_complete ? "text-green-500" : "text-gray-300"}`} />
                </button>
                </Tooltips>
                
                <Tooltips tool_tip_content="Edit Task">
                <Modal title="Edit Task" Editing={true} task={task}>
                <FiEdit size={20} className="text-blue-500" /></Modal>
                </Tooltips>
                <Tooltips tool_tip_content="Delete Task">
                <button onClick={handleDelete}>
                <FiTrash2 size={20} className="text-red-600"/>
                </button>
                </Tooltips>
            </td>
        </tr>
    )
}