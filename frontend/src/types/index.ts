export interface User {
  id: string;
  email: string;
  name: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: string;
  attachments?: {
    type: string;
    url: string;
  }[];
}

export interface VerificationStep {
  id: string;
  title: string;
  status: 'pending' | 'completed' | 'error';
  type: 'chat' | 'document' | 'identity';
}

export interface Document {
  id: string;
  type: string;
  fileName: string;
  url: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
}
