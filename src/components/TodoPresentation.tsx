import type { Todo } from "../models/Todo"

type TodoProps = {
    todo: Todo;
    onToggleDone: (id: string) => void;
    onDelete: (id: string) => void;
}

export const TodoPresentation = ({todo, onToggleDone, onDelete}: TodoProps) => {

    return <>
        <li  className={`flex items-center justify-center h-20 ${
    todo.isDone ? "text-gray-500 line-through opacity-60" : ""
    }`}>
                    <input className="w-[25px] h-[25px] accent-[#411010] cursor-pointer mr-6"
                        type="checkbox" title="Klicka här när uppgiften är färdig" checked={todo.isDone} onChange={() => onToggleDone(todo.id)} />
                    <span className="w-[60%] md:text-[1.5rem]">{todo.title}</span>
                    <button className="bg-[#231942] border-none rounded w-[60px] h-[40px] mr-2 md:w-[80px]" onClick={() => onDelete(todo.id)}>🗑️</button>
                </li>
    </>
}