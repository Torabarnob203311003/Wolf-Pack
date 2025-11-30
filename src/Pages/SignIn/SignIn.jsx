import { useState } from "react";
import { Lock, Eye, EyeOff, Mail } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const {login} = useAuth();


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Email is required";
    } else if (formData.username.length > 100) {
      newErrors.username = "Email must be less than 100 characters";
    }

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
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) { 
      try {
        setLoading(true);
        const response = await login(formData.username, formData.password)
        
        if (response) {
          setLoading(false);
          toast('Login successful!',
            {
              icon: '✅',
              style: {
                borderRadius: '30px',
                background: '#10B981',
                color: '#fff',
                fontSize: '18px',
              },
            }
          );


          setTimeout(() => {
            // window.location.href = '/';
            navigate('/')
          }, 700);
        }else{
          setLoading(false);
          toast('Login failed. Please try again.',
            {
              icon: '❌',
              style: {
                borderRadius: '30px',
                background: '#EF4444',
                color: '#fff',
                fontSize: '18px',
              },
            }
          );
        }

      } catch (error) {
        setLoading(false);        
        toast(`${error.response?.data?.message || "Login failed. Please try again."}`,
          {
            icon: '❌',
            style: {
              borderRadius: '30px',
              background: '#EF4444',
              color: '#fff',
              fontSize: '18px',
            },
          }
        );
        setErrors({ submit: error.response?.data?.message || "Login failed" });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#121212" }}>
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
            <h1 className="mb-2 text-3xl font-bold text-start" style={{ color: "#FAFAFA" }}>Sign In</h1>
            <p style={{ color: "#999999" }} className="text-start">Let's sign in your account first</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#FAFAFA" }}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: "#999999" }} />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="w-full pl-10 pr-4 py-2 rounded-md border outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "#404040",
                    color: "#000000",
                    "--tw-ring-color": "#FF9933"
                  }}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm" style={{ color: "#EB5757" }}>{errors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#FAFAFA" }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: "#999999" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2 rounded-md border outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "#404040",
                    color: "#000000",
                    "--tw-ring-color": "#FF9933"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#999999" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#FAFAFA"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#999999"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm" style={{ color: "#EB5757" }}>{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded cursor-pointer"
                  style={{
                    accentColor: "#FF9933"
                  }}
                />
                <label htmlFor="rememberMe" className="text-sm cursor-pointer" style={{ color: "#FAFAFA" }}>
                  Remember Me
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md font-semibold transition-all"
              style={{
                backgroundColor: "#FF9933",
                color: "#FAFAFA"
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-center text-sm" style={{ color: "#999999" }}>
              Don't have an account?{" "}
              <a
                href="/sign-up"
                className="font-semibold transition-all hover:underline"
                style={{ color: "#FF9933" }}
              >
                Sign Up
              </a>
            </p>
          </form>

          <div className="mt-8 text-center text-xs" style={{ color: "#999999" }}>
            © 2025 <span className="font-semibold">NORTHSTAR</span> COMPETITIONS ©
            {/* <a
              href="/terms"
              className="hover:underline"
              style={{ color: "#FF9933" }}
            >
              Term & Condition
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;