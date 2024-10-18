import { type FormData } from "@/types/FormData";
import { type Letter } from "@/db/schema";
import axios from "axios";

export type GenerateResponse = Letter;

// Service function to send the request
export const generateAsync = async (formData: FormData) => {
  try {
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      const parsedKey = key as keyof FormData;

      if (formData[parsedKey] instanceof FileList) {
        Array.from(formData[parsedKey]).forEach((file) => {
          data.append(`${parsedKey}[]`, file as Blob);
        });
      } else {
        data.append(parsedKey, formData[parsedKey]);
      }
    });

    // Send POST request to the API
    const response = await axios.post("/api/generate", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Return the response data
    return response.data as GenerateResponse;
  } catch (error) {
    // Handle and log errors
    console.error("Error sending request:", error);
    throw error;
  }
};
