'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, Send, CheckCircle2, MessageSquare } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormDataState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Discovery call submitted:", formData);
    setIsSubmitted(true);
    if (typeof window !== "undefined" && window.ttq) {
      window.ttq.track("SubmitForm", {
        content_name: "Discovery Session",
        value: 0,
        currency: "USD",
      });
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-lg bg-[#08080c]/90 border border-white/10 rounded-[2rem] shadow-2xl p-8 md:p-10 overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glossy top highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2B6EFF] to-transparent" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-blue-400" />
                </div>
                <h3
                  className="text-2xl font-bold mb-3 text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Request Received!
                </h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
                  Our engineering leads will contact you at your email or phone number within 2 hours.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <div>
                <div className="mb-8">
                  <h2
                    className="text-3xl font-extrabold text-white mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Start Your Project
                  </h2>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    Tell us what you are building. Book a free consultation with our engineering leads.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#2B6EFF] focus:bg-[#0c0c12]/80 transition-all font-light"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#2B6EFF] focus:bg-[#0c0c12]/80 transition-all font-light"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 019-2834"
                        className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#2B6EFF] focus:bg-[#0c0c12]/80 transition-all font-light"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Project Specs (Optional)
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-[18px] w-4 h-4 text-gray-500" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Web app layout, UI guidelines, smart contract specs..."
                        rows={3}
                        className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#2B6EFF] focus:bg-[#0c0c12]/80 transition-all resize-none font-light leading-relaxed"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 mt-2 bg-gradient-to-r from-[#2B6EFF] to-[#71A6FF] hover:from-[#1e5cdc] hover:to-[#5792f9] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#2B6EFF]/20 transition-all hover:scale-[1.01] cursor-pointer"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <span>Request Discovery Session</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
