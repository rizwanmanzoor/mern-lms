export const signupFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter user name",
    type: "text",
    componentType: "input"
  },
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter email address",
    type: "email",
    componentType: "input"
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    componentType: "input"
  },
]

export const signinFormControls = [
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter email address",
    type: "email",
    componentType: "input"
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    componentType: "input"
  },
]

export const initialSignUpFormData = {
  userName: "",
  userEmail: "",
  password: ""
}

export const initialSignInFormData = {
  userEmail: "",
  password: ""
}
