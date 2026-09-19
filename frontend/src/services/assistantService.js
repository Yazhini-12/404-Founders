// AI Career Assistant Service
// Connects the frontend to the FastAPI + Gemini backend.

const API_BASE_URL = 'http://localhost:8000';

export const assistantService = {
  async sendCareerAssistantMessage(messageText, conversationHistory = []) {
    const response = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employee_code: 'EMP001',
        message: messageText,
      }),
    });

    if (!response.ok) {
      let errorMessage = 'Unable to connect to the AI Career Assistant.';

      try {
        const errorData = await response.json();
        errorMessage =
          errorData.detail ||
          errorData.message ||
          errorMessage;
      } catch {
        // Use default error message
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();

    return {
      reply: data.ai_response,
      mode: data.mode,
      llmConnected: data.llm_connected,
      contextRetrieved: data.context_retrieved,

      suggestedActions: [
        'What roles am I suitable for?',
        'What skills should I improve?',
        'Explain my career readiness',
        'Show me my career roadmap',
      ],
    };
  },
};