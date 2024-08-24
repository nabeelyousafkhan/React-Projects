'use server'
import { revalidatePath } from "next/cache";

export async function add_todo(state:{status:string,message:string},formData:FormData)
{
    const new_todo = formData.get('add_task') as string;
    //You can add validation through zod or Yup here

    try
    {
        const response = await fetch('http://127.0.0.1:8000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: new_todo}),
        })
        const data = await response.json()
        if(data.name)
        {
            revalidatePath('/todos')
            return {status: 'success', message: 'Task added successfully'}
        }
        else
            return {status: 'error', message: 'somthing went wrong'}
    }
    catch(error)
    {
        return {status: 'error', message: 'somthing went wrong, ' + error}
    }
}

//Edit Todo
export async function edit_todo(state:{status:string,message:string},{id,name,is_complete}:{id:number,name:string,is_complete:boolean})
{
    //You can add validation through zod or Yup here

    try
    {
        const response = await fetch(`http://127.0.0.1:8000/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:id,name: name,is_complete:is_complete}),
        })
        revalidatePath('/todos')
        return {status: 'success', message: 'Task updated successfully'}
    }
    catch(error)
    {
        return {status: 'error', message: 'somthing went wrong, ' + error}
    }
}

//Change Status
export async function change_status(id:number,name:string,is_complete:boolean)
{
    //You can add validation through zod or Yup here

    try
    {
        const response = await fetch(`http://127.0.0.1:8000/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:name,is_complete:!is_complete}),
        })
        revalidatePath('/todos')
        return {status: 'success', message: 'status change successfully'}
    }
    catch(error)
    {
        return {status: 'error', message: 'somthing went wrong, ' + error}
    }
}

//delete
export async function delete_task(id:number)
{
    //You can add validation through zod or Yup here

    try
    {
        const response = await fetch(`http://127.0.0.1:8000/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        revalidatePath('/todos')
        return {status: 'success', message: 'Task deleted successfully'}
    }
    catch(error)
    {
        return {status: 'error', message: 'somthing went wrong, ' + error}
    }
}