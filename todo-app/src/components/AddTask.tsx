"use client"

import {add_todo} from '@/actions/actions'
import {useFormState} from 'react-dom'
import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast';
import SubmitButton from './SubmitButton';

export default function AddTask ()
{
    const ref = useRef<HTMLFormElement>(null);
    const [state, formActions] = useFormState(add_todo,{status:"",message:""})
    const {status,message} = state;

    useEffect(()=>{
        if(status=='success')
        {
            ref.current?.reset();
            toast.success(message)
        }
        else if(status=='error')
        {
            toast.error(message)
        }
    },[state])

    return(
        <form ref={ref} action={formActions} className="flex flex-col justify-between items-center gap-x-3 w-full">
            <input type="text" placeholder="Add Task here"
            minLength={3} maxLength={55} required name="add_task"
            className="w-full px-2 py-1 border border-gray-100 rounded-md"></input>
            <SubmitButton/>
        </form>
    )
}