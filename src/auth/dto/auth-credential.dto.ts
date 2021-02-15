export class AuthSignUpCredentialDTO {
  username: string;
  password: string;
  fullname: string;
  age: number;
  email: string;
  contactNumber: number;
  address: string;
}

export class AuthSignInCredentialDTO {
  username: string;
  password: string;
}
