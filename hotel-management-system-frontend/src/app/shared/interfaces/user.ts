export interface User {
  userId: number;
  email: string;
  password: string;
  role: Role;
}

export enum Role {
  CUSTOMER = 'CUSTOMER',
  SYSTEM_ADMIN = 'SYSTEM_ADMIN'
}
