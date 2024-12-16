export interface IUser {
    id: number;
    name: string;
    email: string;
  }
  
  export interface IPost {
    id: number;
    title: string;
    content: string;
    userId: number;
  }
  