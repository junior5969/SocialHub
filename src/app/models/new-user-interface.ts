export interface NewUserInterface {
  name: string;
  email: string;
  gender: 'male' | 'female';
  status: 'active' | 'inactive';
}