import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { BuyButton } from "./BuyButton";

export function PricingTable() {
  return (
    <div dir="rtl" className="w-full p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">בנה את מכתב ההתראה שלך בקלות</h1>
          <p className="text-xl">
            הגן על שמך או על עסקיך מפני לשון הרע ופייק ניוז!
          </p>
        </div>

        <div className="rounded-2xl p-8 grid lg:grid-cols-3 gap-6 relative bg-muted">
          <div>
            <h2 className="text-3xl font-bold mb-6">מה מקבלים?</h2>
            <ul className="space-y-4">
              {[
                "יצירה מהירה תוך דקות",
                "שליטה מלאה והתאמה אישית",
                "שפה משפטית מקצועית",
                "ללא המתנה לעורך דין",
                "שימוש ללא הגבלה",
              ].map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 space-x-reverse"
                >
                  <Check className="text-green-500" size={20} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl p-6 flex flex-col justify-between -m-2  text-center bg-white">
            <div>
              <h3 className="text-2xl font-bold mb-4">יצירת 5 מכתבים</h3>
              <div className="flex items-baseline mb-2 justify-center">
                <span className="line-through text-2xl ml-2">₪40</span>
                <span className="text-6xl font-bold">29</span>
                <span className="text-xl ml-2">₪</span>
              </div>
              <p className="mb-4">תשלום חד פעמי. ללא מנוי</p>
            </div>
            <BuyButton productType="5-credits" />
          </div>

          <div className="flex flex-col justify-between relative rounded-2xl p-8 -m-8 border-2 shadow-xl  text-center  border-orange-500 bg-white">
            <div className="absolute top-0 right-0 text-xs font-bold px-3 py-1 rounded-tr-xl rounded-bl-lg bg-orange-500 text-white">
              הכי משתלם
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">יצירת 20 מכתבים</h3>
              <div className="flex items-baseline mb-2 justify-center">
                <span className="line-through text-2xl ml-2">₪160</span>
                <span className="text-6xl font-bold">69</span>
                <span className="text-xl ml-2">₪</span>
              </div>
              <p className="mb-4">תשלום חד פעמי. ללא מנוי</p>
            </div>
            <BuyButton productType="20-credits" />
          </div>
        </div>
      </div>
    </div>
  );
}
