import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  Bars3Icon,
  BanknotesIcon,
  BoltIcon,
  ChartBarIcon,
  CheckBadgeIcon,
  CpuChipIcon,
  DocumentChartBarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  GlobeAltIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  SparklesIcon,
  UserGroupIcon,
  XMarkIcon,
  FingerPrintIcon,
  DevicePhoneMobileIcon,
  ScaleIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import {
  FaBitcoin,
  FaDollarSign,
  FaEuroSign,
  FaPoundSign,
  FaYenSign,
} from "react-icons/fa";

/* ----------------------------- Motion ----------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const modalBackdrop = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.16 } },
};

const modalPanel = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.24, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.985,
    transition: { duration: 0.16, ease: "easeIn" },
  },
};

/* ----------------------------- Data ----------------------------- */

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "engine", label: "Engine" },
  { id: "decisioning", label: "Decisioning" },
  { id: "outcomes", label: "Outcomes" },
  { id: "trust", label: "Trust" },
];

// Enhanced capabilities with fraud & loss prevention focus
const capabilityCards = [
  {
    icon: CpuChipIcon,
    title: "Hybrid fraud decisioning",
    copy:
      "Aegisra combines classical ML, quantum-inspired simulation, and ledger-behavior intelligence to stop suspicious transactions before funds leave the system.",
  },
  {
    icon: ChartBarIcon,
    title: "Real-time scoring for live payment flows",
    copy:
      "Millisecond scoring supports approval, step-up, review, or block actions in high-volume banking, fintech, and payment environments.",
  },
  {
    icon: DocumentTextIcon,
    title: "Explainable outcomes for risk and compliance",
    copy:
      "Every decision is paired with reason codes, evidence trails, and defensible analyst context to reduce black-box risk.",
  },
  {
    icon: CreditCardIcon,
    title: "Chargebacks & dispute intelligence",
    copy:
      "Proactively detect patterns that lead to chargebacks, flag high-risk disputes, and provide evidence packs for representment.",
  },
  {
    icon: ScaleIcon,
    title: "AML compliance & adaptive verification",
    copy:
      "Integrate AML screening, sanctions lists, and PEP checks. Dynamically trigger step-up challenges (2FA, biometrics) based on risk and behavior.",
  },
  {
    icon: FingerPrintIcon,
    title: "Device & behavioral fingerprinting",
    copy:
      "Identify devices, analyze typing cadence, mouse movements, and session context to detect bots, account takeover, and synthetic identities.",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "Velocity & network intelligence",
    copy:
      "Monitor transaction velocity, linked accounts, and peer groups to uncover coordinated fraud rings and mule activity.",
  },
];

const engineCards = [
  {
    title: "Classical ML",
    tag: "Fast, proven, deployable",
    border: "border-blue-500/70",
    glow: "from-blue-500/20 to-sky-400/5",
    copy:
      "Learns from large transaction histories to catch recurring fraud patterns with strong baseline accuracy and production-ready latency.",
  },
  {
    title: "Quantum-inspired simulation",
    tag: "Rare-pattern detection edge",
    border: "border-emerald-400/70",
    glow: "from-emerald-400/20 to-lime-300/5",
    copy:
      "Uses advanced simulation logic to surface hidden relationships and uncommon attack behaviors that standard models can miss.",
  },
  {
    title: "Ledger + behavior intelligence",
    tag: "Context beyond the transaction",
    border: "border-red-400/70",
    glow: "from-red-500/20 to-rose-400/5",
    copy:
      "Adds device, velocity, linked entity, and user behavior signals to identify coordinated abuse, account takeover, and network fraud.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Signal intake",
    copy:
      "Transaction, device, behavioral, and ledger-linked events are ingested with limited-scope operational connectivity.",
    icon: BoltIcon,
  },
  {
    step: "02",
    title: "Fusion decisioning",
    copy:
      "All three engines contribute to a weighted decision, then Aegisra routes the case to approve, review, step-up, or block.",
    icon: SparklesIcon,
  },
  {
    step: "03",
    title: "Explanation + audit",
    copy:
      "Teams receive clear decision logic, evidence context, and exportable receipts for internal governance and regulator-facing reviews.",
    icon: CheckBadgeIcon,
  },
];

const clientRows = [
  {
    title: "Banks",
    icon: BanknotesIcon,
    copy:
      "Reduce fraud loss and manual review pressure while improving traceability for regulated financial operations.",
  },
  {
    title: "Fintechs",
    icon: GlobeAltIcon,
    copy:
      "Introduce stronger fraud controls without replacing the full existing stack, using a modular intelligence layer.",
  },
  {
    title: "Payment processors",
    icon: ShieldExclamationIcon,
    copy:
      "Improve fraud & risk posture across high-velocity flows, merchant exposure, and fraud escalation paths.",
  },
  {
    title: "Compliance + audit teams",
    icon: DocumentChartBarIcon,
    copy:
      "Access reason codes, investigation trails, and evidence-ready reporting aligned with strict governance expectations.",
  },
];

const outcomes = [
  {
    icon: BanknotesIcon,
    title: "For CFOs",
    points: [
      "25–35% lower fraud loss exposure",
      "Multi-million annual savings potential",
      "Clear ROI case tied to preventable loss reduction",
    ],
  },
  {
    icon: UserGroupIcon,
    title: "For risk teams",
    points: [
      "50% fewer manual reviews",
      "75% faster case resolution",
      "Smarter queues with clearer escalation logic",
    ],
  },
  {
    icon: ShieldCheckIcon,
    title: "For compliance",
    points: [
      "Audit-ready evidence output",
      "Explainable decisions, not black-box flags",
      "Better reporting readiness for regulated environments",
    ],
  },
];

const trustBadges = [
  "Explainable AI with reason codes",
  "Deployable in-region for sovereign requirements",
  "Built for banks, fintechs, PSPs, and regulated payment environments",
  "Designed to support SAMA / DFSA-style operational expectations",
];

/* ---------------------- Floating Currency Background (100 icons) ---------------------- */

const FloatingCurrencyIcons = () => {
  const icons = useMemo(() => {
    const symbols = [FaDollarSign, FaEuroSign, FaPoundSign, FaYenSign,FaDollarSign, FaEuroSign, FaDollarSign];
    return Array.from({ length: 100 }, (_, i) => {
      const Symbol = symbols[i % symbols.length];
      const danger = i % 7 === 0 || i % 11 === 0; // 15-20% red icons
      return {
        id: i,
        Symbol,
        color: danger ? "text-red-400/30" : i % 3 === 0 ? "text-emerald-300/20" : "text-white/18",
        top: `${4 + ((i * 3) % 88)}%`, // distribute top positions
        delay: i * 0.15,
        duration: 18 + (i % 10) * 2,
        size: 16 + (i % 7) * 8,
      };
    });
  }, []);

  const linkLines = useMemo(
    () => [
      { top: "17%", left: "8%", width: "32%", delay: 0.1 },
      { top: "31%", left: "44%", width: "24%", delay: 0.35 },
      { top: "49%", left: "18%", width: "42%", delay: 0.55 },
      { top: "68%", left: "52%", width: "22%", delay: 0.8 },
      { top: "82%", left: "14%", width: "36%", delay: 1.05 },
      { top: "23%", left: "72%", width: "18%", delay: 1.3 },
      { top: "55%", left: "5%", width: "28%", delay: 1.6 },
      { top: "77%", left: "38%", width: "34%", delay: 1.9 },
    ],
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_24%),radial-gradient(circle_at_bottom,rgba(239,68,68,0.14),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:84px_84px]" />

      {linkLines.map((line, idx) => (
        <motion.div
          key={idx}
          className="absolute h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent"
          style={{ top: line.top, left: line.left, width: line.width }}
          animate={{ opacity: [0.2, 0.9, 0.2], scaleX: [0.95, 1.04, 0.95] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: line.delay,
          }}
        />
      ))}

      {icons.map((icon, idx) => (
        <motion.div
          key={icon.id}
          className={`absolute ${icon.color}`}
          style={{
            top: icon.top,
            left: "-8%",
            fontSize: icon.size,
            filter: "drop-shadow(0 0 18px rgba(255,255,255,0.08))",
          }}
          animate={{
            x: ["0vw", "112vw"],
            y: [0, idx % 2 === 0 ? -10 : 10, 0],
            opacity: [0.12, 0.34, 0.12],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: icon.duration,
            repeat: Infinity,
            ease: "linear",
            delay: icon.delay,
          }}
        >
          <icon.Symbol />
        </motion.div>
      ))}

      <div className="absolute left-[-8%] top-[8%] h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute right-[-10%] top-[16%] h-96 w-96 rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="absolute bottom-[-12%] left-[18%] h-80 w-80 rounded-full bg-red-500/12 blur-3xl" />
    </div>
  );
};

/* ----------------------------- UI Helpers ----------------------------- */

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          variants={modalBackdrop}
          initial="hidden"
          animate="show"
          exit="exit"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />
          <motion.div
            variants={modalPanel}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-xl font-bold text-slate-900">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

const NavLink = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="text-sm font-semibold text-slate-300 transition hover:text-white"
  >
    {children}
  </button>
);

const SectionHeading = ({ eyebrow, title, copy, center = false }) => (
  <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
    <div className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-300/80">
      {eyebrow}
    </div>
    <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
      {title}
    </h2>
    <p className="mt-4 text-base leading-8 text-slate-300 md:text-lg">{copy}</p>
  </div>
);

const GlassCard = ({ className = "", children }) => (
  <div
    className={[
      "rounded-[28px] border border-white/10 bg-white/[0.05] backdrop-blur-xl",
      "shadow-[0_20px_60px_rgba(2,6,23,0.28)]",
      className,
    ].join(" ")}
  >
    {children}
  </div>
);

/* ----------------------------- Main App ----------------------------- */

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [legalModal, setLegalModal] = useState({ open: false, type: "" });

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06111f] text-white">
      <FloatingCurrencyIcons />

      {/* ----------------------------- Navbar ----------------------------- */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="flex items-center gap-3 py-4"
>
  <img
    src="https://res.cloudinary.com/dvcmopd4q/image/upload/v1773158219/f0ec848f-8120-4387-be7d-4f071eee85b4_nosztr.png"
    alt="Aegisra Logo"
    className="h-12 w-40 bg-white/80 object-contain rounded-2xl border border-white/10 shadow-[0_10px_40px_rgba(59,130,246,0.35)]"
  />
  <div className="text-left px-2">
    
    <div className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
      Fraud Intelligence Layer
    </div>
  </div>
</button>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.id} onClick={() => scrollTo(item.id)}>
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={() => setContactModalOpen(true)}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
            >
              Contact
            </button>
          </div>

          <button
            className="rounded-xl border border-white/10 p-2 text-slate-200 md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* ----------------------------- Mobile Menu ----------------------------- */}
      <Modal
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Aegisra Navigation"
      >
        <div className="space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left font-medium text-slate-700 transition hover:bg-slate-50"
            >
              {item.label}
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setContactModalOpen(true);
            }}
            className="mt-2 w-full rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Contact Aegisra
          </button>
        </div>
      </Modal>

      {/* ----------------------------- Contact Modal ----------------------------- */}
      <Modal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        title="Contact Aegisra"
      >
        <div className="space-y-4 text-slate-700">
          <p className="text-sm leading-7">
            For pilots, banking partnerships, fraud operations reviews, and
            regulated deployment discussions:
          </p>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Email
            </div>
            <a
              href="mailto:admin@getaegisra.com"
              className="mt-1 block text-base font-semibold text-blue-700 hover:underline"
            >
              admin@getaegisra.com
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Website
            </div>
            <a
              href="#"
              className="mt-1 block text-base font-semibold text-blue-700 hover:underline"
            >
              getaegisra.com
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              LinkedIn
            </div>
            <a
              href="#"
              className="mt-1 block text-base font-semibold text-blue-700 hover:underline"
            >
              linkedin.com/company/aegisra
            </a>
          </div>
        </div>
      </Modal>

      {/* ----------------------------- Legal Modal ----------------------------- */}
      <Modal
        isOpen={legalModal.open}
        onClose={() => setLegalModal({ open: false, type: "" })}
        title={legalModal.type}
      >
        <div className="text-sm leading-7 text-slate-600">
          {legalModal.type === "Privacy" && (
            <p>
              Placeholder privacy text. 
            </p>
          )}
          {legalModal.type === "Terms" && (
            <p>
              Placeholder terms text. 
            </p>
          )}
        </div>
      </Modal>

      {/* ----------------------------- Hero ----------------------------- */}
      <section
        id="overview"
        className="relative z-10 flex min-h-[96vh] items-center"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-7"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-200"
            >
              <ShieldExclamationIcon className="h-4 w-4" />
              Fraud & Loss prevention Intelligence with  risk and compliance decisioning
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-8 max-w-3xl text-2xl font-bold tracking-tight text-white md:text-4xl xl:text-5xl"
            >
            Fraud & loss prevention intelligence for financial institutions.
          <span className="block bg-gradient-to-r from-blue-300 via-white to-emerald-300 bg-clip-text text-transparent">
          Real-time fraud & risk prevention, risk decisioning, and explainable compliance for financial institutions.              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl"
            >
              Aegisra gives teams earlier visibility into fraud risk, loss exposure, and suspicious transaction patterns — with clearer signals, stronger decision support, and audit-ready explanations before funds move.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
           <button
              onClick={() => window.open('https://calendly.com/salahzakaria/30min', '_blank')}
              className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Request a pilot
            </button>
              <button
                onClick={() => setContactModalOpen(true)}
                className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.09]"
              >
                Speak with Aegisra
              </button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 grid gap-4 sm:grid-cols-3"
            >
              {[
                "96–98% ensemble target accuracy",
                "Explainable reason codes and audit trails",
                "Deployable in-region for sovereign workflows",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <GlassCard className="overflow-hidden p-0">
              <div className="border-b border-white/10 px-6 py-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200/80">
                      live decision fabric
                    </div>
                    <div className="mt-2 text-2xl font-bold text-white">
                      3 brains → 1 defensible action
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                    <EyeIcon className="h-7 w-7 text-emerald-300" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-6">
                {[
                  {
                    title: "Classical ML",
                    desc: "Catches recurring fraud patterns in milliseconds.",
                    color: "bg-blue-400",
                  },
                  {
                    title: "Quantum-inspired simulation",
                    desc: "Finds hidden and rare-pattern relationships.",
                    color: "bg-emerald-400",
                  },
                  {
                    title: "Ledger + behavior",
                    desc: "Tracks velocity, links, and suspicious behavior.",
                    color: "bg-red-400",
                  },
                ].map((row) => (
                  <div
                    key={row.title}
                    className="rounded-2xl border border-white/10 bg-slate-950/30 p-4"
                  >
                    <div className="flex items-start gap-4">
                      <span className={`mt-1 h-3 w-3 rounded-full ${row.color}`} />
                      <div>
                        <div className="text-base font-semibold text-white">
                          {row.title}
                        </div>
                        <div className="mt-1 text-sm leading-7 text-slate-300">
                          {row.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-400/[0.06] p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-200/70">
                    Decision output
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {["Approve", "Review", "Step-up", "Block"].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm font-semibold text-white"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------- Capabilities ----------------------------- */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <motion.div variants={fadeUp}>
          <SectionHeading
            eyebrow="Core capabilities"
            title="Complete fraud & loss prevention suite — from pre‑payment scoring to chargeback defense"
            copy="Aegisra delivers a comprehensive set of fraud-fighting capabilities: real-time decisioning, AML integration, device intelligence, behavioral biometrics, and dispute management — all wrapped in explainable, audit-ready outputs."
          />
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilityCards.map((item) => (
            <motion.div key={item.title} variants={fadeUp}>
              <GlassCard className="h-full p-7">
                <item.icon className="h-11 w-11 text-blue-300" />
                <h3 className="mt-5 text-2xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-slate-300">
                  {item.copy}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ----------------------------- Engine ----------------------------- */}
      <motion.section
        id="engine"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        variants={stagger}
        className="relative z-10 border-y border-white/10 bg-white/[0.03]"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp}>
            <SectionHeading
              eyebrow="The engine"
              title="Three specialized systems fused into one stronger fraud decision"
              copy="Most fraud systems rely on one dominant logic path. Aegisra is designed to layer speed, hidden-pattern discovery, and behavior-led context into a more resilient decision architecture."
            />
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {engineCards.map((item) => (
              <motion.div key={item.title} variants={fadeUp}>
                <div
                  className={`h-full rounded-[30px] border ${item.border} bg-gradient-to-b ${item.glow} to-white/[0.03] p-7 backdrop-blur-xl`}
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
                    {item.tag}
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-300">
                    {item.copy}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-10">
            <GlassCard className="p-7">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200/70">
                    Possibility tree
                  </div>
                  <div className="mt-2 text-2xl font-bold text-white">
                    16+ modeled outcomes per transaction
                  </div>
                </div>
                <div className="max-w-2xl text-base leading-8 text-slate-300">
                  Instead of reacting only to known fraud signatures, Aegisra
                  helps institutions anticipate what could happen next and act
                  before losses compound.
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </motion.section>

      {/* ----------------------------- Decisioning ----------------------------- */}
      <motion.section
        id="decisioning"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        variants={stagger}
        className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <motion.div variants={fadeUp}>
          <SectionHeading
            eyebrow="Decisioning flow"
            title="From signal intake to analyst action to audit-ready evidence"
            copy="The product experience is built to make sense to buyers, operators, and regulators. Aegisra turns technical fraud scoring into a clear operating system for action."
          />
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {workflowSteps.map((item) => (
            <motion.div key={item.step} variants={fadeUp}>
              <GlassCard className="h-full p-7">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-200/80">
                    {item.step}
                  </div>
                  <item.icon className="h-8 w-8 text-emerald-300" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-slate-300">
                  {item.copy}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.15 }}
      className="lg:col-span-5"
    >
      <GlassCard className="overflow-hidden p-0">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200/80">
                live decision fabric
              </div>
              <div className="mt-2 text-2xl font-bold text-white">
                3 brains → 1 defensible action
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
              <EyeIcon className="h-7 w-7 text-emerald-300" />
            </div>
          </div>
        </div>

        <div className="space-y-4 p-6">
          {[
            {
              title: "Classical ML",
              desc: "Catches recurring fraud patterns in milliseconds.",
              color: "bg-blue-400",
            },
            {
              title: "Quantum-inspired simulation",
              desc: "Finds hidden and rare-pattern relationships.",
              color: "bg-emerald-400",
            },
            {
              title: "Ledger + behavior",
              desc: "Tracks velocity, links, and suspicious behavior.",
              color: "bg-red-400",
            },
          ].map((row) => (
            <div
              key={row.title}
              className="rounded-2xl border border-white/10 bg-slate-950/30 p-4"
            >
              <div className="flex items-start gap-4">
                <span className={`mt-1 h-3 w-3 rounded-full ${row.color}`} />
                <div>
                  <div className="text-base font-semibold text-white">
                    {row.title}
                  </div>
                  <div className="mt-1 text-sm leading-7 text-slate-300">
                    {row.desc}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-400/[0.06] p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-200/70">
              Decision output
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {["Approve", "Review", "Step-up", "Block"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>

        <motion.div variants={fadeUp} className="mt-12 grid gap-6 lg:grid-cols-4">
          {["Approve", "Review", "Step-up 2FA", "Block"].map((item, idx) => (
            <div
              key={item}
              className={`rounded-[24px] border p-5 text-center ${
                idx === 0
                  ? "border-emerald-400/30 bg-emerald-400/[0.06]"
                  : idx === 1
                  ? "border-blue-400/30 bg-blue-400/[0.06]"
                  : idx === 2
                  ? "border-white/15 bg-white/[0.04]"
                  : "border-red-400/30 bg-red-400/[0.06]"
              }`}
            >
              <div className="text-sm font-semibold text-white">{item}</div>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* ----------------------------- Client Fit ----------------------------- */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="relative z-10 border-y border-white/10 bg-white/[0.03]"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp}>
            <SectionHeading
              eyebrow="Who it serves"
              title="Built for clients and partners who cannot afford slow, opaque, or purely reactive fraud infrastructure"
              copy="Aegisra is shaped for institutions that need both technical strength and decision transparency across modern financial workflows."
            />
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {clientRows.map((item) => (
              <motion.div key={item.title} variants={fadeUp}>
                <GlassCard className="h-full p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                      <item.icon className="h-7 w-7 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-base leading-8 text-slate-300">
                        {item.copy}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ----------------------------- Outcomes ----------------------------- */}
      <motion.section
        id="outcomes"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <motion.div variants={fadeUp}>
          <SectionHeading
            eyebrow="Business outcomes"
            title="The value is measurable in loss prevention, analyst efficiency, and governance confidence"
            copy="This is the business case clients and partners need to understand clearly: Aegisra protects money, reduces operational drag, and improves the institution’s ability to explain each decision."
            center
          />
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {outcomes.map((item) => (
            <motion.div key={item.title} variants={fadeUp}>
              <GlassCard className="h-full p-7">
                <item.icon className="h-10 w-10 text-emerald-300" />
                <h3 className="mt-5 text-2xl font-bold text-white">
                  {item.title}
                </h3>
                <div className="mt-5 space-y-3">
                  {item.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3"
                    >
                      <CheckBadgeIcon className="mt-0.5 h-5 w-5 text-blue-300" />
                      <span className="text-sm leading-7 text-slate-300">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ----------------------------- Trust ----------------------------- */}
      <motion.section
        id="trust"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="relative z-10 border-t border-white/10 bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-400/10"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.95fr,1.05fr] lg:px-8">
          <motion.div variants={fadeUp}>
            <SectionHeading
              eyebrow="Trust and deployment"
              title="A fraud system is only valuable if institutions can govern it"
              copy="Aegisra is positioned for regulated financial settings where deployment location, explainability, and operational accountability all matter as much as model performance."
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <GlassCard className="p-7">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200/70">
                Trust signals
              </div>
              <div className="mt-6 space-y-4">
                {trustBadges.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <LockClosedIcon className="mt-0.5 h-5 w-5 text-emerald-300" />
                    <p className="text-sm leading-7 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>

            
            </GlassCard>
          </motion.div>
        </div>
      </motion.section>

      {/* ----------------------------- Footer ----------------------------- */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
            <img
    src="https://res.cloudinary.com/dvcmopd4q/image/upload/v1773158219/f0ec848f-8120-4387-be7d-4f071eee85b4_nosztr.png"
    alt="Aegisra Logo"
    className="h-12 w-40 bg-white/80 object-contain rounded-2xl border border-white/10 shadow-[0_10px_40px_rgba(59,130,246,0.35)]"
  />              <p className="mt-2 text-sm leading-7 text-slate-400">
                Real-time fraud & risk prevention and compliance decisioning for
                financial institutions, fintechs, and payment infrastructure.
              </p>
            </div>

            <div className="flex flex-wrap gap-5">
              <button
                onClick={() => setLegalModal({ open: true, type: "Privacy" })}
                className="text-sm font-medium text-slate-400 transition hover:text-white"
              >
                Privacy
              </button>
              <button
                onClick={() => setLegalModal({ open: true, type: "Terms" })}
                className="text-sm font-medium text-slate-400 transition hover:text-white"
              >
                Terms
              </button>
              <button
                onClick={() => setContactModalOpen(true)}
                className="text-sm font-medium text-slate-400 transition hover:text-white"
              >
                Contact
              </button>
            </div>
          </div>

          <div className="mt-8 text-xs text-slate-500">
            © 2026 Aegisra. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}