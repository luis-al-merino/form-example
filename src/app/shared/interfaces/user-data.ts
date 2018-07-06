export interface UserData {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
  name?: string;
  dateOfBirth?: DateOfBirth;
  additionalInfo?: string;
  confirmed?: boolean;
}

interface DateOfBirth {
  date: string;
  day: number;
  month: number;
  year: number;
}
