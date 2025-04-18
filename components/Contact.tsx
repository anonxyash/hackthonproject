'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15
    }
  }
};

const inputVariants = {
  focus: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

const iconVariants = {
  hover: {
    scale: 1.2,
    rotate: 360,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-black p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[1fr,1.5fr] gap-6">
        {/* Contact Information */}
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Call Us */}
          <motion.div 
            className="bg-black/40 backdrop-blur-sm rounded-xl p-4 flex items-start space-x-3 hover:bg-black/60 transition-all duration-300 border border-gray-800/50"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <motion.div 
              className="w-8 h-8 rounded-full bg-pink-600/10 flex items-center justify-center"
              variants={iconVariants}
              whileHover="hover"
            >
              <svg className="w-5 h-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </motion.div>
            <div>
              <h3 className="text-white font-medium mb-1">Call Us</h3>
              <p className="text-gray-400">+91 8919712700</p>
            </div>
          </motion.div>

          {/* Email Us */}
          <motion.div 
            className="bg-black/40 backdrop-blur-sm rounded-xl p-4 flex items-start space-x-3 hover:bg-black/60 transition-all duration-300 border border-gray-800/50"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <motion.div 
              className="w-8 h-8 rounded-full bg-pink-600/10 flex items-center justify-center"
              variants={iconVariants}
              whileHover="hover"
            >
              <svg className="w-5 h-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>
            <div>
              <h3 className="text-white font-medium mb-1">Email Us</h3>
              <p className="text-gray-400">help [at] theaxiomsagency@gmail.com</p>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div 
            className="bg-black/40 backdrop-blur-sm rounded-xl p-4 flex items-start space-x-3 hover:bg-black/60 transition-all duration-300 border border-gray-800/50"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <motion.div
              className="w-8 h-8 rounded-full bg-pink-600/10 flex items-center justify-center"
              variants={iconVariants}
              whileHover="hover"
            >
              <svg className="w-5 h-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </motion.div>
            <div>
              <h3 className="text-white font-medium mb-1">Our Location</h3>
              <p className="text-gray-400">Rjn city, Chhattisgarh, india</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.005 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <label className="block text-gray-400 text-sm mb-2">Your Name</label>
                <motion.input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/60 border border-gray-800/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-pink-500 focus:bg-black/80 transition-all text-sm"
                  placeholder="John Doe"
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                <motion.input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/60 border border-gray-800/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-pink-500 focus:bg-black/80 transition-all text-sm"
                  placeholder="john@example.com"
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <label className="block text-gray-400 text-sm mb-2">Phone Number (Optional)</label>
                <motion.input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black/60 border border-gray-800/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-pink-500 focus:bg-black/80 transition-all text-sm"
                  placeholder="+1 (555) 123-4567"
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className="block text-gray-400 text-sm mb-2">Subject</label>
                <motion.select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-black/60 border border-gray-800/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-pink-500 focus:bg-black/80 transition-all text-sm appearance-none"
                  whileFocus="focus"
                  variants={inputVariants}
                >
                  <option value="">Select a subject</option>
                  <option value="project">Project Inquiry</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </motion.select>
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-400 text-sm mb-2">Your Message</label>
              <motion.textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-black/60 border border-gray-800/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-pink-500 focus:bg-black/80 transition-all text-sm min-h-[120px] resize-none"
                placeholder="Tell us about your project or inquiry..."
                whileFocus="focus"
                variants={inputVariants}
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-medium text-sm shadow-lg shadow-pink-500/20"
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98, y: 0 }}
              variants={itemVariants}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}