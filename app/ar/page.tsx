import { Cairo } from "next/font/google";
import {
  UploadSimple,
  Sparkle,
  CheckCircle,
  ArrowLeft,
  ClockCountdown,
  FileText,
} from "@phosphor-icons/react/dist/ssr";
import styles from "../page.module.css";
import SubmitPanel from "../components/SubmitPanel";

const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["400", "600", "700"] });

export const metadata = {
  title: "AutoGrade — ملاحظات فورية على الواجبات",
  description:
    "أرسل واجبك واحصل على درجة موضوعية مع ملاحظات مكتوبة في أقل من دقيقة.",
};

export default function HomeArabic() {
  return (
    <div dir="rtl" lang="ar" className={`${styles.page} ${cairo.className}`}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.mark}>A</span>
          AutoGrade
        </div>
        <nav className={styles.nav}>
          <a href="#how-it-works">كيف يعمل</a>
          <a href="#what-it-checks">ما الذي يتم فحصه</a>
          <a href="/">English</a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>ملاحظات فورية وموضوعية على كل واجب.</h1>
            <p>
              أرسل عملك واحصل على درجة مع ملاحظات مكتوبة واضحة في أقل من
              دقيقة — دون انتظار أيام للحصول على النتيجة.
            </p>
            <a className={styles.cta} href="#how-it-works">
              شاهد كيف يعمل
              <ArrowLeft size={18} weight="bold" />
            </a>
          </div>
          <SubmitPanel locale="ar" />
        </section>

        <section id="how-it-works" className={styles.section}>
          <h2>كيف يعمل</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.iconCircle}>
                <UploadSimple size={20} weight="bold" />
              </span>
              <h3>الرفع</h3>
              <p>اختر ملف ‎.pdf أو ‎.docx أو ‎.txt قبل الموعد النهائي.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.iconCircle}>
                <FileText size={20} weight="bold" />
              </span>
              <h3>الاستخراج</h3>
              <p>يتم قراءة نص الملف المُرسل تلقائيًا.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.iconCircle}>
                <Sparkle size={20} weight="bold" />
              </span>
              <h3>التقييم</h3>
              <p>يتم تقييم عملك وفق معايير ثابتة.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.iconCircle}>
                <CheckCircle size={20} weight="bold" />
              </span>
              <h3>الملاحظات</h3>
              <p>تشاهد درجتك وملاحظاتك فورًا.</p>
            </div>
          </div>
        </section>

        <section id="what-it-checks" className={styles.section}>
          <h2>ما الذي يتم فحصه</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <span className={styles.iconCircle}>
                <UploadSimple size={20} weight="bold" />
              </span>
              <h3>تسليم الواجب</h3>
              <ul>
                <li>يقبل ملفات ‎.pdf و‎.docx و‎.txt</li>
                <li>بحد أقصى 10 ميجابايت لكل ملف</li>
                <li>موعد نهائي مع فترة سماح</li>
              </ul>
            </div>
            <div className={styles.card}>
              <span className={styles.iconCircle}>
                <Sparkle size={20} weight="bold" />
              </span>
              <h3>التقييم الآلي</h3>
              <ul>
                <li>درجة من 0 إلى 100 بشكل ثابت</li>
                <li>ملاحظات مكتوبة في كل مرة</li>
                <li>لا يتم تخمين النتيجة أبدًا</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.notice}>
          <ClockCountdown size={18} weight="bold" />
          الإرسال لا يزال قيد التطوير — هذه الصفحة تعرض كيف سيعمل AutoGrade.
        </section>
      </main>

      <footer className={styles.footer}>AutoGrade — مشروع دراسي.</footer>
    </div>
  );
}
