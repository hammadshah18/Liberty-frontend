import ChatWidget from "../components/ChatWidget";

export default function Page() {
  return (
    <main className="min-h-screen bg-brand-radial">
      <h1 className="sr-only">Liberty Assistant</h1>
      <ChatWidget />
    </main>
  );
}
