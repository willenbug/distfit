# AGENTS.md

## Project Overview

**DistFit** is a fully client-side TypeScript application for statistical distribution fitting and hydrologic frequency analysis.

The application allows users to:

- Import and analyze datasets (e.g., annual maxima)
- Fit multiple probability distributions (e.g., GEV, LP3, Normal)
- Compare fitting methods (e.g., L-moments, MLE)
- Evaluate goodness-of-fit using statistical and information criteria
- Visualize results using interactive plots
- Rank and compare candidate models

The project is hosted on GitHub Pages and contains no server-side code.

---

## Technology Stack

- **Runtime:** Node.js 24
- **Package Manager:** Bun
- **Frontend Framework:** React 19.2
- **Statistical Utilities:** simple-statistics
- **Visualization:** plotly.js
- **Language:** TypeScript
- **Version Control:** jj (Jujutsu) — not git

---

## Architectural Principles

The project follows a strongly-typed, immutable, and strategy-based architecture inspired by scientific computing best practices.

---

### 1. Immutable Parameter Objects

Each distribution defines a dedicated immutable parameter class.

Principles:

- Parameters are declared `readonly`
- Validation occurs inside constructors
- `Object.freeze()` enforces runtime immutability
- Parameters are never mutated after creation

Examples:

- `GEVParams`
- `NormalParams`
- `LP3Params`

Distributions do not modify parameters once constructed.

---

### 2. Generic Distribution Interface

Distributions implement a generic interface with:

- `pdf(x: number): number`
- `cdf(x: number): number`
- `quantile(p: number): number`
- `params` (immutable parameter object)

Distributions are pure mathematical objects:

- No fitting logic inside distribution classes
- No internal mutation
- Deterministic behavior

---

### 3. Strategy Pattern for Fitting

Fitting logic is separated from distribution classes.

Each fitting method implements a strategy with the signature:

`fit(data: number[]): Params`

Examples:

- `GEV_LMomentFit`
- `GEV_MLEFit`

Fitting returns a new immutable parameter object.  
Distributions are instantiated using those parameters.

This prevents half-fitted states and hidden mutation.

---

### 4. Strategy Pattern for Goodness-of-Fit Metrics

Goodness-of-fit metrics are implemented as independent strategies.

Each metric:

- Accepts raw data
- Accepts a fitted distribution
- Returns a scalar score
- Performs no mutation

Examples:

- Kolmogorov–Smirnov (KS)
- Anderson–Darling (AD)
- AIC
- BIC
- RMSE (quantile-based)

Metrics are orchestrated through a `ModelEvaluator` class that aggregates results.

---

### 5. Separation of Concerns

Strict separation between layers:

- **Distributions** → Pure mathematical definitions
- **Fitting Strategies** → Parameter estimation logic
- **Metrics** → Model evaluation logic
- **UI (React)** → Presentation only
- **Plotly.js** → Visualization only

No statistical logic inside React components.

---

## Design Goals

- Strong type safety
- Immutable state
- No hidden mutation
- Clear separation of responsibilities
- Extensible scientific architecture
- Deterministic and testable components
- Scalable for advanced statistical features

---

## Supported / Planned Extensions

The architecture is designed to support:

- Bootstrap confidence intervals
- Model ranking and scoring engines
- Decision-support workflows
- Regional frequency analysis
- Bayesian parameter estimation
- Multi-model comparison tables
- Exportable results (CSV / JSON)

---

DistFit prioritizes scientific correctness, maintainability, and extensibility while remaining entirely client-side.
