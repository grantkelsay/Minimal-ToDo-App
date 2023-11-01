import PlusIcon from "../icons/PlusIcon"
import { useMemo, useState } from "react";
import { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

function KanbanBoard() {

    // Holds the state of the columns object array
    const [columns, setColumns] = useState<Column[]>([]);

    // Stores resulting map of column IDs
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    // Stores the state of a column that is flagged as active
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const sensors = useSensors (
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3, // Activation constraint for the point sensor (3px)
            },
        })
    );

    //console.log(columns);
    return (
        <div className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
        ">
            <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <div className= "m-auto flex gap-2">
                    <div className = "flex gap-4">
                        <SortableContext items={columnsId}>
                            {columns.map(col => (
                                <ColumnContainer key={col.id} 
                                column={col} 
                                deleteColumn={deleteColumn}
                                updateColumn={updateColumn}
                                />
                            ))}
                        </SortableContext>
                    </div>
                    <button 
                        onClick={() => {
                            createNewColumn();
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
                        ring-rose-500
                        hover:ring-2
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
                        />)}
                </DragOverlay>, document.body)}

            </DndContext>
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
        };

        // Update the 'columns' state by adding the new column
        setColumns([...columns, columnToAdd]);
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
    }

    function updateColumn(id: Id, title: string) {
        const newColumns = columns.map(col => {
            if (col.id !== id) return col;
            return {...col, title};
        });

        setColumns(newColumns);
    }

    // Recieves the DragStartEvent event
    // If a column is being dragged, set the column selected to active
    function onDragStart(event: DragStartEvent) {
        console.log("Drag Start");
        // Checks if the type of the currently dragged data is "Column".
        if (event.active.data.current?.type === "Column") {
            // Calls the setActiveColumn function with the column data from the dragged item.
            setActiveColumn(event.active.data.current.column);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {
        console.log("Drag End");

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
}

export default KanbanBoard