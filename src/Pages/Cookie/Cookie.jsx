import React from 'react';
import { Cookie, Shield, BarChart3, Settings, Megaphone, Globe, Sliders, FileText, Mail, MapPin } from 'lucide-react';

const CookiePolicy = () => {
  const cookieTypes = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Essential Cookies",
      description: "Required for core website functions, including secure checkout, account access, and competition entry forms. These cannot be disabled.",
      color: "blue"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Performance & Analytics Cookies",
      description: "Used to analyse website traffic and improve user experience (e.g., Google Analytics). These do not personally identify you.",
      color: "green"
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Functionality Cookies",
      description: "Allow the site to remember your preferences, such as login details or saved settings.",
      color: "purple"
    },
    {
      icon: <Megaphone className="w-5 h-5" />,
      title: "Marketing Cookies",
      description: "Used only with your consent. These help provide relevant content or promotions. We do not sell or share data with external advertisers.",
      color: "orange"
    }
  ];

  const thirdPartyServices = [
    { name: "Google Analytics", purpose: "traffic and performance monitoring" },
    { name: "Stripe", purpose: "secure payment processing" },
    { name: "Social media platforms", purpose: "if you use share or like buttons" }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#161616] to-[#0f0f0f] border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 via-yellow-400/5 to-yellow-700/10"></div>
        <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-full border-2 border-yellow-500/50 mb-6">
              <Cookie className="w-8 h-8 text-yellow-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-lg text-gray-400 mb-6">
              Northstar Competitions Ltd
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-[#161616] border border-gray-800 rounded-xl p-6">
          <p className="text-gray-300 leading-relaxed">
            This Cookie Policy explains how Northstar Competitions Ltd ("we", "us", "our") uses cookies and similar technologies on our website. By continuing to use our site, you agree to the use of cookies as described below.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="space-y-6">
          {/* Section 1: What Are Cookies */}
          <div className="bg-[#161616] rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-all">
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-500/20 p-3 rounded-lg border border-yellow-500/30 flex-shrink-0">
                <Cookie className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">1. What Are Cookies?</h2>
                <p className="text-gray-400 leading-relaxed">
                  Cookies are small text files stored on your device when you visit a website. They help the site function properly, improve performance, and provide analytics.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Types of Cookies */}
          <div className="bg-[#161616] rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-all">
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-500/20 p-3 rounded-lg border border-yellow-500/30 flex-shrink-0">
                <Settings className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-4">2. Types of Cookies We Use</h2>
                <div className="space-y-3">
                  {cookieTypes.map((type, idx) => (
                    <div key={idx} className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4 hover:border-yellow-500/30 transition-all">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          type.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                          type.color === 'green' ? 'bg-green-500/20 text-green-400' :
                          type.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-orange-500/20 text-orange-400'
                        }`}>
                          {type.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">{type.title}</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">{type.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Third-Party Cookies */}
          <div className="bg-[#161616] rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-all">
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-500/20 p-3 rounded-lg border border-yellow-500/30 flex-shrink-0">
                <Globe className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">3. Third-Party Cookies</h2>
                <p className="text-gray-400 leading-relaxed mb-3">
                  We may use third-party services that place cookies, including:
                </p>
                <ul className="space-y-2 mb-3">
                  {thirdPartyServices.map((service, idx) => (
                    <li key={idx} className="text-gray-400 flex items-start">
                      <span className="text-yellow-400 mr-2 mt-1">•</span>
                      <span>
                        <strong className="text-white">{service.name}</strong> ({service.purpose})
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-200 text-sm">
                    These providers may process data outside the UK under approved safeguards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Managing Cookies */}
          <div className="bg-[#161616] rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-all">
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-500/20 p-3 rounded-lg border border-yellow-500/30 flex-shrink-0">
                <Sliders className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">4. Managing Cookies</h2>
                <p className="text-gray-400 leading-relaxed">
                  You can disable or manage cookies in your browser settings at any time. However, blocking certain cookies may affect website functionality, including entering competitions or completing payments.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Changes to This Policy */}
          <div className="bg-[#161616] rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-all">
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-500/20 p-3 rounded-lg border border-yellow-500/30 flex-shrink-0">
                <FileText className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">5. Changes to This Policy</h2>
                <p className="text-gray-400 leading-relaxed">
                  We may update this policy occasionally. Any changes will be displayed on this page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-[#161616] rounded-xl border border-gray-800 p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-700">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-1">Company Name</p>
                <p className="text-white font-medium">Northstar Competitions Ltd</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-700">
              <Mail className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <a 
                  href="mailto:win@northstarcompetitions.co.uk" 
                  className="text-yellow-400 font-medium hover:text-yellow-300 transition-colors"
                >
                  win@northstarcompetitions.co.uk
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-700">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-1">Address</p>
                <p className="text-white font-medium">Unit 9, NE33 1RA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;