import React from 'react';
import { Shield, Lock, Database, Users, Mail, Share2, Cookie, Server, CheckCircle, UserX, Globe, FileText, MapPin } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      id: 1,
      icon: <FileText className="w-6 h-6" />,
      title: "Who We Are",
      content: "Northstar Competitions Ltd is a UK company offering skill-based competitions, sports memorabilia sales, and support for upcoming athletes. We act as the Data Controller."
    },
    {
      id: 2,
      icon: <Database className="w-6 h-6" />,
      title: "Information We Collect",
      subsections: [
        {
          subtitle: "Information you provide:",
          items: ["Name, address, email, phone number", "Date of birth", "Competition answers", "Payment information (processed securely by Stripe—card details are never stored by us)"]
        },
        {
          subtitle: "Automatically collected:",
          items: ["IP address", "Device/browser type", "Website usage data via cookies"]
        }
      ]
    },
    {
      id: 3,
      icon: <CheckCircle className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "Operate competitions and validate entries",
        "Contact winners and publish winner names/locations",
        "Process payments securely",
        "Prevent fraud",
        "Fulfil memorabilia orders and handle returns",
        "Improve our website and maintain security"
      ],
      note: "We do not sell your data."
    },
    {
      id: 4,
      icon: <Shield className="w-6 h-6" />,
      title: "Lawful Basis for Processing",
      content: [
        "Contract (to provide services)",
        "Legal Obligation",
        "Legitimate Interests (running secure transparent competitions)",
        "Consent (for marketing)"
      ]
    },
    {
      id: 5,
      icon: <Mail className="w-6 h-6" />,
      title: "Marketing",
      content: "We only send marketing if you opt in or are an existing customer receiving similar offers. You can unsubscribe anytime."
    },
    {
      id: 6,
      icon: <Share2 className="w-6 h-6" />,
      title: "Sharing Your Information",
      content: "We only share necessary data with trusted providers:",
      list: [
        "Stripe/Revolut for payments",
        "IT/hosting providers",
        "Couriers",
        "Regulatory bodies if required by law"
      ],
      note: "We do not share data for advertising."
    },
    {
      id: 7,
      icon: <Cookie className="w-6 h-6" />,
      title: "Cookies",
      content: "We use cookies for website functionality and analytics. You can disable cookies through your browser."
    },
    {
      id: 8,
      icon: <Server className="w-6 h-6" />,
      title: "Data Storage & Security",
      content: "Data is stored securely using:",
      list: [
        "Encryption",
        "Access controls",
        "Secure payment systems",
        "Regular monitoring"
      ],
      note: "Data is kept only as long as necessary for legal and operational purposes."
    },
    {
      id: 9,
      icon: <Users className="w-6 h-6" />,
      title: "Your Rights",
      content: "You have the right to:",
      list: [
        "Access your data",
        "Correct your data",
        "Delete your data",
        "Restrict or object to processing",
        "Request data portability",
        "Withdraw consent"
      ],
      note: "Contact us to exercise your rights."
    },
    {
      id: 10,
      icon: <UserX className="w-6 h-6" />,
      title: "Children",
      content: "We do not knowingly collect data from anyone under 18."
    },
    {
      id: 11,
      icon: <Globe className="w-6 h-6" />,
      title: "International Transfers",
      content: "Some service providers may process data outside the UK using legally approved safeguards."
    },
    {
      id: 12,
      icon: <FileText className="w-6 h-6" />,
      title: "Changes to This Policy",
      content: "We may update this policy and will post updates on this page."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#161616] to-[#0f0f0f] border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 via-yellow-400/5 to-yellow-700/10"></div>
        <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-full border-2 border-yellow-500/50 mb-6">
              <Lock className="w-8 h-8 text-yellow-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-400 mb-6">
              Northstar Competitions Ltd
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Notice */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-[#161616] border border-gray-800 rounded-xl p-6">
          <p className="text-gray-300 leading-relaxed">
            This Privacy Policy explains how Northstar Competitions Ltd ("we", "us", "our") collects, uses, and protects your personal information. By using our website, entering competitions, or purchasing products, you agree to this policy.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              <span className="text-yellow-400 font-semibold">We comply with UK GDPR and the Data Protection Act 2018.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Sections */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="space-y-6">
          {sections.map((section) => (
            <div 
              key={section.id}
              className="bg-[#161616] rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500/20 p-3 rounded-lg border border-yellow-500/30 flex-shrink-0">
                  <div className="text-yellow-400">
                    {section.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-3">
                    {section.id}. {section.title}
                  </h2>
                  
                  {section.subsections ? (
                    <div className="space-y-4">
                      {section.subsections.map((subsection, idx) => (
                        <div key={idx}>
                          <p className="text-gray-300 font-medium mb-2">{subsection.subtitle}</p>
                          <ul className="space-y-2">
                            {subsection.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="text-gray-400 leading-relaxed flex items-start">
                                <span className="text-yellow-400 mr-2 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {typeof section.content === 'string' ? (
                        <p className="text-gray-400 leading-relaxed">{section.content}</p>
                      ) : Array.isArray(section.content) ? (
                        <ul className="space-y-2">
                          {section.content.map((item, idx) => (
                            <li key={idx} className="text-gray-400 leading-relaxed flex items-start">
                              <span className="text-yellow-400 mr-2 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      
                      {section.list && (
                        <>
                          <p className="text-gray-400 leading-relaxed mb-3">{section.content}</p>
                          <ul className="space-y-2">
                            {section.list.map((item, idx) => (
                              <li key={idx} className="text-gray-400 leading-relaxed flex items-start">
                                <span className="text-yellow-400 mr-2 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      
                      {section.note && (
                        <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                          <p className="text-yellow-200 text-sm font-medium">{section.note}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
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
          
          <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-200 text-sm text-center">
              To exercise your data rights or for any privacy-related questions, please contact us using the information above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;