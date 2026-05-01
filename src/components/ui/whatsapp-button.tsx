import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "6588900368";
const WHATSAPP_MESSAGE = "Hi, I'd like to learn more about Vibe Makers Academy programmes.";

export function WhatsAppButton() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg hover:bg-[#20BD5A] transition-colors hover:shadow-xl group"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-medium hidden sm:inline group-hover:inline">Chat with us</span>
    </a>
  );
}
