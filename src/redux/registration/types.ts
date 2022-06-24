export type FieldData = {
  value?: string;
  message?: string;
};
export interface Registration {
  login: FieldData;
  password: FieldData;
  email: FieldData;
  repassword: FieldData;
  registered?: boolean;
  open: boolean;
}
