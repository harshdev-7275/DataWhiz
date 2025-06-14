'use client'
import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/features/userSlice';
import FuturisticLoader from './ui/loader';
import { useRouter } from 'next/navigation';

interface FormData {
  name?: string;
  email: string;
  password: string;
}

interface UserData {
  email: string;
  name: string;
  message: string;
  success: boolean;
  token: string;
  userId: string;
}

const AuthForm = () => {
    const router = useRouter();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const showToast = (message: string, type: 'error' | 'success') => {
    toast[type](message, {
      style: {
        backgroundColor: type === 'error' ? '#333' : '#1e1e1e',
        color: '#fff',
        width: '100%',
        textAlign: 'center',
      },
      duration: 3000,
      position: 'top-center',
    });
  };

  const handleAuth = async () => {
    const { email, password, name } = formData;
    if (email === '' || password === '' || (!isLogin && name === '')) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    setIsLoading(true);
    const url = isLogin ? 'login-user' : 'register-user';
    
    try {
      const response = await axios.post<UserData>(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${url}`,
        formData
      );
      dispatch(setUser(response.data));
      showToast(response.data.message || 'Success!', 'success');
      router.push('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        showToast(error.response?.data.message || 'An error occurred', 'error');
      } else {
        showToast('Internal server error', 'error');
      }
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAuth();
  };

  return (
    <div className="glass-card p-6 sm:p-8 w-full max-w-md mx-auto">
      {isLoading && <FuturisticLoader />}
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-ai-blue to-ai-cyan flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-gradient-to-br from-ai-blue to-ai-cyan rounded-sm"></div>
            </div>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-ai-blue to-ai-cyan bg-clip-text text-transparent">
          AI Analyst
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          {isLogin ? 'Welcome back to the future' : 'Join the intelligence revolution'}
        </p>
      </div>

      <div className="flex mb-6 sm:mb-8">
        <button
          onClick={() => {
            setIsLogin(true);
          }}
          className={`flex-1 py-3 px-4 rounded-l-lg text-sm font-medium transition-all duration-300 ${
            isLogin
              ? 'bg-gradient-to-r from-ai-blue to-ai-cyan text-white border border-ai-border'
              : ' text-gray-400 hover:text-white'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => {
            setIsLogin(false);

          }}
          className={`flex-1 py-3 px-4 rounded-r-lg text-sm font-medium transition-all duration-300 ${
            !isLogin
              ? 'bg-ai-card border border-ai-border text-gray-400 hover:text-white'
              : ' text-gray-400 hover:text-white'
          }`}
        >
          Sign Up
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.form
          key={isLogin ? 'login' : 'signup'}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6 overflow-hidden"
        >
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium text-gray-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="pl-10 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 h-12"
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="pl-10 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 h-12"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className="pl-10 pr-12 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 h-12"
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-ai-blue to-ai-cyan text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-ai-blue/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : (isLogin ? 'Access Dashboard' : 'Create Account')}
            </Button>
          </motion.div>
        </motion.form>
      </AnimatePresence>

      <div className="mt-6 sm:mt-8 text-center">
        <p className="text-gray-400 text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-ai-cyan hover:text-ai-blue transition-colors font-medium"
          >
            {isLogin ? 'Sign up here' : 'Login here'}
          </button>
        </p>
      </div>

      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-xs text-gray-500">
          Powered by AI • Secured by Intelligence
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
