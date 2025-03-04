"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Clock, Phone, Menu, X, ChevronRight, Gift } from "lucide-react";
import { useState } from "react";
import  Link  from "next/navigation"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";



export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [insuranceType, setInsuranceType] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      console.log('Data:', { name, email, phone, insuranceType });
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          insuranceType,
        }),
      });

      console.log(response)
      if(response.status==200){
        setIsDialogOpen(true);
      }
      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      // Clear form or show success message
      setName("");
      setEmail("");
      setPhone("");
      setInsuranceType("");
    } catch (error) {
      setSubmitError("Failed to submit form. Please try again.");
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 font-['Inter'] overflow-x-hidden">
      {/* Navigation - Mobile First */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center ">
              <img src="/logo.png" alt="logo" className="h-10 w-10 " />
              <span className="text-xl md:text-xl font-semibold text-gray-900 ">Soft Satisfaction</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop Menu */}
            <div className="hidden sm:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`sm:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-48' : 'max-h-0'} overflow-hidden bg-white`}>
          <div className="px-4 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Home
            </a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              About
            </a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Mobile Optimized */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Protecting Your Journey with Confidence
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Get comprehensive bike insurance that keeps you protected on every ride.
              </p>
              <Button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-white text-blue-600 px-8 py-6 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                Get Your Quote Now
                <ChevronRight className="ml-2 h-5 w-5 inline" />
              </Button>
            </div>
            <div className="hidden md:block">
            
              <img
                src="https://5.imimg.com/data5/SELLER/Default/2021/12/MK/FB/MR/142037608/suzuki-burgman-street-125-motorcycle-500x500.jpg"
                alt="Bike Insurance"
                className="rounded-2xl shadow-2xl "
              />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Offer Section */}
      <div className="relative -mt-8 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl p-6 md:p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="absolute top-0 right-0 -mt-4 -mr-4">
              <div className="bg-yellow-400 text-gray-900 rounded-full p-3 shadow-lg animate-bounce">
                <Gift className="h-6 w-6" />
              </div>
            </div>
            <div className="text-center">
              <div className="flex flex-col">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">🎉 Limited Time Mega Offer!</h2>
              <p className="">(If you complete your payment in 48hrs)</p>
              </div>
              <div className="space-y-4 mb-6">
                <p className="text-xl md:text-2xl">
                  Choose Your Premium Gift:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                    <h3 className="text-xl font-bold mb-2">Premium Helmet</h3>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                    <h3 className="text-xl font-bold mb-2">Movie Ticket</h3>
                  </div>
                </div>
              </div>
              <Button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-purple-50 transition-colors shadow-xl">
                Claim Your Gift Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Insurance Form - Mobile Optimized */}
      <div id="quote-form" className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Get Your Personalized Quote</h2>
            <form className="space-y-6" action="/api/submit" method="POST" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <Input
                    type="text"
                    name="name"
                    className="h-12 rounded-xl"
                    
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <Input
                    type="email"
                    name="email"
                    className="h-12 rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <Input
                    type="tel"
                    name="phone"
                    className="h-12 rounded-xl"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2 flex flex-col">
                  <label className="text-sm font-medium text-gray-700">Insurance Type</label>
                  <select
                    name="insuranceType"
                    value={insuranceType}
                    onChange={(e) => setInsuranceType(e.target.value)}
                    className="h-12 rounded-xl"
                  >
                    <option value="" disabled>Select insurance type</option>
                    <option value="comprehensive">Comprehensive Coverage</option>
                    <option value="thirdParty">Third Party Liability</option>
                  </select>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full..."
              >
                {isSubmitting ? "Submitting..." : "Get Your Free Quote"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Features Section - Mobile Optimized */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="h-8 w-8 text-blue-600" />,
                title: "Quick Processing",
                description: "Get your insurance quote in minutes, not hours"
              },
              {
                icon: <Shield className="h-8 w-8 text-blue-600" />,
                title: "Secure Coverage",
                description: "Comprehensive protection for your motorcycle"
              },
              {
                icon: <Phone className="h-8 w-8 text-blue-600" />,
                title: "24/7 Support",
                description: "Always here when you need us"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 text-center bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300"
              >
                <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
  

      {/* Footer - Mobile Optimized */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <Shield className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-semibold text-white">Soft Satisfaction</span>
              </div>
              <p className="text-sm">Protecting your journey with reliable bike insurance solutions.</p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">About Us</a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
                </li>
                <li>
                  <a href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Phone className="h-5 w-5" />
                <span>+91 7030376143</span>
              </div>
            </div>
          </div>

        </div>
      </footer>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Thank You for Registering!</DialogTitle>
          <DialogDescription className="text-center pt-2">
            We appreciate your interest. Our team will contact you within the next 24 hours.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-4">
          <Button onClick={() => setIsDialogOpen(false)} className="bg-blue-600 hover:bg-blue-700">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </div>
  );
}