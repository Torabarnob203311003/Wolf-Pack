import { Star, ExternalLink, MessageCircle, Award } from "lucide-react";

const TrustpilotSection = () => {
  const handleTrustpilotClick = () => {
    window.open(
      "https://www.trustpilot.com/review/northstarcompetitions.co.uk",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-green-500/5 rounded-3xl border border-green-500/20 shadow-2xl backdrop-blur-sm">
          {/* Subtle Pattern Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-green-500/10 blur-3xl rounded-full"></div>

          {/* Content */}
          <div className="relative z-10 py-16 px-8 sm:px-16">
            <div className="text-center max-w-3xl mx-auto">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-lg shadow-green-500/30 transform hover:scale-110 transition-transform duration-300">
                <MessageCircle className="text-white" size={36} />
              </div>

              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                Share Your Experience
              </h2>
              <p className="text-gray-300 text-lg sm:text-xl mb-3 leading-relaxed">
                Your feedback helps us improve and assists others in making informed decisions
              </p>

              {/* Trustpilot Badge */}
              <div className="inline-flex items-center gap-3 mr-5 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-10">
                <Star className="text-green-400 fill-green-400" size={20} />
                <span className="text-white font-semibold">Trusted by thousands</span>
                <span className="text-gray-400">on</span>
                <span className="text-2xl font-bold text-[#00B67A]">Trustpilot</span>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleTrustpilotClick}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold px-10 py-5 rounded-2xl text-xl transition-all duration-300 shadow-xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 active:scale-95"
              >
                <Award size={28} />
                Write a Review
                <ExternalLink
                  size={24}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                />
              </button>

              {/* Subtext */}
              <p className="text-gray-500 text-sm mt-6 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                Takes less than 2 minutes • Your voice matters
              </p>

              {/* Embedded Widget */}
              <div className="mt-12">
                <div
                  className="trustpilot-widget"
                  data-locale="en-US"
                  data-template-id="56278e9abfbbba0bdcd568bc"
                  data-businessunit-id="6929f6406c9fbf29e3ea60ad"
                  data-style-height="52px"
                  data-style-width="100%"
                  data-token="7b1fb16d-3ed2-4f32-99c3-b4df8518b130"
                >
                  <a
                    href="https://www.trustpilot.com/review/northstarcompetitions.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors text-sm"
                  >
                    See what our customers are saying →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustpilotSection;