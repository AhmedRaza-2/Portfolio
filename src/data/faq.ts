// Visible FAQ. Keep this in sync with the FAQPage JSON-LD in index.html:
// Google requires structured-data FAQs to match content shown on the page.
export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: 'Who is Ahmed Raza?',
    answer:
      'Ahmed Raza is an AI/ML Engineer and BS Computer Science student at Air University, Islamabad, Pakistan. He is currently a Product Engineer at The Noble Platforms, an Air University AUBIC startup, and has interned with the Askari Bank AI Team, INARA Technologies and National CERT Pakistan. He builds Generative AI, LLM, RAG and automation systems.',
  },
  {
    question: 'Which university does Ahmed Raza attend?',
    answer:
      'Ahmed Raza is studying for a BS in Computer Science at Air University, Islamabad (2023–2027). Before that he completed his ICS at Punjab College of Science, Islamabad.',
  },
  {
    question: 'What has Ahmed Raza built?',
    answer:
      'At The Noble Platforms he builds the startup’s websites, backend services and AI chatbots end-to-end. At the Askari Bank AI Team he automated regulatory monitoring across 80–100+ websites and 50,000+ documents, cutting a 32-hour weekly workflow to about 10 minutes, and built invoice data extraction (~40 fields into SQL) and call-sentiment classification. Other work includes Aura AI, a RAG customer-support agent at INARA Technologies; AegisOne, a machine-learning phishing detector for Outlook; and Resumify, a Flutter AI résumé builder.',
  },
  {
    question: "What is Ahmed Raza's tech stack?",
    answer:
      'Python (Scikit-learn, Flask, Selenium), LLMs and RAG pipelines, NLP, TypeScript, React and Next.js, Flutter and Dart, and SQL Server and PostgreSQL. He is certified by IBM in Python for Data Science & AI and by Microsoft in Foundations of AI and Machine Learning.',
  },
  {
    question: 'Is Ahmed Raza available for roles or projects?',
    answer:
      'Yes. He is open to AI/ML and software engineering roles and internships, on-site in Islamabad or remote, and takes on freelance projects. He is based in Pakistan (UTC+5).',
  },
  {
    question: 'How can I contact Ahmed Raza?',
    answer:
      'Email araza2125012.pgc@gmail.com, message him on LinkedIn (linkedin.com/in/ahmed-r-43b6a1266), or WhatsApp +92 334 5216102.',
  },
];
