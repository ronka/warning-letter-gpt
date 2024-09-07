import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-muted mt-12">
      <div className="container mx-auto px-4 py-8 text-center">
        © {new Date().getFullYear()} התראהGPT. כל הזכויות שמורות.
      </div>
    </footer>
  );
};

export { Footer };
