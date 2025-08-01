"use client";
import { useState } from "react";
import RetirementForm from "@/app/components/planForm";

function ChatPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "¡Hola! ¿En qué puedo ayudarte?" },
  ]);
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      // { sender: "user", text: input }, // Disabled until next sprint
      { sender: "bot", text: "Proximamente, Jero para ayudarte" }, // Hardcoded bot response
    ]);
    setInput("");
  }

  if (!open) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-80 max-w-full flex flex-col border border-gray-200 animate-fade-in">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 rounded-t-2xl bg-gradient-to-r from-blue-600 to-blue-400">
          <h2 className="text-lg font-bold text-white">Chat con el Bot</h2>
          <button
            className="text-white text-xl hover:text-gray-200 transition"
            onClick={onClose}
            title="Cerrar"
          >
            ×
          </button>
        </div>
        <div
          className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50"
          style={{ minHeight: 200, maxHeight: 320 }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={
                msg.sender === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              <span
                className={
                  msg.sender === "user"
                    ? "inline-block bg-blue-500 text-white rounded-lg px-3 py-1 text-sm shadow"
                    : "inline-block bg-gray-200 text-gray-800 rounded-lg px-3 py-1 text-sm shadow"
                }
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-2 p-3 border-t border-gray-100 bg-white rounded-b-2xl">
          <input
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Escribe tu mensaje..."
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
            onClick={handleSend}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PlanRetiroPageWrapper({ userId }: { userId: string }) {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <main className="min-h-screen relative">
      <div className="flex justify-end p-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          onClick={() => setChatOpen(true)}
        >
          Chat con el Bot
        </button>
      </div>
      <RetirementForm userId={userId} />
      <ChatPopup open={chatOpen} onClose={() => setChatOpen(false)} />
    </main>
  );
}

// Animación fade-in para el popup
// Agrega esto a tu CSS global si quieres animación:
// .animate-fade-in { animation: fadeIn 0.2s ease; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none;} }
