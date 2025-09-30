import { useState } from "react"
import { Todo } from "../models/Todo"
import { TodoPresentation } from "./TodoPresentation"
import { AddTodo } from "./AddTodo"


export const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>(
        JSON.parse(localStorage.getItem("todos") || JSON.stringify([
            new Todo("Göra inlämningsuppgiften", false),
            new Todo("Handla mat", false),
            new Todo("Gör ett spread i junk journal", false),
            new Todo("Vattna blommorna", false),
            new Todo("Ta en promenad", false),
            new Todo("Se Håkan Hellström på Ullevi", false)  
        ])))

        const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>();

        const sortedTodos = sortOrder ? [...todos].sort((a, b) =>
        sortOrder ==="asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    ) : todos;

    const toggleDone = (id: string) => {
        setTodos(
            todos.map((t) => {
                if(t.id === id) {
                    return{...t, isDone: !t.isDone};
                }
                return t;
            })
        )
    }

    const deleteTodo = (id : string) => {
        setTodos(todos.filter((t) => t.id !== id ))
    }

    const addTodo = (t: Todo) => {
    setTodos([...todos, t]);
    };

    localStorage.setItem("todos", JSON.stringify(todos))

    return (
        <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-6">
        <select 
        className="bg-[#231942] m-2 text-white w-30 h-7 rounded font-semibold text-base"
        value={sortOrder ?? ""}
        onChange={(e) => {
            const value = e.target.value;
            setSortOrder(value === "" ? null : (value as "asc" | "desc"));
        }}
        >
            <option value="">Sortera</option>
            <option value="asc">A–Ö</option>
            <option value="desc">Ö–A</option>
        </select>
            <ul className="list-none p-0 bg-[#BEA2C2] rounded-[20px] overflow-hidden w-[95%] text-[1.2rem] md:max-w-[70%] md:text-[1.3rem]">
            {sortedTodos.map((todo) => (
                    <TodoPresentation
                    key={todo.id} 
                    todo={todo}
                    onToggleDone={toggleDone}
                    onDelete={deleteTodo}
                    />

            ))}
        </ul>
        </div>
        <AddTodo addTodo={addTodo} />
        </div>
    )
}