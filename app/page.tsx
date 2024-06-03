import { CreateForm } from "@/components/CreateForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="mb-32 grid text-center">
          <h1>תשחרר את ראבי. יצירת מכתבי התראה</h1>
          <CreateForm />
        </div>
      </main>
    </div>
  );
}
