import {
  UploadSimple,
  Sparkle,
  CheckCircle,
  ArrowRight,
  ClockCountdown,
  FileText,
} from "@phosphor-icons/react/dist/ssr";
import styles from "./page.module.css";
import SubmitPanel from "./components/SubmitPanel";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.mark}>A</span>
          AutoGrade
        </div>
        <nav className={styles.nav}>
          <a href="#how-it-works">How it works</a>
          <a href="#what-it-checks">What it checks</a>
          <a href="/ar">العربية</a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Instant, objective feedback on every assignment.</h1>
            <p>
              Submit your work and get a score with clear written feedback in
              under a minute — no more waiting days for grades.
            </p>
            <a className={styles.cta} href="#how-it-works">
              See how it works
              <ArrowRight size={18} weight="bold" />
            </a>
          </div>
          <SubmitPanel locale="en" />
        </section>

        <section id="how-it-works" className={styles.section}>
          <h2>How it works</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.iconCircle}>
                <UploadSimple size={20} weight="bold" />
              </span>
              <h3>Upload</h3>
              <p>Choose a .pdf, .docx, or .txt file before the deadline.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.iconCircle}>
                <FileText size={20} weight="bold" />
              </span>
              <h3>Extract</h3>
              <p>The text of your submission is read automatically.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.iconCircle}>
                <Sparkle size={20} weight="bold" />
              </span>
              <h3>Score</h3>
              <p>Your work is evaluated against a fixed rubric.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.iconCircle}>
                <CheckCircle size={20} weight="bold" />
              </span>
              <h3>Feedback</h3>
              <p>You see your score and comments right away.</p>
            </div>
          </div>
        </section>

        <section id="what-it-checks" className={styles.section}>
          <h2>What it checks</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <span className={styles.iconCircle}>
                <UploadSimple size={20} weight="bold" />
              </span>
              <h3>Assignment Submission</h3>
              <ul>
                <li>Accepts .pdf, .docx, and .txt files</li>
                <li>10MB maximum per file</li>
                <li>Deadline with a grace period</li>
              </ul>
            </div>
            <div className={styles.card}>
              <span className={styles.iconCircle}>
                <Sparkle size={20} weight="bold" />
              </span>
              <h3>Automated Scoring</h3>
              <ul>
                <li>Scored 0–100, consistently</li>
                <li>Written feedback every time</li>
                <li>Unreadable work is never silently guessed</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.notice}>
          <ClockCountdown size={18} weight="bold" />
          Submission is still being built — this page previews how AutoGrade
          will work.
        </section>
      </main>

      <footer className={styles.footer}>AutoGrade — a course project.</footer>
    </div>
  );
}
