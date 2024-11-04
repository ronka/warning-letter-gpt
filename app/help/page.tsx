export default function HelpPage() {
  return (
    <div className="max-w-2xl mx-auto p-8 my-8 rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <div className="space-y-4 text-right" dir="rtl">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          זקוק/ה לעזרה?
        </h1>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          נתקלת בבעיות עם השירות, התשלום או כל דבר אחר? ניתן ליצור איתי קשר
          ישירות בכתובת{" "}
          <a
            href="mailto:warninggpt@gmail.com"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 
              underline decoration-2 decoration-blue-600/30 dark:decoration-blue-400/30
              hover:decoration-blue-600 dark:hover:decoration-blue-400 transition-all duration-200
              font-medium"
          >
            warninggpt@gmail.com
          </a>{" "}
          ואחזור אליכם בהקדם האפשרי.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          אנא צרף/י את החשבונית שלך אם את/ה נתקל/ת בבעיות בגישה לרכישה שלך.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-4">
          בברכה,
          <br />
          WarningGPT
        </p>
      </div>
    </div>
  );
}
