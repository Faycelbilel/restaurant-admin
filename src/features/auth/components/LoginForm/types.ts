import { LoginRequest } from "../../types/LoginRequest";

export interface LoginFormProps {
  readonly onSubmit: (data: LoginRequest) => Promise<void>;
  readonly isLoading?: boolean;
  readonly error?: string;
}