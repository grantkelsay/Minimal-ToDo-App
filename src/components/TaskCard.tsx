import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Id, Task } from "../types"
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import ElipseIcon from "../icons/ElipseIcon";

interface Props {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string, backgroundColor: string) => void;
}

function TaskCard({task, deleteTask, updateTask}: Props) {

    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState<string>("#6200EE");
    const [colorDropdownVisible, setColorDropdownVisible] = useState(false);
    const [isColorPickerClicked, setIsColorPickerClicked] = useState(false);


    const { setNodeRef, attributes, listeners, transform, transition, isDragging } 
    = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
        disabled: editMode,
    });

    const colorOptions = [
        { label: "bg-red-600", value: "#DC2626"},
        { label: "bg-blue-600", value: "#2563EB"},
        { label: "bg-orange-600", value: "#EA580C"},
        { label: "bg-green-600", value: "#16A34A"},
        { label: "bg-secondaryAccentColor", value: "#6200EE"}
    ];

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        backgroundColor: backgroundColor || undefined,
    };

    const handleColorSelection = (selectedColor: string) => {
        setBackgroundColor(selectedColor);
        setColorDropdownVisible(false);
        updateTask(task.id, task.content, selectedColor); // Pass the selected color to the updateTask function
        console.log("selected color: " + selectedColor);
    };

    const handleClick = () => {
        if (!isColorPickerClicked) {
            toggleEditMode();
        }
    }

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
        task.isNew = false;
        setMouseIsOver(false);
    }

    if (isDragging) {
        return (<div 
        ref={setNodeRef}
        style={{
            ...style,
            backgroundColor: task.backgroundColor,
        }}
        className="
        p-2.5
        h-[100px]
        min-h-[100px]
        items-center
        flex
        text-left
        rounded-xl
        hover:ring-2
        hover:ring-inset
        hover:ring-mainAccentColor
        cursor-grab
        relative
        task
        opacity-30
        border-2
        border-mainAccentColor"
        />)
    }

    if (editMode || task.isNew) {
        return (
        <div 
        ref={setNodeRef}
        style={{
            ...style,
            backgroundColor: task.backgroundColor,
        }}
        {...attributes}
        {...listeners}
        className="
        p-2.5
        h-[100px]
        min-h-[100px]
        items-center
        flex
        text-left
        rounded-xl
        hover:ring-2
        hover:ring-inset
        hover:ring-mainAccentColor
        cursor-grab
        relative"
        >
            <textarea className="
            h-[90%]
            w-full
            resize-none
            ring-2
            ring-outset
            ring-mainAccentColor
            rounded-lg
            p-3
            rounded
            bg-transparent
            text-white
            opacity-60
            focus:outline-none"
            value={task.content}
            autoFocus
            placeholder="Task content here"
            onBlur={handleClick}
            onKeyDown={(e) => {
                if (e.key === "Enter" && e.shiftKey || task.isNew) handleClick();
            }}
            onChange={e => updateTask(task.id, e.target.value, task.backgroundColor)}
            />
        </div>)
    }

    return (
        <div 
        ref={setNodeRef}
        style={{
            ...style,
            backgroundColor: task.backgroundColor,
        }}
        {...attributes}
        {...listeners}
        onClick={handleClick}
        className="
        p-2.5
        h-[100px]
        min-h-[100px]
        items-center
        flex
        text-left
        rounded-xl
        hover:ring-2
        hover:ring-inset
        hover:ring-mainAccentColor
        cursor-grab
        relative
        task"
        onMouseEnter={() => {
            setMouseIsOver(true);
        }}
        onMouseLeave={() => {
            setMouseIsOver(false);
            setColorDropdownVisible(false);
        }}
        >
            <p className="
            my-auto
            h-[90%]
            w-full
            overflow-y-auto
            overflow-x-hidden
            whitespace-pre-wrap"
            >{task.content}</p>
            
            { mouseIsOver && (
                <button onClick={() => {
                    deleteTask(task.id);
                }}
                className="
                    stroke-white
                    absolute
                    right-4
                    top-1/2-translate-y-1/2
                    bg-columnBackgroundColor
                    p-2
                    rounded
                    opacity-60
                    hover:opacity-100
                    ">
                    <TrashIcon />
                </button>
            )}

            { mouseIsOver && (
                <button onClick={(e) => {
                    e.stopPropagation();
                    setColorDropdownVisible((prev) => !prev); // Toggle the dropdown visibility
                    setIsColorPickerClicked((prev) => !prev);
                }}
                className="color-options-button
                    stroke-white
                    absolute
                    right-16
                    bg-columnBackgroundColor
                    p-2
                    rounded
                    opacity-60
                    hover:opacity-100
                    "
                >
                    <ElipseIcon />
                </button>
            )}

            { mouseIsOver && colorDropdownVisible && (
                <div className="absolute top-20 right-9 " style={{ zIndex: 9999 }}>
                    <div
                        className="
                        flex
                        bg-columnBackgroundColor
                        border
                        border-mainAccentColor
                        p-3
                        rounded-full
                        gap-2
                        items-center
                        font-bold
                        "
                        style={{ zIndex: 9999 }}
                    >
                        <p>Task color: </p>
                        {colorOptions.map((colorOption) => (
                        <div
                            key={colorOption.value}
                            className={`w-6 h-6 ${colorOption.label} rounded-full cursor-pointer`}
                            onClick={() => {
                                handleColorSelection(colorOption.value); // Call the handler function
                                setIsColorPickerClicked(false);
                            }}
                        ></div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TaskCard