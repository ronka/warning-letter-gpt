import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-muted print-hide">
      <div className="container mx-auto px-4 py-8 text-center">
        © {new Date().getFullYear()} WarningGPT. כל הזכויות שמורות.
      </div>
    </footer>
  );
};

export { Footer };
