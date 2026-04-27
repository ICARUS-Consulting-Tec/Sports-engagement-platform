import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const NAV = "#002244";
export const ACCENT = "#4B92DB";

export const CATEGORIES = [
  "General Feedback",
  "Bug Report",
  "Feature Request",
  "Match Room",
  "Team Cards / Packs",
  "Store",
  "News",
  "Profile",
  "Community",
  "Other",
];

export const MAX_MESSAGE_LENGTH = 1500;
export const MAX_IMAGES = 5;
export const ACCEPTED_TYPES = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

export interface FormState {
  category: string;
  subject: string;
  message: string;
  images: File[];
}

export interface FormErrors {
  category?: string;
  subject?: string;
  message?: string;
}

export const EMPTY_FORM: FormState = {
  category: "",
  subject: "",
  message: "",
  images: [],
};

function validateForm(form: FormState): FormErrors {
  const nextErrors: FormErrors = {};

  if (!form.category) nextErrors.category = "Please select a category.";
  if (!form.subject.trim()) nextErrors.subject = "Subject is required.";
  if (!form.message.trim()) nextErrors.message = "Message is required.";

  return nextErrors;
}

export function useFeedbackDrawer() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        handleClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleClose, open]);

  const previews = useMemo(
    () => form.images.map((image) => URL.createObjectURL(image)),
    [form.images],
  );

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  const resetForm = useCallback(() => {
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDone = useCallback(() => {
    resetForm();
    setOpen(false);
  }, [resetForm]);

  const setField = useCallback((field: "category" | "subject" | "message", value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const addImages = useCallback((files: FileList | null) => {
    if (!files) return;

    const validImages = Array.from(files).filter((file) => ACCEPTED_TYPES.includes(file.type));

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...validImages].slice(0, MAX_IMAGES),
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const removeImage = useCallback((index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, imageIndex) => imageIndex !== index),
    }));
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }, [form]);

  return {
    open,
    submitted,
    form,
    errors,
    previews,
    fileInputRef,
    handleOpen,
    handleClose,
    handleDone,
    setField,
    addImages,
    removeImage,
    handleSubmit,
  };
}

export function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function SuccessState({ onDone }: { onDone: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: `${ACCENT}20` }}
      >
        <CheckIcon className="h-8 w-8" style={{ color: ACCENT }} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900">
          Thanks for your feedback!
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Your suggestion has been submitted for review.
        </p>
      </div>
      <button
        onClick={onDone}
        className="mt-4 w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none"
        style={{ backgroundColor: NAV }}
      >
        Done
      </button>
    </div>
  );
}

export function MegaphoneIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06ZM15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.061Z" />
    </svg>
  );
}

export function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function XSmallIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  );
}

export function UploadIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}

export function InfoIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function CheckIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
