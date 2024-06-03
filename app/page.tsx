import { CreateForm } from "@/components/CreateForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <main className="flex min-h-screen flex-col items-center w-full p-24">
        <h1>תשחרר את ראבי. יצירת מכתבי התראה</h1>
        <CreateForm />
      </main>
    </div>
  );
}
