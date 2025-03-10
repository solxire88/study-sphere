"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GraduationCap, Users } from "lucide-react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import Logo from "../assets/logo.png";
// import "../styles/auth.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (isLogin) {
        const response = await axios.post("http://localhost:8000/api/token/", {
          username,
          password,
        });

        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

        const decoded = jwtDecode(response.data.access);
        const userRole = decoded.role;
        console.log(userRole);

        navigate(userRole === "student" ? "/student" : "/educator");
      } else {
        await axios.post("http://localhost:8000/api/user/register/", {
          username,
          password,
          email,
          role,
        });

        setIsLogin(true);
      }
    } catch (error) {
      console.error("Auth error:", error);

      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid credentials");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex w-screen h-screen bg-[#000B18] relative overflow-hidden">
      {/*  gradient circle background (responsive) */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div
          className="
    w-[clamp(32rem,50vmin,48rem)] 
    h-[clamp(32rem,50vmin,48rem)]
    bg-gradient-to-tr 
    from-blue-900 
    to-[#05014a]
    rounded-full 
    animate-spin 
    blur-[30px]
    md:blur-xl
    opacity-50
    transition-all
    duration-300
  "
        />
      </div>

      <div className="w-full flex items-center justify-center z-10 p-4">
        {/*Blurred card  */}
        <div
          className="w-full max-w-md backdrop-blur-sm bg-white/5 border border-white rounded-2xl overflow-hidden relative 
                       shadow-[0_0_25px_rgba(255,255,255,0.3),0_20px_30px_-10px_rgba(0,0,0,0.6),0_-2px_10px_rgba(255,255,255,0.1)_inset]
                       animate-[float_6s_ease-in-out_infinite] hover:shadow-[0_0_20px_rgba(255,255,255,0.4),0_25px_35px_-5px_rgba(0,0,0,0.7),0_-2px_15px_rgba(255,255,255,0.15)_inset]
                       transition-shadow duration-500 max-lg:border-[#004493]"
        >
          <div className="p-6 space-y-4">
            <div className="text-center space-y-2">
              <div>
                <img src={Logo} alt="Company Logo" className="w-64 mx-auto" />
              </div>

              <p className="text-white/80 text-sm">
                {isLogin
                  ? "Sign in to continue"
                  : "Start your learning journey"}
              </p>

              {errorMessage && (
                <div className="text-red-400 text-sm shadow-sm">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* The form itself, with a sliding animation between login and sign-up */}
            <div className="relative overflow-hidden">
              {/* Login form */}
              <div
                className={`transition-transform duration-500 ease-in-out ${
                  isLogin ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <form
                  onSubmit={handleSubmit}
                  className={`w-full space-y-4 ${isLogin ? "block" : "hidden"}`}
                >
                  <div className="space-y-3">
                    {/* Username input */}
                    <div>
                      <Input
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        variant="underlined"
                        className="white-text"
                        classNames={{
                          inputWrapper: [
                            "border-white",
                            "max-lg:border-[#004493]",
                            "group-data-[focus=true]:border-[#004493]",
                            "transition-colors",
                            "duration-3000",
                            username.length > 0 ? "!border-[#004493]" : "",
                          ],
                          label: "text-lg",
                        }}
                      />
                    </div>

                    {/* Password input */}
                    <div>
                      <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="underlined"
                        className="white-text"
                        classNames={{
                          inputWrapper: [
                            "border-white",
                            "max-lg:border-[#004493]",
                            "group-data-[focus=true]:border-[#004493]",
                            "transition-colors",
                            "duration-3000",
                            password.length > 0 ? "!border-[#004493]" : "",
                          ],
                          label: "text-lg",
                        }}
                      />
                    </div>
                  </div>

                  {/* Sign In button */}
                  <Button
                    type="submit"
                    color="primary"
                    variant="bordered"
                    className="w-full py-2 px-4 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg border border-white 
                               shadow-[0_4px_12px_rgba(0,0,0,0.3),0_-1px_0_rgba(255,255,255,0.1)_inset,0_0_0_rgba(255,255,255,0)]
                               hover:shadow-[0_6px_16px_rgba(0,0,0,0.4),0_-1px_0_rgba(255,255,255,0.2)_inset,0_0_10px_rgba(255,255,255,0.5)]
                               active:shadow-[0_2px_8px_rgba(0,0,0,0.3),0_-1px_0_rgba(255,255,255,0.1)_inset]
                               active:translate-y-0.5 transition-all duration-200 
                               max-lg:border-[#004493] 
                               max-lg:hover:shadow-[0_2px_4px_rgba(0,0,0,0.1),0_-1px_0_rgba(255,255,255,0.05)_inset,0_0_2px_rgba(255,255,255,0.2)]
                               max-lg:active:shadow-[0_1px_2px_rgba(0,0,0,0.1),0_-1px_0_rgba(255,255,255,0.05)_inset]"
                  >
                    Sign In
                  </Button>
                </form>
              </div>

              {/* Registration form */}
              <div
                className={`transition-transform duration-500 ease-in-out ${
                  isLogin ? "translate-x-full" : "translate-x-0"
                }`}
              >
                <form
                  onSubmit={handleSubmit}
                  className={`w-full space-y-4 ${isLogin ? "hidden" : "block"}`}
                >
                  <div className="space-y-3">
                    {/* Username input */}
                    <div>
                      <Input
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        variant="underlined"
                        className="white-text"
                        classNames={{
                          inputWrapper: [
                            "border-white",
                            "max-lg:border-[#004493]",
                            "group-data-[focus=true]:border-[#004493]",
                            "transition-colors",
                            "duration-3000",
                            username.length > 0 ? "!border-[#004493]" : "",
                          ],
                          label: "text-lg",
                        }}
                      />
                    </div>

                    {/* Email input */}
                    <div>
                      <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="underlined"
                        className="white-text"
                        classNames={{
                          inputWrapper: [
                            "border-white",
                            "max-lg:border-[#004493]",
                            "group-data-[focus=true]:border-[#004493]",
                            "transition-colors",
                            "duration-3000",
                            email.length > 0 ? "!border-[#004493]" : "",
                          ],
                          label: "text-lg",
                        }}
                      />
                    </div>

                    {/* Password input */}
                    <div>
                      <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="underlined"
                        className="white-text"
                        classNames={{
                          inputWrapper: [
                            "border-white",
                            "max-lg:border-[#004493]",
                            "group-data-[focus=true]:border-[#004493]",
                            "transition-colors",
                            "duration-3000",
                            password.length > 0 ? "!border-[#004493]" : "",
                          ],
                          label: "text-lg",
                        }}
                      />
                    </div>

                    {/* Role selection buttons */}
                    <div className="space-y-3">
                      <label className="block text-xs font-light text-white">
                        Select Role
                      </label>
                      <div className="flex gap-3">
                        {/* Student button */}
                        <Button
                          type="button"
                          onPress={() => setRole("student")}
                          className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl transition-all border ${
                            role === "student"
                              ? "bg-white/20 text-white shadow-[0_4px_12px_rgba(0,0,0,0.3),0_0_8px_rgba(255,255,255,0.4)] max-lg:shadow-[0_1px_3px_rgba(0,0,0,0.1),0_0_2px_rgba(255,255,255,0.2)]"
                              : "bg-white/5 hover:bg-white/10 text-white/80 border-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                          } max-lg:border-[#004493]`}
                        >
                          <GraduationCap className="h-4 w-4" />
                          Student
                        </Button>

                        {/* Educator button */}
                        <Button
                          type="button"
                          onPress={() => setRole("educator")}
                          className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl transition-all border ${
                            role === "educator"
                              ? "bg-white/20 text-white shadow-[0_4px_12px_rgba(0,0,0,0.3),0_0_8px_rgba(255,255,255,0.4)] max-lg:shadow-[0_1px_3px_rgba(0,0,0,0.1),0_0_2px_rgba(255,255,255,0.2)]"
                              : "bg-white/5 hover:bg-white/10 text-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                          } max-lg:border-[#004493]`}
                        >
                          <Users className="h-4 w-4" />
                          Educator
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Create Account button */}
                  <Button
                    type="submit"
                    color="primary"
                    variant="bordered"
                    className="w-full py-2 px-4 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg border border-white 
                               shadow-[0_4px_12px_rgba(0,0,0,0.3),0_-1px_0_rgba(255,255,255,0.1)_inset,0_0_0_rgba(255,255,255,0)]
                               hover:shadow-[0_6px_16px_rgba(0,0,0,0.4),0_-1px_0_rgba(255,255,255,0.2)_inset,0_0_10px_rgba(255,255,255,0.5)]
                               active:shadow-[0_2px_8px_rgba(0,0,0,0.3),0_-1px_0_rgba(255,255,255,0.1)_inset]
                               active:translate-y-0.5 transition-all duration-200 
                               max-lg:border-[#004493] 
                               max-lg:hover:shadow-[0_2px_4px_rgba(0,0,0,0.1),0_-1px_0_rgba(255,255,255,0.05)_inset,0_0_2px_rgba(255,255,255,0.2)]
                               max-lg:active:shadow-[0_1px_2px_rgba(0,0,0,0.1),0_-1px_0_rgba(255,255,255,0.05)_inset]"
                  >
                    Create Account
                  </Button>
                </form>
              </div>
            </div>

            {/* Toggle between login and sign-up */}
            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white/80 hover:text-white text-xs font-medium transition-colors relative
                          after:content-[''] after:absolute after:w-0 after:h-px after:bg-white/60 after:bottom-0 after:left-1/2 
                          after:transition-all hover:after:w-full hover:after:left-0"
              >
                {isLogin
                  ? "Need an account? Sign Up"
                  : "Already have an account? Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
