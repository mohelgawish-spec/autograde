"use client";

import { useState, type FormEvent } from "react";
import styles from "../page.module.css";

type Locale = "en" | "ar";

const STRINGS: Record<
  Locale,
  {
    submit: string;
    scoring: string;
    tryAnother: string;
    errorPrefix: string;
    scoreSuffix: string;
  }
> = {
  en: {
    submit: "Submit for scoring",
    scoring: "Scoring…",
    tryAnother: "Try another file",
    errorPrefix: "Error:",
    scoreSuffix: "/ 100",
  },
  ar: {
    submit: "أرسل للتقييم",
    scoring: "جارٍ التقييم…",
    tryAnother: "جرّب ملفًا آخر",
    errorPrefix: "خطأ:",
    scoreSuffix: "/ 100",
  },
};

export default function SubmitPanel({ locale }: { locale: Locale }) {
  const t = STRINGS[locale];
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<{ score: number; feedback: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file) return;
    setStatus("loading");
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/submit", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        setResult({ score: data.score, feedback: data.feedback });
        setStatus("done");
      } else {
        setError(data.error?.message || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  function reset() {
    setFile(null);
    setResult(null);
    setError(null);
    setStatus("idle");
  }

  if (status === "done" && result) {
    return (
      <div className={styles.heroVisual}>
        <div className={styles.resultBox}>
          <div className={styles.resultScore}>
            {result.score}
            <span className={styles.resultScoreSuffix}>{t.scoreSuffix}</span>
          </div>
          <p className={styles.resultFeedback}>{result.feedback}</p>
          <button type="button" onClick={reset} className={styles.cta}>
            {t.tryAnother}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.heroVisual} ${styles.submitForm}`}>
      <input
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className={styles.fileInput}
      />
      {error && (
        <p className={styles.formError}>
          {t.errorPrefix} {error}
        </p>
      )}
      <button type="submit" disabled={!file || status === "loading"} className={styles.cta}>
        {status === "loading" ? t.scoring : t.submit}
      </button>
    </form>
  );
}
