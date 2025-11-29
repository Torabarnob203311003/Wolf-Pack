import React from 'react';
import { Trophy, Shield, Heart, Award, Sparkles, Target, Users, CheckCircle } from 'lucide-react';

const AboutUs = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Transparency & Fairness",
      description: "All draws are conducted using verified random methods. Winners are contacted directly and announced publicly."
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Skill-Based Competitions",
      description: "Every competition includes a genuine skill-based question to ensure compliance with UK prize competition regulations."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Authentic Memorabilia",
      description: "Access unique, authentic sports memorabilia and signed items from the world of sport."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Supporting Future Talent",
      description: "A portion of all revenue goes directly toward helping upcoming athletes access training, events, and equipment."
    }
  ];

  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Our Mission",
      description: "Give people the chance to win incredible prizes while supporting the development of rising athletes across the UK."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Our Community",
      description: "Whether you're entering to win, collecting memorabilia, or supporting future professionals, you're part of our community."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Our Promise",
      description: "Delivering a safe, transparent, and enjoyable experience for every customer, every time."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#161616] to-[#0f0f0f] border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 via-yellow-400/5 to-yellow-700/10"></div>
        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-700 bg-clip-text text-transparent">
              About Northstar Competitions Ltd
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              A UK-based company dedicated to delivering exciting, skill-based competitions and offering high-quality sports memorabilia.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-[#161616] rounded-xl border border-gray-800 p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              We believe in <span className="text-yellow-400 font-semibold">transparency</span>, <span className="text-yellow-400 font-semibold">fairness</span>, and making competitions <span className="text-yellow-400 font-semibold">fun and accessible</span>. Our mission is simple: give people the chance to win incredible prizes while supporting the development of rising athletes across the UK.
            </p>
            <p className="text-gray-400">
              Supporting talent is at the heart of what we do.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold mb-10 text-center">What Makes Us Different</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-[#161616] rounded-xl border border-gray-800 p-6 hover:border-yellow-500/50 transition-all group"
            >
              <div className="flex items-start space-x-4">
                <div className="text-yellow-400 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-[#161616] rounded-xl border border-gray-800 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-center">How We Operate</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-yellow-500/50">
                <CheckCircle className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Skill-Based Questions</h3>
              <p className="text-gray-400 text-sm">
                Every competition includes a genuine skill-based question to ensure full compliance with UK regulations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-yellow-500/50">
                <Shield className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fair & Verified Draws</h3>
              <p className="text-gray-400 text-sm">
                All draws are conducted fairly using verified random methods. Winners are contacted directly and announced publicly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-yellow-500/50">
                <Heart className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Supporting Athletes</h3>
              <p className="text-gray-400 text-sm">
                A portion of all revenue helps upcoming athletes access training, events, equipment, and opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Core Values</h2>
        <div className="space-y-6">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-[#161616] rounded-xl border border-gray-800 p-6 hover:border-yellow-500/30 transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500/20 p-3 rounded-lg border border-yellow-500/30">
                  <div className="text-yellow-400">
                    {value.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sports Memorabilia Section */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-yellow-600/10 via-yellow-400/5 to-yellow-700/10 rounded-xl border border-yellow-500/30 p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Authentic Sports Memorabilia</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Alongside competitions, we offer authentic sports memorabilia and signed items, giving customers access to unique collectibles from the world of sport.
            </p>
            <p className="text-gray-400">
              These sales also contribute to our wider purpose—helping rising athletes reach their potential.
            </p>
          </div>
        </div>
      </div>

      {/* Closing Statement */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-[#161616] rounded-xl border border-gray-800 p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Whether you're entering to win, collecting memorabilia, or supporting future professionals, <span className="text-yellow-400 font-semibold">Northstar Competitions Ltd</span> is committed to delivering a safe, transparent, and enjoyable experience for every customer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;