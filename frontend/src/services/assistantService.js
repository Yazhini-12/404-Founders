// AI Career Assistant Service Layer
// TODO: Replace with Gemini / OpenAI LLM Edge Function streaming endpoint

import { mockEmployee } from '../data/mockEmployee';

export const assistantService = {
  async sendCareerAssistantMessage(messageText, conversationHistory = []) {
    // Artificial latency for conversational AI simulation
    await new Promise(res => setTimeout(res, 450));

    const q = messageText.toLowerCase();

    if (q.includes('role') || q.includes('suitable')) {
      return {
        reply: `Based on your high proficiency in **Python (92%)**, **Docker (84%)**, **REST API (90%)**, and **AWS (78%)**, your top internal role matches are:\n\n1. **Cloud Engineer** (87% Match) - *Recommended Target*\n2. **DevOps Engineer** (82% Match)\n3. **Platform Engineer** (78% Match)\n\nWould you like me to generate a 3-month action plan to close your Kubernetes & Terraform skill gaps for Cloud Engineer?`,
        suggestedActions: ['Show Cloud Engineer Gaps', 'Generate 3-Month Learning Plan']
      };
    }

    if (q.includes('skill') || q.includes('learn next') || q.includes('next')) {
      return {
        reply: `To accelerate your transition from **Backend Developer** to **Cloud Engineer**, your top priority skills to learn next are:\n\n1. **Terraform** (Major Gap: 20% current vs 65% target)\n2. **Kubernetes** (In Progress: 52% current vs 75% target)\n\nCompleting the *Kubernetes Fundamentals* course will boost your match score by +6%!`,
        suggestedActions: ['Start Kubernetes Course', 'View Terraform Resources']
      };
    }

    if (q.includes('why') || q.includes('cloud engineer')) {
      return {
        reply: `You match **87%** with the **Cloud Engineer** role because:\n\n• You have 3.5 years of microservices experience.\n• Your AWS skills (78%) are validated by the Cloud Migration Platform project and AWS Practitioner certification.\n• Your Docker skills (84%) demonstrate strong container management.\n\nYour main remaining gaps are Terraform IaC and Kubernetes cluster configuration.`,
        suggestedActions: ['View Cloud Engineer Details', 'Compare Skill Radar']
      };
    }

    if (q.includes('ai engineer') || q.includes('how can i become')) {
      return {
        reply: `To transition into an **AI Backend Engineer** role (currently a 73% match):\n\n1. Leverage your existing strengths in **Python** and **FastAPI**.\n2. Complete internal training on **PyTorch** and **pgvector Vector Databases**.\n3. Participate in an upcoming AI microservice pilot.`,
        suggestedActions: ['View AI Engineer Role', 'Explore ML Workshops']
      };
    }

    return {
      reply: `Great question, ${mockEmployee.fullName.split(' ')[0]}! As your SkillSync AI Career Assistant, I continuously analyze your profile, projects, and learning history. Your strongest technical capabilities lie in Python (92%), REST API Architecture (90%), and Docker (84%). How can I help you navigate your career growth today?`,
      suggestedActions: ['What roles am I suitable for?', 'What skill should I learn next?', 'Why is Cloud Engineer recommended?']
    };
  }
};
