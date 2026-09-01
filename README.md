# Python Calculator (Flask + HTML/CSS)

## Setup
```bash
pip install flask
```

## Run
```bash
cd calculator
python app.py
```

Then open http://127.0.0.1:5000 in your browser.

## How it works
- **app.py** — Flask server; all arithmetic happens in Python (`calculate()` function) via a `/calculate` API endpoint.
- **templates/index.html** — calculator UI structure.
- **static/style.css** — styling.
- **static/script.js** — reads button clicks, sends the expression to the Python backend, and displays the returned result.
