const PROJECT_DATA = [
  {
    num: "01",
    title: `IronVault &mdash; AI &amp; Blockchain for IoT`,
    tags: ["PyTorch", "LSTM", "Blockchain", "IoT", "Anomaly Detection"],
    repo: "https://github.com/hacktivist211/IronVault",
    overview: "SAP HackFest winning project. An end-to-end security system combining a deep learning anomaly detector with a blockchain-based immutable audit trail for IoT networks.",
    highlights: ["Enhanced Autoencoder with LSTM layers trained to detect anomalous sensor patterns in real time", "Blockchain ledger records every flagged event with a cryptographic hash — no post-hoc tampering possible", "Won the SAP HackFest national competition against industry-grade submissions", "Designed for edge deployment — lightweight enough to run on constrained IoT gateway hardware"],
    what: "A production-grade IoT security system that detects intrusions using ML and logs them immutably using blockchain."
  },
  {
    num: "02",
    title: `PrivateRAG Engine`,
    tags: ["LangChain", "ChromaDB", "RAG", "Ollama", "NLP"],
    repo: "https://github.com/hacktivist211/PrivateRAG-Engine",
    overview: "A fully local Retrieval-Augmented Generation system for querying private document collections. Zero data leaves the machine — all inference runs on-device via Ollama.",
    highlights: ["Ingests PDF, DOCX, and PPTX files using Unstructured for clean multi-format parsing", "ChromaDB as the persistent vector store with configurable embedding models", "Ollama handles LLM inference locally — no API keys, no cloud dependency", "LangChain orchestrates the full retrieval and generation pipeline with chat history support"],
    what: "Query your own documents privately. No cloud. No data leakage. Runs entirely on your hardware."
  },
  {
    num: "03",
    title: `AutoBooks &mdash; Agentic Accounting`,
    tags: ["OCR", "Self-RAG", "Agents", "Pydantic", "Automation"],
    repo: "https://github.com/hacktivist211/AutoBooks",
    overview: "An agentic pipeline that automates the extraction and validation of financial documents. OCR extracts raw data, Self-RAG cross-validates entries, and Pydantic enforces strict output schemas.",
    highlights: ["Tesseract OCR extracts structured fields from invoices, receipts, and bank statements", "Self-RAG agent verifies extracted values against source context before committing", "Pydantic models enforce type-safe, validated output — no silent data corruption", "Zero-touch bookkeeping pipeline from raw document to structured database entry"],
    what: "Drop in a financial document. Get back validated, structured accounting data. No human in the loop."
  },
  {
    num: "04",
    title: `Risk-Based Proctoring System`,
    tags: ["PyTorch", "Anomaly Transformer", "Anomaly Detection", "JavaScript"],
    repo: "https://github.com/hacktivist211/RiskPatrol",
    overview: "A real-time ML surveillance system for online assessments. Uses the Anomaly Transformer architecture to model normal user behaviour and flag deviations with probabilistic risk scores.",
    highlights: ["Anomaly Transformer models temporal dependencies in user interaction sequences", "Outputs a continuous risk score per session rather than binary pass/fail flags", "JavaScript frontend captures interaction telemetry (keystrokes, mouse, focus) and streams to the ML backend", "Designed to minimise false positives — only sustained anomaly patterns trigger alerts"],
    what: "Continuous behavioural analysis for online exams. Scores risk in real time without false-positive noise."
  },
  {
    num: "05",
    title: `Agent Backup &mdash; Voice AI`,
    tags: ["Ollama", "RealtimeSTT", "Kokoro TTS", "LangChain", "Python"],
    repo: "https://github.com/hacktivist211/Agent-Backup",
    overview: "A fully local JARVIS-style voice assistant. Uses RealtimeSTT for low-latency transcription, Ollama (Granite) for LLM inference, and Kokoro-82M for streaming TTS — all running on-device.",
    highlights: ["Streaming TTS: audio starts playing sentence-by-sentence before the LLM finishes generating", "ESC key interrupt stops speech immediately, resetting to listening state for natural flow", "Autonomous DuckDuckGo web search — agent decides when a query needs real-time data", "Privacy-first: voice processing and LLM inference are fully local; only web searches leave the network"],
    what: "A voice assistant that thinks and speaks locally. No cloud latency. No data sent to third parties."
  },
  {
    num: "06",
    title: `Memora &mdash; Alzheimer&#39;s AR Assistant`,
    tags: ["ArcFace", "ECAPA-TDNN", "RAG", "Whisper", "Coqui TTS", "ChromaDB"],
    repo: "https://github.com/hacktivist211/Memora-AR-Based-Cognitive-Assistive-Platform",
    overview: "A clinical-grade multimodal memory assistant for early-stage Alzheimer's patients. Combines biometric identity fusion, RAG-based memory recall, and voice interaction in a patient-safe pipeline.",
    highlights: ["ArcFace (face) + ECAPA-TDNN (voice) fusion produces a stable biometric user_id across sessions", "ChromaDB vector store holds the patient's personal memory corpus — relationships, events, routines", "Hallucination-free by design: Qwen LLM responds only from retrieved context, never invents facts", "Calm, stable TTS output via Coqui — response tone is explicitly optimised for Alzheimer's safety"],
    what: "A memory prosthetic for Alzheimer's patients. Recognises who they are and helps them remember who you are."
  },
  {
    num: "07",
    title: `IITM SolidWorks &mdash; Component Counter`,
    tags: ["PyTorch", "EfficientNet-B3", "ResNet50", "YOLOv8", "TTA"],
    repo: "https://github.com/hacktivist211/IITM-Solidworks-Backup",
    overview: "Exact-count prediction of mechanical parts (bolts, pins, nuts, washers) from single RGB images. Hybrid architecture fuses a Multi-Head CNN with YOLOv8 for deterministic inference.",
    highlights: ["Multi-Head CNN: shared EfficientNet-B3/ResNet50 backbone with four independent counting heads — one per part class", "YOLOv8 provides spatial verification; final prediction = 0.7 x CNN + 0.3 x YOLO", "Exact-Match metric: prediction is correct only if ALL four counts match ground truth simultaneously", "Test-Time Augmentation (flips + rotations) stabilises predictions at inference time"],
    what: "Computer vision for industrial inspection. Counts mechanical parts with exact-match accuracy, not approximations."
  },
  {
    num: "08",
    title: `Building Defect Detection`,
    tags: ["Grounding DINO", "BLIP-2", "YOLOv8", "PyTorch", "Transformers"],
    repo: "https://github.com/hacktivist211/LT-Defect-Detection-Backup",
    overview: "End-to-end structural defect detection pipeline that goes beyond bounding boxes. Combines YOLOv8, Grounding DINO zero-shot detection, and BLIP-2 captioning to generate natural language defect reports.",
    highlights: ["Grounding DINO enables zero-shot detection via text prompts — no retraining needed for new defect types", "BLIP-2 fine-tuned to generate descriptive captions: 'severe cracking along the load-bearing column'", "Detects cracks, corrosion, spalling, leakage, and rust across seven defect classes", "Designed for automated drone/camera inspection workflows with report generation built in"],
    what: "Point a camera at a building. Get back a structured defect report in plain English."
  },
  {
    num: "09",
    title: `Medical Image Classification`,
    tags: ["DeiT", "Swin Transformer", "PyTorch", "HuggingFace", "AMP"],
    repo: "https://github.com/hacktivist211/Project-Root-Assets-Backup",
    overview: "Two-stage transfer learning pipeline for medical image classification. DeiT for Alzheimer's MRI staging, Swin Transformer for Kidney CT scan analysis. Handles class imbalance and limited compute.",
    highlights: ["Stage 1 freezes the transformer backbone; only the classification head trains — no destroyed pre-trained weights", "Stage 2 fine-tunes all parameters at lr=1e-5 to learn domain-specific medical features", "WeightedRandomSampler corrects severe class imbalance common in medical datasets", "Automatic Mixed Precision (AMP) + OneCycleLR reduces training time without accuracy loss"],
    what: "Vision Transformers adapted for medical diagnosis. Classifies MRI and CT scans with state-of-the-art accuracy."
  },
  {
    num: "10",
    title: `Smart Memory LLM`,
    tags: ["LLM", "SQLite", "LangChain", "Python"],
    repo: "https://github.com/hacktivist211/Smart-Memory-LLM",
    overview: "A JARVIS-inspired AI assistant with persistent long-term memory. Conversation context, user preferences, and factual knowledge survive session restarts via a local SQLite store.",
    highlights: ["SQLite backend stores conversation history with semantic indexing for relevant retrieval", "Dynamic web search integration — the assistant fetches real-time data when its memory is insufficient", "LangChain orchestrates memory retrieval, web augmentation, and LLM response generation", "Session-persistent context means the assistant remembers previous conversations across restarts"],
    what: "An AI assistant that actually remembers you. No re-explaining context on every session start."
  },
  {
    num: "11",
    title: `Credit Risk Model`,
    tags: ["CatBoost", "XGBoost", "Ensemble", "scikit-learn"],
    repo: "https://github.com/hacktivist211/Credit-Risk-Management-Model",
    overview: "Production-grade ensemble ML pipeline for predicting borrower default. Combines CatBoost and XGBoost with a weighted fusion layer and interpretable feature attribution outputs.",
    highlights: ["CatBoost handles categorical features natively — no manual one-hot encoding required", "XGBoost provides gradient-boosted tree ensemble with strong generalisation on tabular financial data", "Weighted ensemble fusion optimised on validation AUC for best combined performance", "SHAP-compatible output: every prediction includes feature attribution for regulatory explainability"],
    what: "Predicts loan default before it happens. Interpretable outputs suitable for production lending workflows."
  },
  {
    num: "12",
    title: `VAE Anomaly Detection`,
    tags: ["PyTorch", "VAE", "Pandas", "scikit-learn"],
    repo: "https://github.com/hacktivist211/VAE-Anomaly-Detection",
    overview: "Unsupervised anomaly detection using a Variational Autoencoder trained on tabular data. Anomalies are flagged based on reconstruction error exceeding a calibrated threshold.",
    highlights: ["VAE learns a compressed latent representation of normal data distribution", "Reconstruction error at inference time quantifies how anomalous each sample is", "Threshold calibrated on validation set using precision-recall tradeoff analysis", "Entirely unsupervised — no anomaly labels needed during training"],
    what: "Detects anomalies without labelled training data. Learns what normal looks like, then flags everything else."
  },
  {
    num: "13",
    title: `Sight CV &mdash; Admission Predictor`,
    tags: ["scikit-learn", "Random Forest", "scipy", "pandas", "GridSearchCV"],
    repo: "https://github.com/hacktivist211/Sight-CV-Project",
    overview: "50,000-record synthetic dataset of Indian college admissions simulating JEE/NEET scores, reservation categories, and institutional cutoffs. Random Forest classifier achieves 85%+ accuracy.",
    highlights: ["Synthetic data generated with scipy.stats — Beta distributions for entrance scores, correlated academic percentages", "Admission logic mirrors real Indian reservation and quota rules (General, OBC, SC, ST, EWS, domicile)", "Random Forest with RandomizedSearchCV achieves 0.90+ ROC AUC on held-out test set", "Logistic Regression baseline with GridSearchCV provides interpretable comparison benchmark"],
    what: "ML-based college admission prediction for the Indian education system with realistic synthetic training data."
  },
  {
    num: "14",
    title: `Brainstorming Rig`,
    tags: ["Streamlit", "Ollama", "SQLite", "NLP"],
    repo: "https://github.com/hacktivist211/brainstorming-rig",
    overview: "A Streamlit web application using Qwen3/Mistral LLMs via Ollama for structured interactive brainstorming. Session history is persisted in SQLite so ideas accumulate across sessions.",
    highlights: ["Qwen3 and Mistral models selectable at runtime via Ollama — no model reload required", "Structured brainstorming prompts guide the LLM to generate categorised, non-repetitive ideas", "SQLite session store retains all generated content — revisit and extend previous sessions", "Streamlit UI provides a clean, distraction-free brainstorming interface"],
    what: "An LLM-powered brainstorming tool that remembers every session and builds on previous ideas."
  },
  {
    num: "15",
    title: `MarketMomentum`,
    tags: ["XGBoost", "Time Series", "scikit-learn", "pandas"],
    repo: "https://github.com/hacktivist211/MarketMomentum",
    overview: "Stock price forecasting using XGBoost on engineered time-series features. Includes a backtesting pipeline for strategy validation on historical Kaggle datasets.",
    highlights: ["Feature engineering: rolling means, lagged returns, RSI, Bollinger Bands, volume momentum", "XGBoost trained with time-aware cross-validation to prevent data leakage", "Backtesting pipeline simulates a trading strategy on held-out data with transaction costs modelled", "Kaggle dataset pipeline with reproducible preprocessing for benchmark comparison"],
    what: "XGBoost-powered stock forecasting with a full backtesting engine for strategy validation."
  },
  {
    num: "16",
    title: `Advanced Directory Mapper`,
    tags: ["Python", "CLI", "LLM Context"],
    repo: "https://github.com/hacktivist211/DirectoryMapper",
    overview: "A CLI tool that generates comprehensive, LLM-optimised directory tree representations. Solves the problem of feeding large codebases to AI models cleanly and within context limits.",
    highlights: ["Outputs clean tree structures with configurable depth, file filters, and ignore patterns", "Token-count estimation mode shows how much of the LLM context window the output consumes", "Supports both markdown and plain text output formats for different LLM ingestion methods", "Handles large monorepos efficiently with selective subtree export"],
    what: "Feed your entire codebase to an LLM without hitting context limits or generating noisy output."
  },
  {
    num: "17",
    title: `TTS LLM Agent`,
    tags: ["TTS", "STT", "LLM", "Ollama", "Python"],
    repo: "https://github.com/hacktivist211/tts-llm-agent",
    overview: "JARVIS-inspired full voice pipeline combining TTS, STT, and Ollama local LLM inference. Continuous listening mode with natural conversation flow and wake detection.",
    highlights: ["Continuous microphone listening with silence detection to segment speech turns", "Ollama handles local LLM inference — model swappable without code changes", "TTS response plays back immediately after generation with no perceptible latency", "Fallback to text input mode if audio hardware is unavailable"],
    what: "A full voice-to-voice AI pipeline running entirely on local hardware."
  },
  {
    num: "18",
    title: `BeatHarvest`,
    tags: ["Python", "Spotify API", "yt-dlp", "FFmpeg"],
    repo: "https://github.com/hacktivist211/BeatHarvest",
    overview: "Resolves Spotify track metadata and downloads the corresponding lossless audio via yt-dlp, with FFmpeg post-processing for format conversion, bitrate normalisation, and ID3 tag injection.",
    highlights: ["Spotify API resolves track metadata: artist, album, title, cover art, year", "yt-dlp locates and downloads the best available audio stream", "FFmpeg post-processes to target format (FLAC, MP3, AAC) with consistent bitrate", "Batch processing support for entire playlists and albums"],
    what: "Spotify playlist to lossless local audio library. Metadata-accurate, format-normalised, batch-capable."
  },
  {
    num: "19",
    title: `YT-Harvester`,
    tags: ["Python", "yt-dlp", "FFmpeg"],
    repo: "https://github.com/hacktivist211/YT-Harvester",
    overview: "CLI downloader for YouTube with interactive format selection, subtitle extraction, thumbnail download, and FFmpeg remuxing. Supports batch processing via URL lists.",
    highlights: ["Interactive format selector shows available streams by resolution, codec, and bitrate", "Subtitle extraction in SRT and VTT formats with optional automatic language detection", "FFmpeg remuxing ensures container compatibility without re-encoding quality loss", "Batch mode processes text files of URLs sequentially with error recovery"],
    what: "YouTube to local storage, your format, your quality, your subtitles. No browser extensions needed."
  },
];