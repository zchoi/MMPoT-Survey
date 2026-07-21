"use client";

/* eslint-disable @next/next/no-img-element -- static export uses pre-rendered local figures */

import { useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const authors = [
  { name: "Haonan Zhang", affiliations: [1, 2] },
  { name: "Pengpeng Zeng", affiliations: [1], corresponding: true },
  { name: "Libin Cao", affiliations: [1] },
  { name: "Wenrui Lai", affiliations: [1] },
  { name: "Jinlong Li", affiliations: [4, 5] },
  { name: "Duo Peng", affiliations: [1] },
  { name: "Yi Bin", affiliations: [1] },
  { name: "Xuanhan Wang", affiliations: [1] },
  { name: "Ji Zhang", affiliations: [3] },
  { name: "Jingkuan Song", affiliations: [1] },
  { name: "Nicu Sebe", affiliations: [4] },
  { name: "Yuchuan Wu", affiliations: [2] },
  { name: "Yongbin Li", affiliations: [2] },
  { name: "Heng Tao Shen", affiliations: [1] },
  { name: "Jieping Ye", affiliations: [2] },
];

const affiliations = [
  { name: "Tongji University", logo: "/institutions/tongji.png" },
  { name: "Qwen-Character Team, Alibaba Group", logo: "/institutions/qwen.png" },
  { name: "Southwest Jiaotong University", logo: "/institutions/southwest-jiaotong.png" },
  { name: "University of Trento", logo: "/institutions/trento.png" },
  { name: "ETH Zürich", logo: "/institutions/eth-zurich.png" },
];

const familyData = {
  instruction: {
    number: "01",
    tag: "ACTIVATE",
    title: "Instruction Following",
    short: "Turn broad multimodal representations into task-oriented, instruction-responsive behavior.",
    detail:
      "Visual instruction tuning aligns user intent, multimodal context, and model responses in one generative interface—from image dialogue to video, documents, and interleaved inputs.",
    methods: ["Visual SFT", "Data mixtures", "Fine-grained grounding"],
    figures: [
      {
        image: "/figures/instruction-tuning.png",
        alt: "Visual instruction-tuning pipeline for multimodal large language models",
        caption: "Behavior shaping for instruction following through visual-language instruction tuning.",
      },
    ],
  },
  preference: {
    number: "02",
    tag: "CALIBRATE",
    title: "Preference Calibration",
    short: "Favor responses that are helpful, safe, faithful to evidence, and aligned with user intent.",
    detail:
      "Human and AI feedback distinguish preferred responses from weaker alternatives. RLHF, RLAIF, and direct preference optimization refine model policy beyond imitation alone.",
    methods: ["RLHF / RLAIF", "Reward modeling", "DPO"],
    figures: [
      {
        image: "/figures/preference-learning.png",
        alt: "RLHF, RLAIF, and DPO pipelines for multimodal preference calibration",
        caption: "Preference signals can shape policy through learned rewards or direct optimization.",
      },
    ],
  },
  reasoning: {
    number: "03",
    tag: "REASON",
    title: "Reason Enhancement",
    short: "Elicit grounded, structured, multi-step inference across modalities.",
    detail:
      "R1-style reinforcement learning, thinking with images, self-evolution, and distillation move multimodal reasoning from text-only traces toward verifiable visual evidence and tool use.",
    methods: ["RLVR / GRPO", "Thinking with images", "Self-evolution"],
    figures: [
      {
        image: "/figures/r1-thinking-with-images.png",
        alt: "R1-style multimodal reasoning and thinking-with-images training paradigms",
        caption: "Reasoning is shaped with format, accuracy, grounding, and visual tool-use rewards.",
      },
      {
        image: "/figures/self-evolution-opd.png",
        alt: "Self-evolution and online policy distillation for multimodal reasoning",
        caption: "Self-evolution and online policy distillation strengthen multimodal reasoning policies.",
      },
    ],
  },
  domain: {
    number: "04",
    tag: "SPECIALIZE",
    title: "Domain Adaptation",
    short: "Specialize behavior for distinct evidence formats, task protocols, and reliability needs.",
    detail:
      "Domain adaptation jointly considers visual granularity, task interfaces, action spaces, and reliability—from GUI agents and document intelligence to medicine and autonomous driving.",
    methods: ["GUI agents", "Document & medical", "Embodied action"],
    figures: [
      {
        image: "/figures/domain-adaptation.png",
        alt: "Domain adaptation of multimodal models for GUI, medicine, and autonomous driving",
        caption: "Specialized domains require perception, planning, action, and domain-aware feedback.",
      },
    ],
  },
  scalable: {
    number: "05",
    tag: "SCALE",
    title: "Scalable Learning",
    short: "Preserve alignment and reasoning gains while reducing compute and deployment overhead.",
    detail:
      "Parameter-efficient tuning, mixture-of-experts adaptation, token compression, and long-context optimization make multimodal post-training more practical at model and data scale.",
    methods: ["LoRA", "Mixture of experts", "Token compression"],
    figures: [
      {
        image: "/figures/lora-moe.png",
        alt: "Scalable multimodal post-training through LoRA and mixture-of-experts routing",
        caption: "Efficient adaptation combines low-rank tuning with sparse mixture-of-experts routing.",
      },
      {
        image: "/figures/kv-cache.png",
        alt: "Compute-efficient multimodal learning with token compression and KV-cache optimization",
        caption: "Token compression and KV-cache optimization reduce multimodal training and inference costs.",
      },
    ],
  },
} as const;

type FamilyKey = keyof typeof familyData;
const familyKeys = Object.keys(familyData) as FamilyKey[];

const citation = `@article{202607.1494,
  doi = {10.20944/preprints202607.1494.v1},
  url = {https://doi.org/10.20944/preprints202607.1494.v1},
  year = 2026,
  month = {July},
  publisher = {Preprints},
  author = {Haonan Zhang and Pengpeng Zeng and Libin Cao and Wenrui Lai and Jinlong Li and Duo Peng and Yi Bin and Xuanhan Wang and Ji Zhang and Jingkuan Song and Nicu Sebe and Yuchuan Wu and Yongbin Li and Heng Tao Shen and Jieping Ye},
  title = {A Survey on Post-Training of Multimodal Large Language Models},
  journal = {Preprints}
}`;

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [activeFamily, setActiveFamily] = useState<FamilyKey>("instruction");
  const [activeFigure, setActiveFigure] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const family = familyData[activeFamily];

  function selectFamily(key: FamilyKey) {
    setActiveFamily(key);
    setActiveFigure(0);
  }

  async function copyCitation() {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <nav className="site-nav" aria-label="Primary navigation">
        <div className="nav-inner shell">
          <a className="nav-brand" href="#top" aria-label="MMPoT survey — back to top">
            <span className="nav-brand-logo" aria-hidden="true">
              <img src={asset("/mm-pot-logo.png")} alt="" />
            </span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="site-links"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true">{menuOpen ? "×" : "≡"}</span>
          </button>
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`} id="site-links">
            <a href="#overview" onClick={closeMenu}>Overview</a>
            <a href="#taxonomy" onClick={closeMenu}>Taxonomy</a>
            <a href="#evaluation" onClick={closeMenu}>Evaluation</a>
            <a href="#outlook" onClick={closeMenu}>Outlook</a>
            <a className="nav-cta" href="#cite" onClick={closeMenu}>Cite</a>
          </div>
        </div>
      </nav>

      <main id="main-content">
        <header className="hero" id="top">
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />
          <div className="shell hero-layout">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" aria-hidden="true" />
                Survey · 2026 · Living reading list
              </div>
              <h1>
                A Survey on <span>Post-training</span> of Multimodal Large Language Models
              </h1>
              <p className="hero-subtitle">
                A unified behavior-shaping view of how pretrained MLLMs become reliable,
                grounded, and task-oriented multimodal systems.
              </p>

              <div className="author-list" aria-label="Paper authors">
                {authors.map((author) => (
                  <span className="author" key={author.name}>
                    {author.name}
                    <sup>
                      {author.affiliations.join(",")}
                      {author.corresponding ? "*" : ""}
                    </sup>
                  </span>
                ))}
              </div>
              <p className="correspondence">* Corresponding author · is.pengpengzeng@gmail.com</p>

              <div className="affiliations" aria-label="Affiliations">
                {affiliations.map((affiliation, index) => (
                  <span key={affiliation.name}>
                    <sup>{index + 1}</sup>
                    {affiliation.name}
                  </span>
                ))}
              </div>

              <div className="hero-actions">
                <span className="button button-primary button-disabled" aria-disabled="true">
                  Paper · Coming soon
                </span>
                <a
                  className="button button-secondary"
                  href="https://github.com/zchoi/Awesome-Post-Training-for-MLLMs"
                  target="_blank"
                  rel="noreferrer"
                >
                  Awesome list <ArrowIcon />
                </a>
                <a className="text-link" href="#overview">
                  Explore the framework <span aria-hidden="true">↓</span>
                </a>
              </div>

              <div className="institution-logos" aria-label="Affiliated institutions">
                {affiliations.map((affiliation) => (
                  <div className="institution-card" key={affiliation.name}>
                    <div className="institution-logo">
                      <img
                        src={asset(affiliation.logo)}
                        alt={`${affiliation.name} logo`}
                        loading="eager"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <section className="section overview-section" id="overview">
          <div className="shell">
            <div className="section-heading split-heading">
              <div>
                <span className="section-index">01 / OVERVIEW</span>
                <h2>Multimodal Behavior-Shaping Loop</h2>
              </div>
              <p>
                Multimodal pretraining builds broad perception and alignment. Post-training
                determines how those capabilities behave when the evidence is ambiguous, the task
                is complex, or the interaction has real consequences.
              </p>
            </div>

            <figure className="paper-figure framework-figure">
              <img
                src={asset("/figures/intro.png")}
                alt="Overview of multimodal behavior shaping for MLLM post-training"
                loading="eager"
              />
              <figcaption>
                <span>FIG. 01</span>
                Post-training algorithms steer pretrained MLLMs toward desired behaviors, while
                multimodal data and benchmarks close the refinement loop.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="section timeline-section">
          <div className="shell">
            <div className="progressive-heading">
              <span className="section-index">PROGRESSIVE BEHAVIOR SHAPING</span>
            </div>

            <div className="progressive-grid">
              <p className="progressive-description milestone-description">
                MLLMs Post-training has rapidly become a central mechanism for endowing pre-trained
                MLLMs with the ability to exhibit more aligned and reliable behaviors, marking
                significant progress in multimodal intelligence.
              </p>
              <p className="progressive-description venn-description">
                MLLMs post-training connects multimodal learning with digital AI and physical AI,
                representing a core step in the progression towards Artificial General
                Intelligence (AGI).
              </p>

              <figure className="progressive-card milestone-figure">
                <div className="progressive-image-wrap">
                  <img
                    src={asset("/figures/mllm-post-training-timeline.png")}
                    alt="Timeline of key milestones in MLLM post-training from instruction following to online-policy distillation"
                    loading="lazy"
                  />
                </div>
                <figcaption>
                  <span>FIG. 02</span>
                  Key milestones of MLLMs post-training.
                </figcaption>
              </figure>
              <figure className="progressive-card venn-figure">
                <div className="progressive-image-wrap">
                  <img
                    src={asset("/figures/mllm-fields-venn.png")}
                    alt="Venn diagram connecting MLLM post-training with multimodal learning, digital AI, physical AI, and AGI"
                    loading="lazy"
                  />
                </div>
                <figcaption>
                  <span>FIG. 03</span>
                  A Venn diagram showing the interrelationships among key AI fields.
                </figcaption>
              </figure>
            </div>

            <figure className="paper-figure landscape-figure">
              <img
                src={asset("/figures/mllm-post-training-landscape.png")}
                alt="Timeline landscape of MLLM post-training research from 2023 to 2026 across five research families, datasets, and benchmarks"
                loading="lazy"
              />
              <figcaption>
                <span>FIG. 04</span>
                An overall landscape of MLLMs post-training research: Instruction Following,
                Preference Calibration, Reason Enhancement, Domain Adaptation, and Scalable
                Learning, with datasets and benchmarks.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="section taxonomy-section" id="taxonomy">
          <div className="shell">
            <div className="taxonomy-heading">
              <span className="section-index">02 / TAXONOMY</span>
            </div>

            <div className="family-tabs" role="tablist" aria-label="Post-training behavior families">
              {familyKeys.map((key) => {
                const item = familyData[key];
                const selected = key === activeFamily;
                return (
                  <button
                    className={`family-tab ${selected ? "is-active" : ""}`}
                    type="button"
                    role="tab"
                    id={`family-tab-${key}`}
                    aria-selected={selected}
                    aria-controls="family-panel"
                    key={key}
                    onClick={() => selectFamily(key)}
                  >
                    <span>{item.number}</span>
                    <small>{item.tag}</small>
                    <b>{item.title}</b>
                    <p>{item.short}</p>
                  </button>
                );
              })}
            </div>

            <article
              className="family-panel"
              id="family-panel"
              role="tabpanel"
              aria-labelledby={`family-tab-${activeFamily}`}
            >
              <div className="family-panel-copy">
                <span className="family-number">{family.number}</span>
                <div className="family-label">{family.tag} / BEHAVIOR</div>
                <h3>{family.title}</h3>
                <p>{family.detail}</p>
                <div className="method-chips">
                  {family.methods.map((method) => <span key={method}>{method}</span>)}
                </div>
              </div>

              <div className="family-carousel">
                <div
                  className="family-carousel-track"
                  style={{ transform: `translateX(-${activeFigure * 100}%)` }}
                >
                  {family.figures.map((figure, index) => (
                    <figure
                      className="family-figure"
                      aria-hidden={index !== activeFigure}
                      key={figure.image}
                    >
                      <img src={asset(figure.image)} alt={figure.alt} loading="lazy" />
                      <figcaption>{figure.caption}</figcaption>
                    </figure>
                  ))}
                </div>

                {family.figures.length > 1 && (
                  <div className="family-carousel-controls">
                    <span aria-live="polite">
                      {String(activeFigure + 1).padStart(2, "0")} / {String(family.figures.length).padStart(2, "0")}
                    </span>
                    <div>
                      <button
                        type="button"
                        aria-label={`Previous ${family.title} figure`}
                        onClick={() => setActiveFigure((activeFigure - 1 + family.figures.length) % family.figures.length)}
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        aria-label={`Next ${family.title} figure`}
                        onClick={() => setActiveFigure((activeFigure + 1) % family.figures.length)}
                      >
                        →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </article>
          </div>
        </section>

        <section className="section evaluation-section" id="evaluation">
          <div className="shell">
            <div className="section-heading split-heading light-heading">
              <div>
                <span className="section-index">03 / EVALUATION</span>
                <h2>Desired behavior needs visible evidence.</h2>
              </div>
              <p>
                Benchmarks define what is learned and what counts as progress—from instruction
                compliance and faithfulness to multimodal reasoning and domain reliability.
              </p>
            </div>

            <figure className="evaluation-figure">
              <img
                src={asset("/figures/benchmark.png")}
                alt="Evaluation system for MLLM post-training datasets and benchmarks"
                loading="lazy"
              />
              <figcaption>Overview of the evaluation system of MMPoT.</figcaption>
            </figure>

            <div className="metric-grid">
              <article>
                <h3>Instruction Following</h3>
                <p>MME · MMBench · MM-Vet · SEED-Bench · MM-IFEval · MIA-Bench</p>
              </article>
              <article>
                <h3>Preference Calibration</h3>
                <p>POPE · MMHal-Bench · HallusionBench · SafeBench · Multimodal RewardBench · VL-RewardBench</p>
              </article>
              <article>
                <h3>Reason Enhancement</h3>
                <p>MMMU · MMMU-Pro · MathVista · MathVerse · We-Math · LogicVista</p>
              </article>
              <article>
                <h3>Domain Adaptation</h3>
                <p>ScreenSpot · OSWorld · DocVQA · OCRBench · SLAKE · DriveLM</p>
              </article>
            </div>

            <div className="evaluation-note">
              <div><b>Reference-based</b><span>Accuracy · Exact match · F1 · mAP · IoU</span></div>
              <div><b>Judge-based</b><span>Human or model scoring · Pairwise preference · Win rate</span></div>
            </div>
          </div>
        </section>

        <section className="section outlook-section" id="outlook">
          <div className="shell">
            <div className="section-heading split-heading">
              <div>
                <span className="section-index">04 / FUTURE DIRECTIONS</span>
                <h2>Toward dependable multimodal intelligence</h2>
              </div>
              <p>
                The next frontier is not just a stronger benchmark score. It is behavior that stays
                grounded, reliable, and adaptive as the world changes.
              </p>
            </div>

            <div className="outlook-grid">
              <article className="outlook-main">
                <span>01</span>
                <h3>Grounded behavior shaping</h3>
                <p>Learn from native spatial, temporal, acoustic, and interactive signals—not text as a proxy for every modality.</p>
                <div className="outlook-tags"><b>Native multimodality</b><b>Physical interaction</b></div>
              </article>
              <article>
                <span>02</span>
                <h3>Reliability-aware evaluation</h3>
                <p>Expose hallucination, overconfidence, shortcut reasoning, and instability in complex real-world scenarios.</p>
                <div className="outlook-tags"><b>Trustworthiness</b><b>Robustness</b></div>
              </article>
              <article>
                <span>03</span>
                <h3>Scaling for generalization</h3>
                <p>Transfer behavior across tasks, domains, and modalities while continually learning without uncontrolled drift.</p>
                <div className="outlook-tags"><b>Generalist MLLMs</b><b>Streaming worlds</b></div>
              </article>
            </div>
          </div>
        </section>

        <section className="section citation-section" id="cite">
          <div className="shell citation-layout">
            <div className="citation-copy">
              <span className="section-index">05 / CITATION</span>
              <h2>Build on the survey.</h2>
              <p>
                The companion repository continuously curates papers, code, datasets, and project
                pages across the MMPoT landscape.
              </p>
              <a
                className="button button-primary"
                href="https://github.com/zchoi/Awesome-Post-Training-for-MLLMs"
                target="_blank"
                rel="noreferrer"
              >
                Browse the reading list <ArrowIcon />
              </a>
            </div>
            <div className="bib-card">
              <div className="bib-card-head">
                <span>BIBTEX / 2026</span>
                <button type="button" onClick={copyCitation} aria-live="polite">
                  {copied ? "Copied ✓" : "Copy citation"}
                </button>
              </div>
              <pre>{citation}</pre>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell footer-inner">
          <div>
            <span className="brand-mark" aria-hidden="true">M²</span>
            <p>A Survey on Post-training of Multimodal Large Language Models</p>
          </div>
          <div className="footer-links">
            <span className="footer-disabled">Paper · link pending</span>
            <a href="https://github.com/zchoi/Awesome-Post-Training-for-MLLMs" target="_blank" rel="noreferrer">GitHub</a>
            <a href="mailto:is.pengpengzeng@gmail.com">Contact</a>
          </div>
          <p className="footer-note">Research site · 2026</p>
        </div>
      </footer>
    </>
  );
}
