import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../icons/TrashIcon";
import { Column, Id, Task } from "../types";
import {CSS} from "@dnd-kit/utilities";
import { useMemo, useRef, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string, isNew: boolean) => void;
    createTask: (columnId: Id, backgroundColor: string, isNew: boolean, editMode: boolean) => void;
    tasks: Task[];
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string, backgroundColor: string, isNew: boolean) => void;
}

function ColumnContainer(props: Props) {
    const { column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask} = props;

    const [editMode, setEditMode] = useState(column.isNew);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedColumnId, setSelectedColumnId] = useState<Id | null>(null);

    const inputRef = useRef<HTMLInputElement | null>(null); // Define the ref type

    const tasksIds = useMemo(() => {
        return tasks.map(task => task.id);
    }, [tasks]);

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } 
    = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
        disabled: editMode,
    });

    // console.log("column.editMode on start: " + column.isNew);
    // console.log("editMode on start: " + editMode);

    const handleColumnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key != "Enter") return;
        setEditMode((prev) => !prev);
        updateColumn(column.id, column.title, false)
        //console.log("column status: " + column.isNew);
        //console.log("edit status: " + editMode);
    }

    const confirmDelete = () => {
        if (selectedColumnId !== null){
            deleteColumn(selectedColumnId);
            setShowConfirm(false);
            setSelectedColumnId(null);
        }
    }

    const cancelDelete = () => {
        setShowConfirm(false);
        setSelectedColumnId(null);
    }

    const handleDeleteColumn = (columnId: Id) => {
        setSelectedColumnId(columnId);
        setShowConfirm(true);
    }

    const handleColumnBlur = () => {
        setEditMode((prev) => !prev);
        updateColumn(column.id, column.title, false)
    }

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return <div ref = {setNodeRef} style = {style} className="
        bg-columnBackgroundColor
        opacity-40
        border-2
        border-mainAccentColor
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
        "></div>
    }
    
    return <div ref = {setNodeRef} style = {style} className="
    bg-columnBackgroundColor
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col
    "
    >
        {/* Column Title */}
        <div {...attributes} {...listeners} 
        onClick={() => { 
            setEditMode(true); 
            if (inputRef.current) {
                inputRef.current.select();
            }
        }}
        className="
        bg-mainBackgroundColor
        text-md
        h-[60px]
        cursor-grab
        rounded-lg
        p-3
        font-bold
        border-columnBackgroundColor
        hover:text-mainAccentColor
        border-4
        flex
        items-center
        justify-between
        "
        >
            <div className="
            flex
            gap-2
            ">
                <div className="
                flex
                justify-center
                items-center
                bg-columnBackgroundColor
                px-2
                py-1
                text-sm
                rounded-full
                "
                >{tasks.length}</div>
                {!editMode && !column.isNew && !showConfirm ? (
                    column.title
                ) : (
                    <input 
                        ref={inputRef}
                        className="
                        bg-black 
                        focus:border-mainAccentColor
                        rounded 
                        border 
                        outline-none 
                        px-2"
                        value = {column.title}
                        onChange={ e => updateColumn(column.id, e.target.value, false)}
                        autoFocus 
                        onBlur={handleColumnBlur}
                        onKeyDown={handleColumnKeyDown}
                    />
                )}
            </div>
            <button 
            onClick= {() => {
               handleDeleteColumn(column.id);
            }}
            className="
            stroke-gray-500
            hover:stroke-white
            hover:bg-columnBackgroundColor
            rounded
            px-1
            py-2
            "
            >
                <TrashIcon />
            </button>
        </div>

        {showConfirm && (
            <div className="
            fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-mainBackgroundColor bg-opacity-50
            ">
                <div className="bg-pageBackgroundColor rounded-lg p-6">
                        <p>Are you sure you want to delete this column?</p>
                    <div className="mt-4 flex justify-end">
                        <button
                        className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={confirmDelete}
                        >
                        Delete
                        </button>
                        <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        onClick={cancelDelete}
                        >
                        Cancel
                        </button>
                    </div>
                </div>
            </div>
        )}
       
        {/* Column Task Container */}
        <div className="
        flex 
        flex-grow
        flex-col
        gap-4
        p-2
        overflow-x-hidden
        overflow-y-auto
        ">
            <SortableContext items={tasksIds}>
                {tasks.map((task) => (
                    <TaskCard 
                    key={task.id} 
                    task={task} 
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    />
                ))}
            </SortableContext>
        </div>

        

        {/* Column Footer */}
        <button className="
            flex 
            gap-2 
            items-center 
            border-columnBackgroundColor 
            border-2 
            rounded-md 
            p-4 
            border-x-columnBackgroundColor 
            hover:bg-mainBackgroundColor 
            hover:text-mainAccentColor
            active:bg-pageBackgroundColor
        "
        onClick={() => createTask(column.id, "#6200EE", true, true)}>
            <PlusIcon />
            Add Task</button>
        </div>
}

export default ColumnContainer