import { useState, type ChangeEvent, type FormEvent } from "react"
import { Todo } from "../models/Todo"


type AddTodoProps = {
    addTodo: (t: Todo) => void
}

export const AddTodo = ({addTodo}: AddTodoProps) => {
    // const [todo, setTodo] = useState<Todo>(new Todo("", false));
        const [title, setTitle] = useState("");

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
            setTitle(e.target.value);
    
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (title.trim() === "") return;

        const newTodo = new Todo(title, false);
        addTodo(newTodo);
        setTitle("");
    }

return (
<div className="w-full flex flex-col items-start mx-auto md:items-start md:mx-0 lg:col-span-6">
    <h2 className="text-2xl font-bold mt-5">Kommer du på något mer?</h2>
    <div className="w-[95%] h-[170px] bg-[#BEA2C2] rounded-[20px] flex flex-col items-center justify-center md:max-w-[70%]">
        <form className="flex flex-col items-center my-5 gap-2" onSubmit={handleSubmit}>
            <textarea
                className="rounded-[7px] bg-[#231942] text-white text-base placeholder-grey focus:outline-none focus:ring-2 focus:ring-purple-200 w-[250px] md:w-[400px] lg:w-[250px] "
                id="title" 
                value={title} 
                onChange={handleChange}
                rows={4}
                cols={30}
                placeholder="T.ex. Gå ut med hunden..."/>
            <button className="bg-[#231942] border-none rounded text-white w-[90px] h-[40px] font-semibold text-base">Lägg till</button>    
        </form>
    </div>
    </div>
)
}