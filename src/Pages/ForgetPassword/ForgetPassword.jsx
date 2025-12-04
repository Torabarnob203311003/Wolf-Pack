import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosSecure from "../../lib/axiosSecure";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({});
    }

    setEmail(value);
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    } else if (email.length > 100) {
      newErrors.email = "Email must be less than 100 characters";
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
      const response = await axiosSecure.post('/users/forget-password', {
        email: email.trim()
      });
      
      if (response.data.success) {
        // Store token for OTP verification page
        const token = response.data.data;
        localStorage.setItem('resetToken', token);
        localStorage.setItem('resetEmail', email.trim());

        toast.success(response.data.message || 'Check your email for OTP!', {
          style: {
            borderRadius: '30px',
            background: '#10B981',
            color: '#fff',
            fontSize: '18px',
          },
        });

        // Navigate to OTP verification page after 1.5 seconds
        setTimeout(() => {
          navigate('/verify-otp'); // Update this route as per your routing
        }, 1500);
      } else {
        toast.error('Failed to send OTP. Please try again.', {
          style: {
            borderRadius: '30px',
            background: '#EF4444',
            color: '#fff',
            fontSize: '18px',
          },
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to send OTP. Please try again.";
      
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
          {/* Back Button */}
          <button
            onClick={() => navigate('/sign-in')}
            className="mb-6 flex items-center gap-2 text-sm transition-colors hover:opacity-80"
            style={{ color: "#FF9933" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </button>

          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold" style={{ color: "#FAFAFA" }}>
              Forgot Password?
            </h1>
            <p style={{ color: "#999999" }} className="text-sm">
              Don't worry! Enter your email and we'll send you an OTP to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "#FAFAFA" }}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: "#999999" }} />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
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
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>

            {/* Sign In Link */}
            <p className="text-center text-sm" style={{ color: "#999999" }}>
              Remember your password?{" "}
              <a
                href="/sign-in"
                className="font-semibold transition-all hover:underline"
                style={{ color: "#FF9933" }}
                tabIndex={loading ? -1 : 0}
              >
                Sign In
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
};

export default ForgetPassword;