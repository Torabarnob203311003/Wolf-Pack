import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosSecure from "../../lib/axiosSecure";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  useEffect(() => {
    // Get token from localStorage
    const resetToken = localStorage.getItem('resetToken');
    if (!resetToken) {
      toast.error('Session expired. Please try again.', {
        style: {
          borderRadius: '30px',
          background: '#EF4444',
          color: '#fff',
          fontSize: '18px',
        },
      });
      navigate('/forget-password');
      return;
    }
    setToken(resetToken);
  }, [navigate]);

  useEffect(() => {
    // Check password strength
    const password = formData.newPassword;
    setPasswordStrength({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  }, [formData.newPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
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
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};

    // New Password validation
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (formData.newPassword.length > 100) {
      newErrors.newPassword = "Password must be less than 100 characters";
    } else if (!/[A-Z]/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain at least one lowercase letter";
    } else if (!/\d/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain at least one number";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      
      const response = await axiosSecure.post(
        `/users/reset-password`,
        {
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.success) {
        toast.success(response.data.message || 'Password reset successfully!', {
          style: {
            borderRadius: '30px',
            background: '#10B981',
            color: '#fff',
            fontSize: '18px',
          },
        });

        // Clear all localStorage items related to password reset
        localStorage.removeItem('resetToken');
        localStorage.removeItem('resetEmail');
        localStorage.removeItem('verificationToken');

        // Navigate to sign-in page after 1.5 seconds
        setTimeout(() => {
          navigate('/sign-in');
        }, 1500);
      } else {
        toast.error('Failed to reset password. Please try again.', {
          style: {
            borderRadius: '30px',
            background: '#EF4444',
            color: '#fff',
            fontSize: '18px',
          },
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to reset password. Please try again.";
      
      toast.error(errorMessage, {
        style: {
          borderRadius: '30px',
          background: '#EF4444',
          color: '#fff',
          fontSize: '18px',
        },
      });
      
      setErrors({ submit: errorMessage });

      // If token is invalid or expired, redirect to forget password
      if (error.response?.status === 401 || error.response?.status === 403) {
        setTimeout(() => {
          localStorage.removeItem('resetToken');
          localStorage.removeItem('resetEmail');
          navigate('/forget-password');
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = (isValid) => {
    return isValid ? "#10B981" : "#999999";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#121212" }}>
      <Toaster position="top-center" />
      
      <div className="w-full max-w-xl bg-[#272828] p-6 rounded-lg shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold" style={{ color: "#FAFAFA" }}>
              Reset Password
            </h1>
            <p style={{ color: "#999999" }} className="text-sm">
              Create a strong password to secure your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* New Password Field */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium mb-2" style={{ color: "#FAFAFA" }}>
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: "#999999" }} />
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter your new password"
                  disabled={loading}
                  autoComplete="new-password"
                  className="w-full pl-10 pr-10 py-2 rounded-md border outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: errors.newPassword ? "#EB5757" : "#404040",
                    color: "#000000",
                  }}
                  aria-invalid={errors.newPassword ? "true" : "false"}
                  aria-describedby={errors.newPassword ? "newPassword-error" : "password-requirements"}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors disabled:opacity-50"
                  style={{ color: "#999999" }}
                  onMouseEnter={(e) => !loading && (e.currentTarget.style.color = "#FAFAFA")}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#999999"}
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                >
                  {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.newPassword && (
                <p id="newPassword-error" className="mt-1 text-sm" style={{ color: "#EB5757" }} role="alert">
                  {errors.newPassword}
                </p>
              )}

              {/* Password Strength Indicators */}
              {formData.newPassword && !errors.newPassword && (
                <div id="password-requirements" className="mt-3 space-y-1">
                  <p className="text-xs font-medium mb-2" style={{ color: "#FAFAFA" }}>
                    Password Requirements:
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3" style={{ color: getStrengthColor(passwordStrength.hasMinLength) }} />
                    <span className="text-xs" style={{ color: getStrengthColor(passwordStrength.hasMinLength) }}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3" style={{ color: getStrengthColor(passwordStrength.hasUpperCase) }} />
                    <span className="text-xs" style={{ color: getStrengthColor(passwordStrength.hasUpperCase) }}>
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3" style={{ color: getStrengthColor(passwordStrength.hasLowerCase) }} />
                    <span className="text-xs" style={{ color: getStrengthColor(passwordStrength.hasLowerCase) }}>
                      One lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3" style={{ color: getStrengthColor(passwordStrength.hasNumber) }} />
                    <span className="text-xs" style={{ color: getStrengthColor(passwordStrength.hasNumber) }}>
                      One number
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3" style={{ color: getStrengthColor(passwordStrength.hasSpecialChar) }} />
                    <span className="text-xs" style={{ color: getStrengthColor(passwordStrength.hasSpecialChar) }}>
                      One special character (optional but recommended)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2" style={{ color: "#FAFAFA" }}>
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: "#999999" }} />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                  disabled={loading}
                  autoComplete="new-password"
                  className="w-full pl-10 pr-10 py-2 rounded-md border outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: errors.confirmPassword ? "#EB5757" : "#404040",
                    color: "#000000",
                  }}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                  aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors disabled:opacity-50"
                  style={{ color: "#999999" }}
                  onMouseEnter={(e) => !loading && (e.currentTarget.style.color = "#FAFAFA")}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#999999"}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p id="confirmPassword-error" className="mt-1 text-sm" style={{ color: "#EB5757" }} role="alert">
                  {errors.confirmPassword}
                </p>
              )}
              {formData.confirmPassword && formData.newPassword === formData.confirmPassword && !errors.confirmPassword && (
                <p className="mt-1 text-sm flex items-center gap-1" style={{ color: "#10B981" }}>
                  <CheckCircle2 className="h-4 w-4" />
                  Passwords match
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
              {loading ? 'Resetting Password...' : 'Reset Password'}
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

export default ResetPassword;