import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import axiosSecure from "../../lib/axiosSecure";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
//   const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Get email from localStorage
    const savedEmail = localStorage.getItem('resetEmail');
    if (!savedEmail) {
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
    setEmail(savedEmail);

    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, [navigate]);

  useEffect(() => {
    // Countdown timer for resend button
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current input is empty, move to previous input
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
    // Handle arrow keys
    else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus last filled input or last input
    const lastFilledIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpString = otp.join("");
    
    // Validate OTP
    if (otpString.length !== 6) {
      toast.error('Please enter complete 6-digit OTP', {
        style: {
          borderRadius: '30px',
          background: '#EF4444',
          color: '#fff',
          fontSize: '18px',
        },
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axiosSecure.post(`/verify-user/verify`, {
        email: email,
        otp: otpString
      });
      
      if (response.data.success) {
        toast.success(response.data.message || 'OTP verified successfully!', {
          style: {
            borderRadius: '30px',
            background: '#10B981',
            color: '#fff',
            fontSize: '18px',
          },
        });

        // Clear localStorage
        localStorage.removeItem('resetEmail');
        console.log(response);
        
        // Store verification token if provided in response
        if (response.data.data) {
          localStorage.setItem('verificationToken', response.data.data);
        }

        // Navigate to reset password page
        setTimeout(() => {
          navigate('/reset-password');
        }, 1500);
      } else {
        toast.error('Invalid OTP. Please try again.', {
          style: {
            borderRadius: '30px',
            background: '#EF4444',
            color: '#fff',
            fontSize: '18px',
          },
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid OTP. Please try again.";
      
      toast.error(errorMessage, {
        style: {
          borderRadius: '30px',
          background: '#EF4444',
          color: '#fff',
          fontSize: '18px',
        },
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#121212" }}>
      <Toaster position="top-center" />
      
      <div className="w-full max-w-xl bg-[#272828] p-6 rounded-lg shadow-lg">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/forget-password')}
            className="mb-6 flex items-center gap-2 text-sm transition-colors hover:opacity-80"
            style={{ color: "#FF9933" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold" style={{ color: "#FAFAFA" }}>
              Verify OTP
            </h1>
            <p style={{ color: "#999999" }} className="text-sm">
              We've sent a 6-digit verification code to
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Mail className="h-4 w-4" style={{ color: "#FF9933" }} />
              <p style={{ color: "#FAFAFA" }} className="text-sm font-medium">
                {email}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input Fields */}
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: "#FAFAFA" }}>
                Enter OTP Code
              </label>
              <div className="flex gap-2 justify-between">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={loading}
                    className="w-full aspect-square text-center text-2xl font-bold rounded-md border outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "#404040",
                      color: "#000000",
                    }}
                    aria-label={`OTP digit ${index + 1}`}
                  />
                ))}
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
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
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

export default VerifyOTP;