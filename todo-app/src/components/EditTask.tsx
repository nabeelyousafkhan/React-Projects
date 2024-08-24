'use client'
import { edit_todo } from "@/actions/actions";
import { Todo } from "../../types";
import {useFormState} from 'react-dom'
import SubmitButton from "./SubmitButton";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";

export default function EditTask ({task}:{task:Todo})
{
    const [value,setValue] = useState(task.name)
    const [state, formActions] = useFormState(edit_todo,{status:"",message:""})
    const {status,message} = state;

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setValue(e.target.value)
    }

    const handlSubmit = (formData:FormData) =>
    {
        const id:number = task.id
        const name:string = formData.get('eidt_task') as string
        const is_complete:boolean = task.is_complete
        formActions({id,name,is_complete})
    }

    useEffect(()=>{
        if(status=='success')
        {
            toast.success(message)
        }
        else if(status=='error')
        {
            toast.error(message)
        }
    },[state])

    return(
        <form action={handlSubmit} className="flex flex-col justify-between items-center gap-x-3 w-full">
            <input type="text" placeholder="Add Task here" 
            onChange={handleChange}
            value={value}
            minLength={3} maxLength={55} required name="eidt_task"
            className="w-full px-2 py-1 border border-gray-100 rounded-md"></input>
            <SubmitButton/>
        </form>
    )
}