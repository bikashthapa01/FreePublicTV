import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | FreePublicTV",
  description:
    "Get in touch with FreePublicTV for inquiries, support, or DMCA requests.",
};
export default function ContactPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-20  text-slate-100 min-h-[57vh]">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">
        For general inquiries, suggestions, or technical support, feel free to
        reach out via email:
      </p>
      <p className="mb-4">
        <a
          href="mailto:freepublictv@hotmail.com"
          className="text-blue-500 underline"
        >
          freepublictv@hotmail.com
        </a>
      </p>
      <p>
        For DMCA takedown requests, please follow the instructions on our{" "}
        <a href="/dmca" className="text-blue-500 underline">
          DMCA page
        </a>
        .
      </p>
    </main>
  );
}
