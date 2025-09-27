'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Users, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Clock,
  Award,
  Smartphone,
  Eye,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Star,
  ChevronRight,
  Play,
  Building2,
  Leaf,
  Mountain
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  // Jharkhand-specific statistics
  const stats = [
    { number: "8,500+", label: "Issues Resolved", icon: CheckCircle, color: "text-green-600" },
    { number: "24", label: "Districts Connected", icon: Globe, color: "text-blue-600" },
    { number: "95%", label: "Citizen Satisfaction", icon: Star, color: "text-yellow-600" },
    { number: "3.3M+", label: "Citizens Served", icon: Users, color: "text-purple-600" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  const features = [
    {
      icon: MapPin,
      title: "GPS-Based Issue Reporting",
      description: "Report civic issues across all 24 districts of Jharkhand with precise location tracking and village-level identification."
    },
    {
      icon: Eye,
      title: "Transparent Progress Tracking",
      description: "Monitor your complaints in real-time with updates from Block, District, and State-level officials."
    },
    {
      icon: Building2,
      title: "Multi-Language Support",
      description: "Access services in Hindi, English, and major tribal languages including Santhali, Mundari, and Ho."
    },
    {
      icon: Smartphone,
      title: "Mobile & Offline Ready",
      description: "Works seamlessly on smartphones and supports offline reporting for areas with limited connectivity."
    },
    {
      icon: Mountain,
      title: "Rural-Urban Integration",
      description: "Bridging the gap between urban centers like Ranchi and remote tribal areas across all districts."
    },
    {
      icon: Zap,
      title: "Quick Response System",
      description: "Direct escalation to appropriate departments including PWD, PHE, Electricity Board, and Rural Development."
    }
  ];

  const testimonials = [
    {
      name: "Sunita Kumari",
      role: "Resident, Ranchi",
      content: "झारखंड सरकार के इस platform से मेरी road की समस्या सिर्फ 5 दिन में solve हो गई। बहुत अच्छी service है।",
      rating: 5
    },
    {
      name: "Ravi Kumar Singh",
      role: "Block Development Officer, Khunti",
      content: "This system has revolutionized how we handle citizen complaints. The district-wise analytics help us prioritize development work effectively.",
      rating: 5
    },
    {
      name: "Champa Devi",
      role: "Village Leader, Lohardaga",
      content: "अब हमारे गांव की आवाज भी सुनी जाती है। Water supply की problem report करने के बाद तुरंत action मिला।",
      rating: 5
    }
  ];

  const districts = [
    "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", 
    "Giridih", "Ramgarh", "Medininagar", "Chaibasa", "Dumka", "Godda",
    "Sahebganj", "Pakur", "Jamtara", "Khunti", "Gumla", "Simdega",
    "Lohardaga", "Chatra", "Koderma", "Garhwa", "Latehar", "Seraikela-Kharsawan"
  ];

  const NavLink = ({ href, children, mobile = false }: { href: string, children: React.ReactNode, mobile?: boolean }) => (
    <Link
      href={href}
      className={`${
        mobile 
          ? 'block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors' 
          : 'text-gray-700 hover:text-orange-600 font-medium transition-colors'
      }`}
    >
      {children}
    </Link>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-600 to-green-600 p-2 rounded-xl shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                  Civic Connect
                </h1>
                <p className="text-xs text-gray-600">झारखंड सरकार</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="#features">सुविधाएं</NavLink>
              <NavLink href="#districts">Districts</NavLink>
              <NavLink href="#testimonials">Reviews</NavLink>
              <NavLink href="#contact">संपर्क</NavLink>
               <Button asChild className="bg-gradient-to-r from-orange-600 to-green-600 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Link href="/login">शिकायत दर्ज करें</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-orange-600 p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="space-y-2">
                <NavLink href="#features" mobile>सुविधाएं</NavLink>
                <NavLink href="#districts" mobile>Districts</NavLink>
                <NavLink href="#testimonials" mobile>Reviews</NavLink>
                <NavLink href="#contact" mobile>संपर्क</NavLink>
                <Button asChild className="w-full mt-4 bg-gradient-to-r from-orange-600 to-green-600 text-white px-6 py-2 rounded-lg font-medium">
                  <Link href="/login">शिकायत दर्ज करें</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-green-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              <span>झारखंड के सभी 24 जिलों में उपलब्ध</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              आपकी आवाज़, हमारी जिम्मेदारी
              <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent block">
                झारखंड डिजिटल गवर्नेंस
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              झारखंड सरकार के साथ सीधा संपर्क। अपनी समस्याएं रिपोर्ट करें, प्रगति देखें, और अपने क्षेत्र के विकास में भागीदार बनें।
            </p>
            
            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto italic">
              "Empowering every citizen from Ranchi to the remotest villages of Jharkhand"
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-700 hover:to-green-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-2">
                <Link href="/login">
                  <span>अभी शिकायत करें</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 font-medium group">
                <div className="bg-white p-3 rounded-full shadow-lg group-hover:shadow-xl transition-all">
                  <Play className="w-5 h-5" />
                </div>
                <span>वीडियो देखें</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 p-6 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center transform transition-all duration-500 ${
                    index === currentStat ? 'scale-105' : ''
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${
                    index === 0 ? 'from-green-500 to-green-600' :
                    index === 1 ? 'from-orange-500 to-orange-600' :
                    index === 2 ? 'from-yellow-500 to-yellow-600' :
                    'from-blue-500 to-blue-600'
                  } mb-3 mx-auto`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Districts Coverage */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              झारखंड के सभी 24 जिलों में सेवा
            </h2>
            <p className="text-lg text-gray-600">
              From urban centers to remote tribal areas - complete state coverage
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-center">
            {districts.map((district, index) => (
              <div 
                key={index}
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all text-sm font-medium text-gray-700 hover:text-orange-600"
              >
                {district}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              झारखंड के लिए विशेष सुविधाएं
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Designed specifically for Jharkhand's unique geographical and cultural landscape
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-orange-500 to-green-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <div className="mt-4 flex items-center text-orange-600 font-medium group-hover:translate-x-2 transition-transform">
                  <span className="text-sm">और जानें</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-r from-orange-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              झारखंड के नागरिकों का भरोसा
            </h2>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Real stories from citizens across all 24 districts of Jharkhand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-orange-100 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Leaf className="w-16 h-16 mx-auto text-green-600 mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              झारखंड के विकास में भागीदार बनें
            </h2>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            अपनी शिकायत दर्ज करें और देखें कि कैसे आपकी आवाज़ झारखंड को बेहतर बनाने में मदद करती है। 
            <span className="block mt-2 italic">Be part of Jharkhand's digital transformation journey.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
             <Button asChild size="lg" className="bg-gradient-to-r from-orange-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-700 hover:to-green-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                <Link href="/login">शिकायत दर्ज करें</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-orange-600 hover:text-orange-600 transition-all">
              डेमो देखें
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-orange-600 to-green-600 p-2 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Civic Connect</h3>
                  <p className="text-gray-400 text-sm">झारखंड सरकार</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Government of Jharkhand's digital platform for citizen engagement and transparent governance across all 24 districts.
              </p>
              <p className="text-sm text-gray-400 mb-4">
                झारखंड सरकार की डिजिटल पहल - पारदर्शी शासन के लिए
              </p>
              <div className="text-sm text-gray-500">
                © 2024 Government of Jharkhand. All rights reserved.
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">सेवाएं</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">शिकायत दर्ज करें</a>
                <a href="#" className="block hover:text-white transition-colors">स्थिति जांचें</a>
                <a href="#" className="block hover:text-white transition-colors">विभाग संपर्क</a>
                <a href="#" className="block hover:text-white transition-colors">मार्गदर्शन</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block hover:text-white transition-colors">संपर्क करें</a>
                <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              एक डिजिटल झारखंड की ओर - Building Digital Jharkhand Together
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
