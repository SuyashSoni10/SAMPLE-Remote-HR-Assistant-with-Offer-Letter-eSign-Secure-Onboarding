'use client';
import { useState } from 'react';
import { ChatInterface } from '../../components/ChatInterface';
import { DocumentUpload } from '../../components/DocumentUpload';
import { VerificationStep } from '../../types';

export default function VerificationPage() {
  const [currentStep, setCurrentStep] = useState<VerificationStep['type']>('chat');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Candidate Verification</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Complete the following steps to verify your identity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Sidebar - Steps */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-6">
              <div className="space-y-4">
                <div 
                  className={`flex items-center space-x-3 cursor-pointer transition-colors ${
                    currentStep === 'chat' ? 'text-primary-600' : 'text-gray-500'
                  }`}
                  onClick={() => setCurrentStep('chat')}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === 'chat' ? 'bg-primary-100' : 'bg-gray-100'
                  }`}>
                    1
                  </div>
                  <span className="font-medium">Chat Verification</span>
                </div>
                
                <div 
                  className={`flex items-center space-x-3 cursor-pointer transition-colors ${
                    currentStep === 'document' ? 'text-primary-600' : 'text-gray-500'
                  }`}
                  onClick={() => setCurrentStep('document')}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === 'document' ? 'bg-primary-100' : 'bg-gray-100'
                  }`}>
                    2
                  </div>
                  <span className="font-medium">Document Upload</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-sm">
              {currentStep === 'chat' ? (
                <div className="h-[600px] sm:h-[700px]">
                  <ChatInterface />
                </div>
              ) : (
                <div className="p-6">
                  <DocumentUpload />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
