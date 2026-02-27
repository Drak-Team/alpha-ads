import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://whatsapp.com/channel/0029VbC0B8W0lwgqZKuScy0T";

const WhatsAppFloat = () => (
  <a
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-24 md:bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(142_71%_45%)] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
    aria-label="Join WhatsApp"
  >
    <MessageCircle className="w-7 h-7 text-[hsl(0_0%_100%)]" />
  </a>
);

export default WhatsAppFloat;
