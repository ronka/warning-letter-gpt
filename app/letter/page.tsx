import { CreateForm } from "@/components/letter/CreateForm";

export default function Letters() {
  return (
    <>
      <div className="text-center  mb-10">
        <h1 className="text-2xl font-bold">
          יצירת מכתב התראה מעולם לא הייתה פשוטה יותר
        </h1>
        <h3>
          מלאו את השדות הבאים וניצור עבורכם מכתב התראה מותאם אישית תוך דקות. כל
          מה שנשאר לכם לעשות הוא לשלוח אותו!
        </h3>
      </div>
      <CreateForm />
    </>
  );
}
