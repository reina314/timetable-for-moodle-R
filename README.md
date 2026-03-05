# Timetable for moodle+R

An unofficial browser extension that enhances **moodle+R** by displaying your courses in a weekly timetable.

This extension is designed for students of **Ritsumeikan University** who use the university's Moodle instance (moodle+R).\
It extracts course schedule information and renders it as an easy-to-read weekly timetable directly on the moodle+R dashboard.

This project is **unofficial** and is **not affiliated with Moodle or Ritsumeikan University**.

------------------------------------------------------------------------

# Features

- Displays a **weekly timetable** directly on the moodle+R dashboard
- Automatically extracts:
  - course name
  - classroom/location
  - instructor name
- Each timetable block links directly to the **course page**
- Lightweight and runs directly in the browser

------------------------------------------------------------------------

# Installation

## Manual Installation (Firefox)

1.  Download or clone this repository:

```{=html}
<!-- -->
```
    git clone https://github.com/yourusername/xx-univ-moodle-calendar.git

2.  Open Firefox and navigate to:

```{=html}
<!-- -->
```
    about:debugging

3.  Click **This Firefox**
4.  Click **Load Temporary Add-on**
5.  Select the `manifest.json` file

------------------------------------------------------------------------

# Usage

1.  Log in to **moodle+R**
2.  Open the **Dashboard**
3.  The extension automatically adds a **weekly course timetable**
4.  Hover over a course block to highlight it
5.  Click a course to open the course page in moodle+R

The timetable updates automatically whenever moodle+R loads your course events.

------------------------------------------------------------------------

# Permissions

This extension uses the following permissions:

### cookies

Used to read the Moodle session cookie required for authenticated API requests.

### storage

Stores extension settings locally.

### host permissions

The extension only communicates with:

-   `*://lms.ritsumei.ac.jp/my/*`
-   `*://lms.ritsumei.ac.jp/lib/ajax/*`

No data is sent to external servers.

------------------------------------------------------------------------

# Privacy

-   No personal data is collected.
-   No tracking or analytics are used.
-   All processing happens locally in your browser.

------------------------------------------------------------------------

# Security

The extension avoids unsafe HTML injection by using `textContent` when rendering moodle+R data.\
This prevents cross-site scripting vulnerabilities from malicious content.

------------------------------------------------------------------------

# Development

Project structure:

    .
    ├── manifest.json
    ├── content.js
    ├── background.js
    ├── style.css
    └── README.md

Main components:

-   **content.js** --- Injects the timetable UI into moodle+R pages
-   **background.js** --- Performs secure Moodle API requests
-   **style.css** --- Timetable layout and visual styling

------------------------------------------------------------------------

# Contributing

Contributions are welcome.

Possible improvements:

-   Support additional Moodle instances
-   Export timetable to external services
-   Dark mode support
-   Custom color themes

------------------------------------------------------------------------

# Disclaimer

This extension is:

-   **Unofficial**
-   **Not endorsed by Moodle**
-   **Not endorsed by Ritsumeikan University**

Use at your own risk.

------------------------------------------------------------------------

# License

MIT License

------------------------------------------------------------------------

# Author

Created by\
*reina314*
