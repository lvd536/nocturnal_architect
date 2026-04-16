export interface EmailLoginForm {
    email: string;
    password: string;
}

export interface EmailRegisterForm extends EmailLoginForm {
    confirmPassword: string;
}
