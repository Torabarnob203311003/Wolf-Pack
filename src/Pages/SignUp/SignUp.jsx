import { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, Loader2 } from 'lucide-react';
import signUPimg from '../../../public/signup.png'
import axiosSecure from '../../lib/axiosSecure';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
    currency: '',
    phoneNumber: '',
    email: '',
    referralCode: ''
  });
  
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle verification code input
  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus next input
      if (value && index < verificationCode.length - 1) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  // Validate Step 1
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.userName.trim()) newErrors.userName = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);

    axiosSecure.post('/users/create-user', {
        userName: formData.userName,
        password: formData.password
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.error('Registration error:', error.response.data.message); 
    })

    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 2
  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.currency) newErrors.currency = 'Currency is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // API Integration Functions
  const registerUser = async () => {
    setLoading(true);
    try {
      const response = await axiosSecure.post('/users/create-user',{
        ...formData,
        isPolicyAccepted: true
      });
      
      const data = response.data;
    console.log(data);
        
      if (data.success) {
        setStep(3);
        return data;
      } else {
        setErrors({ api: data.message || 'Registration failed' });
        return null;
      }
    } catch (error) {
        console.log(error)
      setErrors({ api: error.response?.data?.errorSources[0].message || 'Network error. Please try again.' });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    setLoading(true);
    const code = verificationCode.join('');
    
    try {
      const response = await axiosSecure.post('/verify-user/verify', {
          email: formData.email,
          otp: code
        });
      
      const data = response.data;
      
      if (data.success) {
        setStep(4);
        toast.success( data.message || 'Verification successful!');
        setTimeout(() => {
            window.location.href = '/sign-in';
        }, 3000);
        return data;
      } else {
        console.log(data)
        setErrors({ verification: data.message || 'Invalid code' });
        return null;
      }
    } catch (error) {
        console.log(error)
      setErrors({ verification: error.response?.data?.errorSources[0].message || 'Verification failed. Please try again.' });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    try {
      const response = await axiosSecure.post('/users/resend-otp', {
          email: formData.email
        });
      
      const data = response.data; 

      console.log(response)

      if (data.success) {
        toast.success('Code resent successfully!');
        setVerificationCode(['', '', '', '', '', '']);
        setErrors(prev => ({ ...prev, verification: '' }));
      }
    } catch (error) {
      console.error('Failed to resend code');
        toast.error(error.response?.data?.errorSources[0].message || 'Failed to resend code. Please try again.');
    }
  };

  // Handle form submissions
  const handleStep1Continue = () => {
    if (validateStep1()) {
        // todo send data to backend for step 1
    
      setStep(2);
    }
  };

  const handleStep2Continue = async () => {
    if (validateStep2()) {
        // todo send data to backend for step 2
      await registerUser();
    }
  };

  const handleVerificationContinue = async () => {
    if (verificationCode.every(digit => digit !== '')) {
      await verifyCode();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Step 1: Basic Registration */}
      {step === 1 && (
        <div className="bg-[#272828] rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex">
          <div className="w-full md:w-1/2 p-8 bg-[]">
            <h2 className="text-3xl font-bold text-white mb-2">Sign Up</h2>
            <p className="text-gray-400 mb-6">Let's create new account</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Enter username"
                  className="w-full px-4 py-3 bg-white border border-gray-600 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                />
                {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName}</p>}
              </div>
              
              <div>
                <label className="block text-sm text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 bg-white text-black border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              
              <div>
                <label className="block text-sm text-gray-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full px-4 py-3 bg-white border border-gray-600 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
              
              <button
                onClick={handleStep1Continue}
                className="w-full bg-gradient-to-r from-[#FF9933] to-[#c27223] text-white font-semibold py-3 rounded-lg hover:from-[#c27223] hover:to-[#FF9933] transition-all"
              >
                Continue
              </button>
              
              <p className="text-center text-gray-400 text-sm">
                Already have an account? <a href="/sign-in" className="text-yellow-500 hover:underline">Sign In</a>
              </p>
            </div>
          </div>
          
          <div className="hidden md:block w-1/2 bg-[#FF9933] lg:flex items-center justify-center">
            <img className='h-full w-full object-cover bg-center' src={signUPimg} alt='Sign UP Image' />
          </div>
        </div>
      )}

      {/* Step 2: Additional Info */}
      {step === 2 && (
        <div className="bg-[#272828] rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
          {/* <button className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button> */}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Currency</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-600 rounded-lg text-black focus:outline-none focus:border-yellow-500"
              >
                <option value="">Select currency</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="BDT">BDT - Bangladeshi Taka</option>
              </select>
              {errors.currency && <p className="text-red-500 text-xs mt-1">{errors.currency}</p>}
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">Phone Number</label>
              <div className="flex">
                <select className="px-3 py-3 bg-white border border-gray-600 rounded-l-lg text-black focus:outline-none">
                  <option value="+880">🇧🇩 +880</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="flex-1 px-4 py-3 bg-white border border-l-0 border-gray-600 rounded-r-lg text-black placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                />
              </div>
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-4 py-3 bg-white border border-gray-600 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-yellow-500"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">Referral Code</label>
              <input
                type="text"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                placeholder="Enter referral code (optional)"
                className="w-full px-4 py-3 bg-white border border-gray-600 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-yellow-500"
              />
            </div>
            
            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-2" required />
              <p className="text-xs text-gray-400">
                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy
              </p>
            </div>
            
            {errors.api && <p className="text-red-500 text-sm">{errors.api}</p>}
            
            <button
              onClick={handleStep2Continue}
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-3 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Register'}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Verification Code */}
      {step === 3 && (
        <div className="bg-[#272828] rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
          {/* <button className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button> */}
          
          <h2 className="text-3xl font-bold text-white mb-2">Verification Code</h2>
          <p className="text-gray-400 mb-8">
            Enter the verification code that we have sent to your Email
          </p>
          
          <div className="flex justify-center gap-3 mb-6">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                className="w-14 h-14 text-center text-2xl font-bold bg-white border border-gray-600 rounded-lg text-black focus:outline-none focus:border-yellow-500"
              />
            ))}
          </div>
          
          <p className="text-center text-gray-400 text-sm mb-2">
            Didn't receive the code?{' '}
            <button onClick={resendCode} className="text-yellow-500 hover:underline">
              Resend code
            </button>
          </p>
          <p className="text-center text-gray-400 text-sm mb-6">
            Resend code at <span className="text-yellow-500">00:59</span>
          </p>
          
          {errors.verification && <p className="text-red-500 text-sm text-center mb-4">{errors.verification}</p>}
          
          <button
            onClick={handleVerificationContinue}
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-semibold py-3 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Continue'}
          </button>
        </div>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div className="bg-[#272828] rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-yellow-500 rounded-full mb-4">
              <CheckCircle2 size={48} className="text-gray-900" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">Successful!</h2>
          <p className="text-gray-400">
            Your registration was completed successfully.
          </p>
            <p className="text-gray-400">Redirecting to home page...</p>

          <div className="mt-8">
            <Loader2 className="animate-spin text-yellow-500 mx-auto" size={32} />
          </div>
        </div>
      )}
      <Toaster/>
    </div>
  );
};

export default SignUp;