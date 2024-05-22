"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { useForm, Controller, useController } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Grid } from "./layout/Grid";

const FileUpload = () => {
  const { control, setValue } = useForm();
  const [selectedFiles, setSelectedFiles] = useState<Array<File>>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    setValue("file", files);
  };

  return (
    <FormField
      control={control}
      name="file"
      render={({ field }) => {
        return (
          <FormItem>
            <Grid>
              <div>
                <FormLabel>ראיות</FormLabel>
                <FormDescription>
                  הוסיפו כמה שיותר צילומי מסך מהמקרה
                </FormDescription>
              </div>
              <FormControl>
                <Input
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple
                  onChange={handleFileChange}
                />
              </FormControl>
            </Grid>
            <div>
              {selectedFiles.map((file, index) => (
                <div key={index} className="m-1 inline-block">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`uploaded-${index}`}
                    className="w-32 h-32 object-cover"
                  />
                </div>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export { FileUpload };
