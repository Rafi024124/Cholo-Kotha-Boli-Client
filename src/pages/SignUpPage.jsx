import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, User, Mail, Eye, EyeOff, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";


const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fromData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();
  const validateForm = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div className="relative">
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="peer w-full h-10 px-10 text-sm placeholder-transparent border-b border-slate-300 text-slate-700 transition-all outline-none focus:border-emerald-500"
                value={fromData.fullName}
                onChange={(e) =>
                  setFormData({ ...fromData, fullName: e.target.value })
                }
              />
              <label
                htmlFor="fullName"
                className="absolute left-10 -top-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500"
              >
                Full Name
              </label>
              <User className="absolute left-2 top-2.5 size-5 text-slate-400" />
            </div>

            {/* Email Field */}
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                className="peer w-full h-10 px-10 text-sm placeholder-transparent border-b border-slate-300 text-slate-700 transition-all outline-none focus:border-emerald-500"
                value={fromData.email}
                onChange={(e) =>
                  setFormData({ ...fromData, email: e.target.value })
                }
              />
              <label
                htmlFor="email"
                className="absolute left-10 -top-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500"
              >
                Email
              </label>
              <Mail className="absolute left-2 top-2.5 size-5 text-slate-400" />
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="peer w-full h-10 px-10 text-sm placeholder-transparent border-b border-slate-300 text-slate-700 transition-all outline-none focus:border-emerald-500"
                value={fromData.password}
                onChange={(e) =>
                  setFormData({ ...fromData, password: e.target.value })
                }
              />
              <label
                htmlFor="password"
                className="absolute left-10 -top-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500"
              >
                Password
              </label>
              {/* Password Toggle Icon */}
              <div
                className="absolute right-2 top-2.5 cursor-pointer text-slate-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="btn btn-primary w-full mt-4"
            >
              {isSigningUp ? <> 
              <Loader className="size-5 animate-spin"></Loader>
              </> : "Sign Up"}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to={"/login"} className="link link-primary">
            Sign in
            </Link>
            </p>

          </div>
        </div>
      </div>

   <AuthImagePattern
   title="Join our Community"
   subtitle= "Connect with friends, share moments, and stay in touch with you"
   >



   </AuthImagePattern>



    </div>
  );
};

export default SignUpPage;
