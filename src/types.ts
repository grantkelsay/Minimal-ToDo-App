export type Id = string | number;

export type Column = { 
    id: Id;
    title: string;
    isNew: boolean,
    user: User;
}

export type Task = {
    backgroundColor: string;
    columnId: Id,
    content: string;
    id: Id,
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