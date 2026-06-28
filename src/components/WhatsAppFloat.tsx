import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/923111222482?text=Hi%20Hibba%20Trading%2C%20I%20have%20a%20question"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-soft transition hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
