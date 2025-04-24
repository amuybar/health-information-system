export interface Client {
    id: string;
    full_name: string;
    age: number;
    gender: string;
    email: string;
    created_at: string;
    enrolled_programs?: Program[];
  }
  
  export interface ClientCreate {
    full_name: string;
    age: number;
    gender: string;
    email: string;
  }
  
  export interface Program {
    id: string;
    name: string;
    description: string;
    created_at: string;
  }
  
  export interface ProgramCreate {
    name: string;
    description: string;
  }
  
  export interface Enrollment {
    id: string;
    client_id: string;
    program_id: string;
    enrolled_at: string;
  }
  
  export interface EnrollmentCreate {
    client_id: string;
    program_id: string;
  }
  