import { User, Mail, Phone, Award, Coins, CreditCard, Calendar, Shield, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
   const { user, isAuthenticated } = useAuth();


  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  console.log(user);
  

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-[#161616] rounded-xl border border-gray-800 p-8 mb-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-black text-4xl font-bold bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-700 shadow-lg">
              {user?.userName?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">{user?.userName}</h2>
              <div className="flex items-center space-x-2">
                {user?.isVerified && (
                  <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30 flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#161616] rounded-xl border-2 border-yellow-500/30 p-6 hover:border-yellow-500/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <Award className="w-8 h-8 text-yellow-400" />
              <span className="text-gray-400 text-sm font-medium">Rewards</span>
            </div>
            <p className="text-4xl font-bold text-white mb-1">{user?.rewardPoint || 0}</p>
            <p className="text-gray-400 text-sm">Points</p>
          </div>

          <div className="bg-[#161616] rounded-xl border-2 border-green-500/30 p-6 hover:border-green-500/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <Coins className="w-8 h-8 text-green-400" />
              <span className="text-gray-400 text-sm font-medium">Credits</span>
            </div>
            <p className="text-4xl font-bold text-white mb-1">{user?.credit || 0}</p>
            <p className="text-gray-400 text-sm">{user?.currency || 'GBP'}</p>
          </div>

          <div className="bg-[#161616] rounded-xl border-2 border-blue-500/30 p-6 hover:border-blue-500/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <CreditCard className="w-8 h-8 text-blue-400" />
              <span className="text-gray-400 text-sm font-medium">Raffles</span>
            </div>
            <p className="text-4xl font-bold text-white mb-1">{user?.raffles?.length || 0}</p>
            <p className="text-gray-400 text-sm">Entries</p>
          </div>
        </div>

        {/* Information Card */}
        <div className="bg-[#161616] rounded-xl border border-gray-800 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Account Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-700 hover:border-gray-600 transition-all">
              <Mail className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-1">Email Address</p>
                <p className="text-white font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-700 hover:border-gray-600 transition-all">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-1">Phone Number</p>
                <p className="text-white font-medium">{user?.phoneNumber}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-700 hover:border-gray-600 transition-all">
              <User className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-1">User ID</p>
                <p className="text-white font-medium text-sm break-all font-mono">{user?._id}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-700 hover:border-gray-600 transition-all">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-1">Member Since</p>
                <p className="text-white font-medium">{formatDate(user?.createdAt)}</p>
              </div>
            </div>


            <div className="flex items-start space-x-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-700 hover:border-gray-600 transition-all">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-2">Account Status</p>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 ${
                    user?.isVerified 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {user?.isVerified ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span>{user?.isVerified ? 'Verified' : 'Not Verified'}</span>
                  </span>
                  
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 ${
                    user?.isPolicyAccepted 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {user?.isPolicyAccepted ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span>{user?.isPolicyAccepted ? 'Policy Accepted' : 'Policy Pending'}</span>
                  </span>
                  
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 ${
                    user?.isBlocked 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                      : 'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}>
                    {user?.isBlocked ? <XCircle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                    <span>{user?.isBlocked ? 'Blocked' : 'Active'}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;