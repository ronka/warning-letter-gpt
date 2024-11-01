export const ERROR_MESSAGES = {
  INSUFFICIENT_CREDITS: "Insufficient credits",
  DEFAULT: "Invalid request or server error",
} as const;

export const ERROR_MESSAGES_HEBREW = {
  [ERROR_MESSAGES.INSUFFICIENT_CREDITS]: "אין לך מספיק קרדיטים ליצירת מכתב חדש",
  DEFAULT: "אירעה שגיאה ביצירת המכתב. אנא נסה שוב.",
} as const;
