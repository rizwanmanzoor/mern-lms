import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth-context";
import { GraduationCap } from "lucide-react";

import CommonForm from "@/components/common-form";
import { signinFormControls, signupFormControls } from "@/config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");

  const {
    SignUpFormData,
    setSignUpFormData,
    SignInFormData,
    setSignInFormData,
    handleRegisterUser,
  } = useContext(AuthContext);

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  function checkIfSignInFormValid() {
    return (
      SignInFormData &&
      SignInFormData.userEmail !== "" &&
      SignInFormData.password !== ""
    );
  }

  function checkIfSignUpFormValid() {
    return (
      SignUpFormData &&
      SignUpFormData.userName !== "" &&
      SignUpFormData.userEmail !== "" &&
      SignUpFormData.password !== ""
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b shadow">
        <Link to={"/"} className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold text-xl">MERN-LMS</span>
        </Link>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] bg-background">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signinFormControls}
                  buttonText={"Sign In"}
                  formData={SignInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisabled={!checkIfSignInFormValid()}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                  Enter your details to get started
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signupFormControls}
                  buttonText={"Sign Up"}
                  formData={SignUpFormData}
                  setFormData={setSignUpFormData}
                  isButtonDisabled={!checkIfSignUpFormValid()}
                  handleSubmit={handleRegisterUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;
