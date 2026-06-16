// import ChatWidget from "../../components/ChatWidget";

// export const metadata = {
//   title: "Liberty Assistant Embed",
//   description: "Iframe-ready Liberty Assistant widget embed."
// };

// export default function EmbedPage() {
//   return (
//     <main className="min-h-screen bg-transparent">
//       <h1 className="sr-only">Liberty Assistant Embed</h1>
//       <ChatWidget />
//     </main>
//   );
// }


// embed/page.tsx
import ChatWidget from "../../components/ChatWidget";

export const metadata = {
  title: "Liberty Assistant Embed",
  description: "Iframe-ready Liberty Assistant widget embed."
};

export default function EmbedPage() {
  return (
    <main className="min-h-screen bg-transparent">
      {/* Remove or comment out this line */}
      {/* <h1 className="sr-only">Liberty Assistant Embed</h1> */}
      <ChatWidget />
    </main>
  );
}
