import PlusIcon from "../icons/PlusIcon"
import { useMemo, useState, useEffect, useRef } from "react";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import { useLocation } from 'react-router-dom';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import ArrowIcon from "../icons/ArrowIcon";

function KanbanBoard() {

    const location = useLocation();
    const { user } = location.state;

    console.log("Active user: " + user.userName);
    console.log("Active user password: " + user.userPass);

    // Holds the state of the columns object array
    const [columns, setColumns] = useState<Column[]>([]);

    const [tasks, setTasks] = useState<Task[]>([]);

    // Stores resulting map of column IDs
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
    
    const [menuVisible, setMenuVisible] = useState(true);

    // Stores the state of a column that is flagged as active
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const sensors = useSensors (
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3, // Activation constraint for the point sensor (3px)
            },
        })
    );
    
    // Create a variable that doesn't trigger during re-renders
    const isInitialized = useRef(false);

    // If all of the columns have been deleted by the user, set initialized back to false
    if (columns.length === 0) {
        isInitialized.current = false;
    }

    // Load column and task data from local storage
    useEffect (() => {
        // If the page hasn't already been initialized
        if (!isInitialized.current) {
            
            const savedColumns = loadDataFromLocalStorage("columns");
            if (savedColumns) {
                setColumns(savedColumns);
            }

            console.log(savedColumns);
            // Load tasks from local storage
            const savedTasks = loadDataFromLocalStorage("tasks");
            if (savedTasks) {
                setTasks(savedTasks);
            }

            console.log(tasks);
            // Set our initialized variable to true
            isInitialized.current = true;
        }
    }, []);

    // Listen for changes to columns and save it to local storage
    useEffect(() => {
        saveDataToLocalStorage("columns", columns);
    }, [columns]);

    // Listen for changes to tasks and save it to local storage
    useEffect(() => {
        saveDataToLocalStorage("tasks", tasks);
    }, [tasks]);

    if ((menuVisible || columns.length === 0) && !isInitialized.current) {
        return (
            <div className="
            m-auto
            flex
            flex-col
            py-60
            w-full
            min-h-screen
            items-center
            text-center
            overflow-x-auto
            overflow-y-hidden
            px-[40px]
            bg-pageBackgroundColor
            ">
                <div className="
                flex
                items-center
                text-white
                px-20
                py-5
                flex
                flex-col
                gap-4
                opacity-100
                animate-custom-fade-in"
                >
                    <p>Begin by clicking 'Add Column'</p>
                    <p>shift + enter to stop editing tasks</p>
                    <p>Drag and drop tasks and columns</p>
                    <ArrowIcon />
                </div>
                <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
                    <div className= "m-auto flex gap-4 p-5 animate-button-fade-in">
                        <div className = "flex gap-4">
                            <SortableContext items={columnsId}>
                                {columns.map(col => (
                                    <ColumnContainer key={col.id} 
                                    column={col} 
                                    deleteColumn={deleteColumn}
                                    updateColumn={updateColumn}
                                    createTask={createTask}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                    tasks={tasks.filter(task => task.columnId === col.id)}
                                    />
                                ))}
                            </SortableContext>
                        </div>
                        <button 
                            onClick={() => {
                                createNewColumn();
                                hideMenu();
                            }}
                            className="
                            h-[60px]
                            w-[350px]
                            min-w-[350px]
                            cursor-pointer
                            rounded-lg
                            border-2
                            border-columnBackgroundColor
                            bg-mainBackgroundColor
                            p-4
                            hover:border-mainAccentColor
                            hover:text-mainAccentColor
                            flex
                            gap-2
                            "
                        ><PlusIcon />Add Column</button>
                    </div>
    
                    {createPortal (<DragOverlay>  
                        {activeColumn && (<ColumnContainer 
                                column={activeColumn} 
                                deleteColumn={deleteColumn} 
                                updateColumn={updateColumn}
                                createTask={createTask}
                                tasks={tasks.filter(task => task.columnId === activeColumn.id)}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                            />
                            )}
                            {activeTask && (<TaskCard task={activeTask} 
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                            />
                            )}
                    </DragOverlay>, document.body)}
    
                </DndContext>
            </div>
        );
    }

    return (
        <div className="
        m-auto
        flex
        flex-col
        min-h-screen
        w-full
        items-center
        text-center
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
        bg-pageBackgroundColor
        ">
            <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
                <div className= "m-auto flex gap-4">
                    <div className = "flex gap-4">
                        <SortableContext items={columnsId}>
                            {columns.map(col => (
                                <ColumnContainer key={col.id} 
                                column={col} 
                                deleteColumn={deleteColumn}
                                updateColumn={updateColumn}
                                createTask={createTask}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                                tasks={tasks.filter(task => task.columnId === col.id)}
                                />
                            ))}
                        </SortableContext>
                    </div>
                    <button 
                        onClick={() => {
                            createNewColumn();
                            hideMenu();
                        }}
                        className="
                        h-[60px]
                        w-[350px]
                        min-w-[350px]
                        cursor-pointer
                        rounded-lg
                        bg-mainBackgroundColor
                        border-2
                        border-columnBackgroundColor
                        p-4
                        ring-mainAccentColor
                        hover:border-mainAccentColor
                        hover:text-mainAccentColor
                        flex
                        gap-2
                        "
                    ><PlusIcon />Add Column</button>
                </div>

                {createPortal (<DragOverlay>  
                    {activeColumn && (<ColumnContainer 
                            column={activeColumn} 
                            deleteColumn={deleteColumn} 
                            updateColumn={updateColumn}
                            createTask={createTask}
                            tasks={tasks.filter(task => task.columnId === activeColumn.id)}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                        />
                        )}
                        {activeTask && (<TaskCard task={activeTask} 
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                        />
                        )}
                </DragOverlay>, document.body)}

            </DndContext>
            <div className="flex items-center text-center p-10 opacity-60">
                <p>Created By Grant Kelsay <br />github.com/grantkelsay | linkedin.com/in/grant-kelsay</p>
            </div>
        </div>
    );

    // No parameters
    // Responsible for creating a new array that includes all existing columns
    //  and adding a new one
    function createNewColumn() {
        // Generate a new column object with a unique ID and title
        const columnToAdd:Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`,
            isNew: true,
        };

        // Send the new column information to the API endpoint
        fetch("http://localhost:9090/addColumn", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(columnToAdd)
        }).then(() => {console.log("Added new column to database: " + JSON.stringify(columnToAdd))})

        // Update the 'columns' state by adding the new column
        //console.log(columnToAdd);
        setColumns([...columns, columnToAdd]);
    }

    function createTask(columnId: Id, backgroundColor: string, isNew: boolean) {
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: "Edit Task",
            backgroundColor,
            isNew,
        }
        //console.log(isNew);

        setTasks([...tasks, newTask]);
    }

    function deleteTask(id: Id) {
        const newTasks = tasks.filter((task) => task.id !== id);

        setTasks(newTasks);
    }

    function updateTask(id: Id, content: string, backgroundColor: string) {
        const newTasks = tasks.map(task => {
            if (task.id !== id) return task;
            return {...task, content, backgroundColor};
            
        });
        //console.log("task.backgroundColor: " + backgroundColor);
        setTasks(newTasks);
    }

    // No parameters
    // Responsible for generating a random number ID 
    function generateId() {
        // Generate a random number between 0 and 10000
        return Math.floor(Math.random() * 10001);
    }

    // Recieves the id of column to be deleted
    // filters out the id from the current list of columns
    function deleteColumn(id: Id) {
        // Filters the 'columns' array to remove the column with the specified 'id'.
        const filteredColumns = columns.filter((col) => col.id !== id);
        // Sets the 'columns' state to the filtered array, removing the specified column.
        setColumns(filteredColumns);

        const newTasks = tasks.filter(t => t.columnId !== id);
        setTasks(newTasks);
    }

    function updateColumn(id: Id, title: string, isNew: boolean) {
        const newColumns = columns.map(col => {
            if (col.id !== id) return col;
            return {...col, title, isNew};
        });

        // Update column information to the API endpoint 'updateColumns'
        fetch("http://localhost:9090/updateColumns", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(newColumns)
        }).then(() => {console.log("Added new column to database: " + JSON.stringify(newColumns))})

        setColumns(newColumns);
    }

    // Recieves the DragStartEvent event
    // If a column is being dragged, set the column selected to active
    function onDragStart(event: DragStartEvent) {
        //console.log("Drag Start");
        // Checks if the type of the currently dragged data is "Column".
        if (event.active.data.current?.type === "Column") {
            // Calls the setActiveColumn function with the column data from the dragged item.
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === "Task") {
            // Calls the setActiveColumn function with the column data from the dragged item.
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {
        //console.log("Drag End");
        setActiveColumn(null);
        setActiveTask(null);

        // Stores the 'active' and 'over' properties from the event object
        const { active, over } = event;

        // If no target exists, break from the function
        if (!over) return;

        // Extract column ID from active variable
        const activeColumnId = active.id;

        // Extract column ID from over varaible
        const overColumnId = over.id;

        // If active and over column are the same, break from the function
        if (activeColumnId === overColumnId) return;

        // Updates the 'columns' state by moving the 'active' column to the position of the 'over' column
        setColumns((columns) => {

            // Finds the index of the 'active' column in the array
            const activeColumnIndex = columns.findIndex(
                (col) => col.id === activeColumnId)

            // Finds the index of the 'over' column in the array
            const overColumnIndex = columns.findIndex(
                (col) => col.id === overColumnId);

            // Moves the 'active' column to the position of the 'over' column
            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        });
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;

        // If no target exists, break from the function
        if (!over) return;

        // Extract column ID from active variable
        const activeId = active.id;

        // Extract column ID from over varaible
        const overId = over.id;

        // If active and over column are the same, break from the function
        if (activeId === overId) return;

        const isActiveTask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";

        if (!isActiveTask) return;

        if (isActiveTask && isOverATask) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(t => t.id === activeId);
                const overIndex = tasks.findIndex(t => t.id === overId);

                tasks[activeIndex].columnId = tasks[overIndex].columnId;

                return arrayMove(tasks, activeIndex, overIndex);
            })
        }

        const isOverColumn = over.data.current?.type === "Column";
        
        if (isActiveTask && isOverColumn) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(t => t.id === activeId);

                tasks[activeIndex].columnId = overId;

                return arrayMove(tasks, activeIndex, activeIndex);
            })
        }

    }

    function hideMenu() {
        setMenuVisible(false);
    }

    function saveDataToLocalStorage(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    function loadDataFromLocalStorage(key: string) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

}

export default KanbanBoard


