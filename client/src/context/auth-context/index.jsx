import { createContext, useState } from "react";
import { registerService } from "@/services";
import { initialSignInFormData, initialSignUpFormData } from "@/config";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [SignUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [SignInFormData, setSignInFormData] = useState(initialSignInFormData);

  async function handleRegisterUser(event) {
    event.preventDefault();
    const data = await registerService(SignUpFormData);

    console.log(data);
  }

  return (
    <AuthContext.Provider
      value={{
        SignUpFormData,
        setSignUpFormData,
        SignInFormData,
        setSignInFormData,
        handleRegisterUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
