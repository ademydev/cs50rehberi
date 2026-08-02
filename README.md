# CS50 Explainer

A comprehensive, interactive website guide to **CS50** — Harvard's Introduction to Computer Science.

## Run in the browser

Open `index.html` in your browser, or start a local server:

```bash
python -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

## Run in the terminal

```bash
python cs50_explainer.py
```

Print all sections at once:

```bash
python cs50_explainer.py --all
```

## What's included

### Start Here
- Course overview with stats and hero section
- What is CS50? (history, David Malan, philosophy, time commitment)
- Course variants (CS50x, AP, Lawyers, Business, AI, Web)
- Step-by-step getting started guide

### Week-by-Week Breakdown (Weeks 0–10)
Each week includes topics covered, key concepts, code examples, and problem set details:
- **Week 0** — Scratch & computational thinking (binary, algorithms)
- **Week 1** — C programming (variables, loops, functions)
- **Week 2** — Arrays, strings, debugging, cryptography
- **Week 3** — Algorithms, sorting, recursion, Big O
- **Week 4** — Memory, pointers, malloc, file I/O
- **Week 5** — Data structures (linked lists, hash tables, tries)
- **Week 6** — Python (syntax, libraries, exceptions)
- **Week 7** — SQL & relational databases
- **Week 8** — HTML, CSS, JavaScript
- **Week 9** — Flask back-end web development
- **Week 10** — Ethics, security, AI

### Deep Dives
- Complete problem sets guide with difficulty ratings
- Algorithms & Big O notation reference
- Data structures comparison and use cases
- Memory & pointers guide with common errors
- CS50 tools (check50, style50, submit50, debug50)
- Web development stack overview

### Finish Strong
- Final project ideas and requirements
- Study tips and strategies
- Community resources and links
- FAQ (8 common questions)
- Certificate and grading info

## Features

- **Search** — find topics across all sections (Ctrl+K)
- **Dark mode** — toggle with the button in the sidebar
- **Progress tracker** — check off weeks as you complete them (saved locally)
- **FAQ accordion** — expandable questions and answers
- **Responsive design** — works on mobile and desktop
- **Code examples** — syntax-highlighted C, Python, SQL, HTML, JS snippets

## Project structure

```
cs50-explainer/
├── index.html          # Main website
├── css/
│   └── style.css       # Styles and design system
├── js/
│   └── app.js          # Navigation, search, dark mode, progress
├── cs50_explainer.py   # CLI version
└── README.md
```

No dependencies required — pure HTML, CSS, and JavaScript.
