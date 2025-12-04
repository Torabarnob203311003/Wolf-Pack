import { useState } from "react";
import { Lock, Eye, EyeOff, Mail } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    } else if (formData.email.length > 100) {
      newErrors.email = "Email must be less than 100 characters";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (formData.password.length > 100) {
      newErrors.password = "Password must be less than 100 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await login(formData.email.trim(), formData.password);
      
      if (response) {
        toast.success('Login successful!', {
          style: {
            borderRadius: '30px',
            background: '#10B981',
            color: '#fff',
            fontSize: '18px',
          },
        });

        setTimeout(() => {
          navigate('/');
        }, 700);
      } else {
        toast.error('Login failed. Please check your credentials.', {
          style: {
            borderRadius: '30px',
            background: '#EF4444',
            color: '#fff',
            fontSize: '18px',
          },
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      
      toast.error(errorMessage, {
        style: {
          borderRadius: '30px',
          background: '#EF4444',
          color: '#fff',
          fontSize: '18px',
        },
      });
      
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#121212" }}>
      {/* <Toaster position="top-center" /> */}
      
      <div className="w-full max-w-xl bg-[#272828] p-6 rounded-lg shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <div className="mb-6 flex justify-start">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {/* <img src={logo} alt="Logo" className="h-20 w-20" /> */}
                </div>
              </div>
            </div>
            <h1 className="mb-2 text-3xl font-bold text-start" style={{ color: "#FAFAFA" }}>
              Sign In
            </h1>
            <p style={{ color: "#999999" }} className="text-start">
              Let's sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "#FAFAFA" }}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: "#999999" }} />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  disabled={loading}
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2 rounded-md border outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: errors.email ? "#EB5757" : "#404040",
                    color: "#000000",
                  }}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm" style={{ color: "#EB5757" }} role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: "#FAFAFA" }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: "#999999" }} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  disabled={loading}
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-2 rounded-md border outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: errors.password ? "#EB5757" : "#404040",
                    color: "#000000",
                  }}
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={errors.password ? "password-error" : "password-hint"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors disabled:opacity-50"
                  style={{ color: "#999999" }}
                  onMouseEnter={(e) => !loading && (e.currentTarget.style.color = "#FAFAFA")}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#999999"}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password ? (
                <p id="password-error" className="mt-1 text-sm" style={{ color: "#EB5757" }} role="alert">
                  {errors.password}
                </p>
              ) : (
                <p id="password-hint" className="mt-1 text-xs" style={{ color: "#999999" }}>
                  Must be at least 6 characters
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-4 h-4 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  style={{
                    accentColor: "#FF9933"
                  }}
                />
                <label htmlFor="rememberMe" className="text-sm cursor-pointer select-none" style={{ color: "#FAFAFA" }}>
                  Remember Me
                </label>

                <a
                  href="/forgot-password"
                  className="text-sm font-semibold transition-all hover:underline"
                  style={{ color: "#FF9933" }}
                  tabIndex={loading ? -1 : 0}
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-md font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "#FF9933",
                color: "#FAFAFA"
              }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => !loading && (e.currentTarget.style.opacity = "1")}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm" style={{ color: "#999999" }}>
              Don't have an account?{" "}
              <a
                href="/sign-up"
                className="font-semibold transition-all hover:underline"
                style={{ color: "#FF9933" }}
                tabIndex={loading ? -1 : 0}
              >
                Sign Up
              </a>
            </p>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-xs" style={{ color: "#999999" }}>
            © 2025 <span className="font-semibold">NORTHSTAR</span> COMPETITIONS
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;