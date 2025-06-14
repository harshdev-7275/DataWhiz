
import AuthForm from '@/components/AuthForm';
import BackgroundEffects from '@/components/BackgroundEffects';
import React  from 'react';


const AuthPage = () => {


  return (
<div className="min-h-screen bg-ai-dark relative overflow-hidden">
      <BackgroundEffects />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in">
          <AuthForm />
        </div>
      </div>

      {/* Subtle branding footer */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <div className="w-2 h-2 bg-gradient-to-r from-ai-blue to-ai-cyan rounded-full animate-pulse"></div>
          <span>Next-Generation Intelligence Platform</span>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
