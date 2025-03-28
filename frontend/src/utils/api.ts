import axios from 'axios';

const openaiApi = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const sendChatMessage = async (message: string) => {
  try {
    const response = await openaiApi.post('/chat/completions', {
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a professional verification assistant. Your role is to verify candidate information through a series of questions. Be polite, professional, and thorough.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw new Error('Failed to get response from AI');
  }
};

export const textToSpeech = async (text: string) => {
  try {
    const response = await axios.post(
      'https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM',
      {
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      },
      {
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        responseType: 'blob',
      }
    );

    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error converting text to speech:', error);
    throw new Error('Failed to convert text to speech');
  }
};
