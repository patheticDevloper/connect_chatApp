import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import {toast} from "sonner";
import {apiClient} from "@/lib/api-client"
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants.js";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
  const navigate = useNavigate();
  const {setUserInfo} = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateSignup = ()=>{
    if(! email.length){
      toast.error("Email is required!");
      return false;
    }
    if(! password.length){
      toast.error("Password is required!");
      return false;
    }
    if(confirmPassword !== password){
      toast.error("Password and Confirm Password should match");
      return false;
    }
    return true;
  };

  const validateLogin = ()=>{
    if(! email.length){
      toast.error("Email is required!");
      return false;
    }
    if(! password.length){
      toast.error("Password is required!");
      return false;
    } 
    return true;

  }

  const handleLogin = async () => {
    if(validateLogin()){
        try{
        const response = await apiClient.post(LOGIN_ROUTE, 
        {email, password}, 
        {withCredentials:true}
        );
        if(response.data.user.id){
          setUserInfo(response.data.user);
          if(response.data.user.profileSetup) navigate("/chat");
          else navigate("/profile");
        }
        }
        catch (error) {
          console.error('Login failed:', error);
          if (error.response) {
              // The request was made and the server responded with a status code that falls out of the range of 2xx
              console.error('Response data:', error.response.data);
              console.error('Response status:', error.response.status);
              console.error('Response headers:', error.response.headers);
          } else if (error.request) {
              // The request was made but no response was received
              console.error('Request data:', error.request);
          } else {
              // Something happened in setting up the request that triggered an Error
              console.error('Error message:', error.message);
          }
      }
      
    }
  };
  const handleSignup = async () => {
    if(validateSignup()){
      try
      {
        const response = await apiClient.post(SIGNUP_ROUTE, 
        {email, password}, 
        {withCredentials:true}
        );
        // console.log(response);
        if(response.status===201){
          // console.log("khol");
          setUserInfo(response.data.user);
          navigate("/profile");
        }
      } 
      catch(err){
        // console.log("matkhol")
        console.log("signup failed: "+err);
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="fles items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl mb-3">Welcome</h1>
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with CONNECT!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 transition-all duration-300"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input
                  type="email"
                  placeholder="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <Input
                  type="password"
                  placeholder="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
                <Button className="rounded-full p-6" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5" value="signup">
                <Input
                  type="email"
                  placeholder="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <Input
                  type="password"
                  placeholder="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Input>
                <Button className="rounded-full p-6" onClick={handleSignup}>
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
