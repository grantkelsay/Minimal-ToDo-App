export type Id = string | number;

export type Column = { 
    id: Id;
    title: string;
    isNew: boolean,
}

export type Task = {
    id: Id,
    columnId: Id,
    content: string;
    backgroundColor: string;
    isNew: boolean;
}

export type Board = {
    id: Id;
    name: string;
    columns: Column[];
    tasks: Task[];
}