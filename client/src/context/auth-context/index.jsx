import { createContext, useEffect, useState } from "react";
import { checkAuthService, loginService, registerService } from "@/services";
import { initialSignInFormData, initialSignUpFormData } from "@/config";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [SignUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [SignInFormData, setSignInFormData] = useState(initialSignInFormData);

  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });

  async function handleRegisterUser(event) {
    event.preventDefault();
    const data = await registerService(SignUpFormData);
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    const data = await loginService(SignInFormData);

    if (data?.success) {
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.accessToken)
      );

      setAuth({
        authenticate: true,
        user: data.data.user,
      });
    } else {
      setAuth({
        authenticate: false,
        user: null,
      });
    }
  }

  // check auth user

  async function checkAuthUser() {
    const data = await checkAuthService();

    if (data?.sucess) {
      setAuth({
        authenticate: true,
        user: data.data.user,
      });
    } else {
      setAuth({
        authenticate: false,
        user: null,
      });
    }
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  console.log(auth);
  

  return (
    <AuthContext.Provider
      value={{
        SignUpFormData,
        setSignUpFormData,
        SignInFormData,
        setSignInFormData,
        handleRegisterUser,
        handleLoginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
