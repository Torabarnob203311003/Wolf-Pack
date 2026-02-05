import { useEffect, useState } from "react";
import axiosSecure from "../../lib/axiosSecure";

const SponsorPage = () => {
  const [sponsors, setSponsors] = useState([]);

  


  const getCategoryBadge = (category) => {
    switch (category) {
      case 'platinum':
        return 'bg-gradient-to-r from-gray-400 to-gray-200 text-gray-900';
      case 'gold':
        return 'bg-gradient-to-r from-[#a8820f] to-[#E7B20E] text-black';
      case 'silver':
        return 'bg-gradient-to-r from-gray-500 to-gray-400 text-white';
      default:
        return 'bg-gray-700 text-white';
    }
  };

  const fetchSponsors = async () =>{
      try{
        const response = await axiosSecure.get('/sponsor');
        setSponsors(response.data.data);
        console.log(response);
        
      }catch(err){
        console.log(err);
      }
  }

  useEffect(() => {
    fetchSponsors();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#a8820f] to-[#E7B20E] py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-black mb-4">Sponsors & Partners</h1>
          <p className="text-black/80 text-lg max-w-3xl mx-auto">
            This platform is proudly supported by forward-thinking companies and dedicated players 
            who believe in the future of competitive gaming and the growth of the ecosystem.
          </p>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="bg-[#161616] rounded-xl border border-gray-800 hover:border-[#E7B20E]/50 transition-all overflow-hidden group"
            >
              {/* Sponsor Header */}
              <div className="relative h-48 bg-gradient-to-br from-[#1f1f1f] to-[#161616] flex items-center justify-center overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full" 
                    style={{
                      backgroundImage: 'radial-gradient(circle, #E7B20E 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  />
                </div>
                
                {/* Logo/Photo */}
                <div className="relative z-10">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#E7B20E]/30 group-hover:border-[#E7B20E] transition-all group-hover:scale-110 duration-300">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`${getCategoryBadge(sponsor.category)} px-4 py-1.5 rounded-full text-xs font-bold uppercase shadow-lg`}>
                    {sponsor.category}
                  </span>
                </div>

                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-gray-700">
                    {sponsor.type === 'company' ? '🏢 Company' : '👤 Individual'}
                  </span>
                </div>
              </div>

              {/* Sponsor Content */}
              <div className="p-6 space-y-4">
                {/* Name & Since */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-[#E7B20E] transition">
                      {sponsor.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Sponsor since {sponsor.sponsorSince}
                    </p>
                  </div>
                </div>

                {/* Contribution Tag */}
                <div className="inline-flex items-center gap-2 bg-[#E7B20E]/10 border border-[#E7B20E]/30 px-3 py-1.5 rounded-lg">
                  <svg className="w-4 h-4 text-[#E7B20E]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-[#E7B20E] text-sm font-medium">
                    {sponsor.contribution}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  {sponsor.description}
                </p>

                {/* Website Link */}
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#E7B20E] hover:text-[#e9b005] font-medium text-sm group/link transition"
                >
                  Visit Website
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sponsors.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-[#161616] rounded-full flex items-center justify-center border border-gray-800">
              <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">No sponsors found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SponsorPage;