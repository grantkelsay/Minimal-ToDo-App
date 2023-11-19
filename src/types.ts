export type Id = string | number;

export type Column = { 
    id: Id;
    title: string;
    isNew: boolean,
    user: User;
}

export type Task = {
    id: Id,
    columnId: Id,
    content: string;
    backgroundColor: string;
    isNew: boolean;
    user: User;
}

export type Board = {
    id: Id;
    name: string;
    columns: Column[];
    tasks: Task[];
}

export type User = {
    userName: string;
    userPass: string;
}