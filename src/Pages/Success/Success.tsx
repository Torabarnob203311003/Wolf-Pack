import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/profile');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#161616] rounded-xl border border-gray-800 p-8 text-center">

        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-[#E7B20E] rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold mb-2">Payment Successful</h1>
        <p className="text-gray-400 mb-6">
          Your payment was completed successfully. You can now continue using your account.
        </p>

        {/* Action */}
        <button
          onClick={() => navigate('/profile')}
          className="w-full py-3 bg-[#E7B20E] hover:bg-[#e9b005] text-black rounded-lg font-bold transition"
        >
          Go to Profile
        </button>

        {/* Countdown */}
        {countdown > 0 && (
          <p className="text-gray-500 text-sm mt-4">
            Redirecting automatically in {countdown}s…
          </p>
        )}
      </div>
    </div>
  );
};

export default Success;
