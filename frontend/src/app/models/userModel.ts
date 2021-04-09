export class User{
  id?:number | null | undefined;
  email: string | null | undefined;
  profile_image: string | null | undefined;
  first_name: string | null | undefined;
  last_name: string | null | undefined;
  phone?: string | null | undefined;
  birth_date: Date | null | undefined;
}

export interface SignUpRequest{
  email: string | null | undefined;
  password: string | null | undefined;
  password_confirmation: string | null | undefined;
  profile_image: string | null | undefined;
  first_name: string | null | undefined;
  last_name: string | null | undefined;
  phone?: string | null | undefined;
  birth_date: Date | null | undefined;
}

export interface SignInRequest{
  email: string | null | undefined;
  password: string | null | undefined;
}
