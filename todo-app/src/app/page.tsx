import TodoTable from "@/components/TodoTable";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/Modal";

export default function Home() {
  return (
    <main className="full-w max-auto ml-20 mr-20 mt-8 items-center justify-center">
      <section>
        <Modal title="Add New Task" Adding={true} task={{
          id: 0,
          name: "",
          is_complete: false
        }} >
          <Button variant="default" className="w-full bg-teal-600 px-2 py-1 text-white 
            uppercase text-lg">Add Task</Button>
        </Modal>
      </section>

      <section className="mt-4">
        <TodoTable/>
      </section>
    </main>
  );
}
