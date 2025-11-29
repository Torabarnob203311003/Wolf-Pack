import React from 'react';
import { FileText, AlertCircle, Shield, CreditCard, Trophy, Package, RefreshCw, Globe, Lock, Mail, MapPin } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      id: 1,
      icon: <FileText className="w-6 h-6" />,
      title: "Who We Are",
      content: "Northstar Competitions Ltd provides skill-based competitions, sells sports memorabilia, and supports upcoming athletes."
    },
    {
      id: 2,
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Eligibility",
      content: [
        "You must be 18 or older",
        "You must be a UK resident",
        "You must provide accurate information",
        "We may refuse entries if misuse is suspected"
      ]
    },
    {
      id: 3,
      icon: <Trophy className="w-6 h-6" />,
      title: "Competitions",
      content: [
        "All competitions include a skill-based question",
        "Only correct answers qualify for the draw",
        "Entries must be received before the advertised closing date",
        "We may extend or close competitions early",
        "If a competition is cancelled, all paid entries will be refunded"
      ]
    },
    {
      id: 4,
      icon: <CreditCard className="w-6 h-6" />,
      title: "Payments",
      content: [
        "Payments are processed securely via Stripe or Revolut Merchant Services",
        "We do not store card details",
        "Entries are valid only after successful payment",
        "Payments are non-refundable unless a competition is cancelled"
      ]
    },
    {
      id: 5,
      icon: <Trophy className="w-6 h-6" />,
      title: "Draws and Winners",
      content: [
        "Winners are chosen at random from eligible entries",
        "Winners will be contacted using the details provided",
        "Names and general locations may be published",
        "If a winner cannot be contacted within 14 days, we may redraw"
      ]
    },
    {
      id: 6,
      icon: <Package className="w-6 h-6" />,
      title: "Prizes",
      content: [
        "Prizes match the description on each competition page",
        "Prizes cannot be exchanged or transferred unless stated",
        "Winners must accept delivery or collection within the specified time"
      ]
    },
    {
      id: 7,
      icon: <Package className="w-6 h-6" />,
      title: "Sports Memorabilia Sales",
      content: [
        "Items will match descriptions and include authenticity where applicable",
        "Returns are accepted for damaged or mis-described items only",
        "Issues must be reported within 48 hours of receipt"
      ]
    },
    {
      id: 8,
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Refunds",
      content: [
        "Refunds are issued only if a competition is cancelled or a memorabilia item is faulty or misdescribed",
        "No refunds are given for incorrect answers, duplicate entries, change of mind, or failed/declined payments"
      ]
    },
    {
      id: 9,
      icon: <Globe className="w-6 h-6" />,
      title: "Website Use",
      content: [
        "You must not misuse the website",
        "You must not attempt to interfere with the competition process",
        "You must not copy content without permission"
      ]
    },
    {
      id: 10,
      icon: <Shield className="w-6 h-6" />,
      title: "Liability",
      content: [
        "We are not responsible for technical issues, payment failures, or incorrect contact details supplied by users",
        "Nothing excludes liability for fraud or personal injury caused by negligence"
      ]
    },
    {
      id: 11,
      icon: <Lock className="w-6 h-6" />,
      title: "Data Protection",
      content: [
        "We comply with UK GDPR",
        "Data is used only to process orders, run competitions, contact winners, and prevent fraud",
        "We do not sell your data",
        "See our Privacy Policy for full details"
      ]
    },
    {
      id: 12,
      icon: <FileText className="w-6 h-6" />,
      title: "Changes to These Terms",
      content: "We may update these Terms at any time. Continued use of the website means you accept the updated version."
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
              <FileText className="w-8 h-8 text-yellow-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-lg text-gray-400 mb-6">
              Northstar Competitions Ltd
            </p>
        
          </div>
        </div>
      </div>

      {/* Agreement Notice */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <p className="text-gray-300 text-center">
            By using our website, entering a competition, or purchasing products, you agree to these Terms & Conditions.
          </p>
        </div>
      </div>

      {/* Terms Sections */}
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
                  {Array.isArray(section.content) ? (
                    <ul className="space-y-2">
                      {section.content.map((item, idx) => (
                        <li key={idx} className="text-gray-400 leading-relaxed flex items-start">
                          <span className="text-yellow-400 mr-2 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 leading-relaxed">{section.content}</p>
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
        </div>
      </div>
    </div>
  );
};

export default Terms;