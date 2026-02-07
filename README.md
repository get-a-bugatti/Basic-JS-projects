# 🚀 JavaScript Mastery Project Series

A collection of progressively challenging **Vanilla JavaScript projects** built to deeply understand JavaScript fundamentals, browser behavior, asynchronous programming, and application architecture — without relying on frameworks or external libraries.

---

## 📌 Table of Contents

- [Level 1 — Core JavaScript & Logic](#-level-1--core-javascript--logic)
- [Level 2 — DOM & Browser Interaction](#-level-2--dom--browser-interaction)
- [Level 3 — Async JavaScript](#-level-3--async-javascript)
- [Level 4 — JavaScript Internals](#-level-4--javascript-internals)
- [Level 5 — Prototypes & Execution Context](#-level-5--prototypes--execution-context)
- [Level 6 — Event Loop & Timing](#-level-6--event-loop--timing)
- [Level 7 — Capstone Project](#-level-7--capstone-project)

---

# 🟢 Level 1 — Core JavaScript & Logic

## 📦 Project 1 — Utility Functions Library

A reusable JavaScript utility toolkit containing commonly used helper functions designed with performance, immutability, and reusability in mind.

### ✅ Implemented Utilities

- `deepClone(obj)`
  - Recursive deep cloning of nested objects and arrays  
  - Handles reference copying safely  

- `flattenArray(arr)`
  - Converts nested arrays into a single-level array  
  - Supports infinite nesting depth  

- `debounce(fn)`
  - Limits function execution until inactivity period passes  
  - Useful for input handling and performance optimization  

- `throttle(fn)`
  - Restricts function execution rate  
  - Maintains execution interval consistency  

- `groupBy(arr, key)`
  - Groups collections of objects based on dynamic keys  
  - Supports flexible grouping logic  

- `memoize(fn)`
  - Caches function results  
  - Optimizes expensive repeated computations  

---

## 📊 Project 2 — Data Processor (Pure JavaScript)

A data processing engine designed to efficiently handle and transform large JSON datasets.

### ✅ Implemented Features

- Large JSON file ingestion and parsing  
- Dataset filtering based on dynamic conditions  
- Multi-level sorting with custom comparator functions  
- Data transformation pipelines  
- Statistical aggregation including:
  - Count summaries  
  - Average calculations  
  - Frequency grouping  
- Safe data manipulation avoiding mutation of original datasets  
- Performance-aware data processing workflows  

---

# 🟡 Level 2 — DOM & Browser Interaction

## 📝 Project 3 — Todo App (Vanilla JavaScript)

A fully functional task management application built using only native browser APIs.

### ✅ Features

- Task creation and deletion  
- Task editing with inline update support  
- Task completion toggling  
- Task filtering:
  - All tasks  
  - Active tasks  
  - Completed tasks  
- Persistent storage using `localStorage`  
- Dynamic DOM rendering  
- Event delegation for efficient event handling  
- Manual UI state synchronization  

---

## 📄 Project 4 — Form Engine & Validation System

A configurable form rendering system that dynamically generates form interfaces and validates user input.

### ✅ Features

- Form generation using configuration objects  
- Support for multiple field types:
  - Text inputs  
  - Number inputs  
  - Select dropdowns  
  - Checkbox and radio inputs  
- Custom validation rule engine  
- Real-time validation feedback  
- Structured error messaging system  
- Form submission data handling  
- Extensible validation rule architecture  

---

# 🟠 Level 3 — Async JavaScript

## 🌐 Project 5 — API Client Wrapper

A robust abstraction layer built over the Fetch API designed to provide reliable network communication.

### ✅ Features

- Configurable retry mechanism  
- Timeout handling using abort signals  
- Error classification system:
  - Client errors  
  - Server errors  
  - Network failures  
- Parallel request execution support  
- Fastest-response request racing  
- Normalized error response structure  
- Configurable delay and retry strategies  
- Logging and debugging support for request attempts  

---

## 🔍 Project 6 — Search with Debounce & Caching

A search interface optimized for network efficiency and response accuracy.

### ✅ Features

- Debounced API request triggering  
- Client-side search result caching  
- Automatic cancellation of stale requests  
- Optimized rendering of latest results only  
- Input-driven asynchronous search workflow  
- Reduced redundant network calls  

---

# 🔴 Level 4 — JavaScript Internals

## 📡 Project 7 — Custom Event System

A lightweight publish-subscribe event architecture enabling modular communication across application components.

### ✅ Features

- Event registration system:
  - `on(event, handler)`  
- Event removal:
  - `off(event, handler)`  
- Event broadcasting:
  - `emit(event, data)`  
- Handler identity tracking  
- Memory-safe event subscription management  
- Multi-listener event support  

---

## 🗄 Project 8 — Mini State Manager (Redux-like)

A centralized application state management system ensuring predictable data flow.

### ✅ Features

- Global state store  
- Action dispatching system  
- Reducer-based state updates  
- Immutable state update patterns  
- Subscriber notification system  
- State change tracking  
- Manual middleware-like state processing patterns  

---

# 🟣 Level 5 — Prototypes & Execution Context

## 🧱 Project 9 — Object System Without Classes

A prototype-based object-oriented system implemented using constructor functions.

### ✅ Features

- Custom inheritance implementation  
- Prototype chain method sharing  
- Method overriding mechanisms  
- Constructor-based object instantiation  
- Manual simulation of class-like behavior  
- Efficient shared memory method design  

---

## 🔗 Project 10 — Custom Implementation of `bind()`

A full reimplementation of JavaScript’s native `Function.prototype.bind()` method.

### ✅ Features

- Manual function context binding  
- Partial argument application  
- Correct handling of constructor invocation with `new`  
- Preservation of original function behavior  
- Controlled execution context management  

---

# 🟤 Level 6 — Event Loop & Timing

## ⏱ Project 11 — Async Execution Visualizer

An interactive visualization tool demonstrating JavaScript execution order and asynchronous behavior.

### ✅ Features

- Visual demonstration of:
  - `setTimeout`  
  - Promises  
  - `async/await`  
- Execution order logging interface  
- Event loop simulation examples  
- Call stack and task queue observation tools  
- Microtask vs macrotask execution comparison  

---

# ⚫ Level 7 — Capstone Project

## 🌍 Project 12 — Single Page Application (Vanilla JavaScript)

A complete production-style single-page application built entirely without frameworks or build tools.

### ✅ Features

- Client-side routing system  
- Centralized state management integration  
- API data fetching and synchronization  
- Structured error handling system  
- Dynamic UI rendering  
- Performance optimization techniques  
- Modular architecture design  
- Manual component lifecycle handling  

---

# 🎯 Goals of This Project Series

- Strengthen core JavaScript fundamentals  
- Understand browser internals deeply  
- Master asynchronous programming patterns  
- Learn application architecture without framework abstraction  
- Build production-style reusable JavaScript modules  

---

# 🛠 Tech Stack

- Vanilla JavaScript (ES6+)  
- Browser APIs  
- Fetch API  
- LocalStorage  
- HTML / CSS  

---

# 📌 Author

Built as part of a structured deep dive into JavaScript fundamentals and real-world application design.
