import { useFormStatus } from "react-dom"

export default function SubmitTask()
{
    const {pending} = useFormStatus()
    return(
        <button disabled={pending} className="w-full px-2 py-1 bg-teal-600 text-white rounded-md mt-4">
          {pending ? "Saving" : "Save"}
        </button>
    )
}