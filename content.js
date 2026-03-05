const WEEKDAYS = ["月", "火", "水", "木", "金"];

const DAY_MAP = Object.fromEntries(
    WEEKDAYS.map((d, i) => [d, i])
);

async function init() {

    const sesskey = getSesskey();

    if (!sesskey) {
        console.log("sesskey not found");
        return;
    }

    const courses = await requestCourses(sesskey);
    renderCalendar(courses);
}

function getSesskey() {

    if (window.M?.cfg?.sesskey) return window.M.cfg.sesskey;

    return document.querySelector('input[name="sesskey"]')?.value ?? null;
}

async function requestCourses(sesskey) {

    const response = await browser.runtime.sendMessage({
        type: "FETCH_COURSES",
        sesskey: sesskey
    });

    if (!response || !response[0] || !response[0].data) {
        return [];
    }

    return response[0].data.courses;

}

function parseSummary(summary = "") {

    const lines = summary.split("<br />");

    const [timeCode, place = ""] = (lines[3] || "").split(":");
    const teacher = lines[4] || "";

    const day = DAY_MAP[timeCode?.[0]];
    const period = Number(timeCode?.slice(1));

    if (day === undefined || !period) return null;

    return { day, period, place, teacher };
}

function buildEvents(courses) {

    const events = [];

    for (const c of courses) {

        const parsed = parseSummary(c.summary);
        if (!parsed) continue;

        events.push({
            title: c.fullnamedisplay,
            url: c.viewurl,
            ...parsed
        });
    }

    return events;
}

function getMaxPeriod(events) {

    let max = 0;

    for (const e of events)
        if (e.period > max) max = e.period;

    return max;
}

function insertCalendarBlock() {

    const region = document.querySelector("#block-region-content");
    if (!region) return null;

    const section = document.createElement("section");

    section.className = "block card mb-3";
    section.setAttribute("role", "region");

    section.innerHTML = `
        <div class="card-body p-3">
            <h3 class="h5 card-title d-inline">時間割表</h3>
            <div id="weekly-calendar"></div>
        </div>
    `;

    region.prepend(section);

    return section.querySelector("#weekly-calendar");
}

function renderCalendar(courses) {

    const container = insertCalendarBlock();
    if (!container) return;

    const events = buildEvents(courses);
    console.log("events:",events); // debug
    const maxPeriod = getMaxPeriod(events);

    const grid = document.createElement("div");
    grid.className = "calendar-grid mt-3";

    const frag = document.createDocumentFragment();

    createGridCells(frag, maxPeriod);
    createHeaders(frag);
    createPeriodLabels(frag, maxPeriod);

    events
        .sort((a, b) => a.day === b.day ? a.period - b.period : a.day - b.day)
        .forEach(e => createEventBlock(frag, e));

    grid.appendChild(frag);
    container.appendChild(grid);
}

function createGridCells(parent, maxPeriod) {

    for (let r = 1; r <= maxPeriod + 1; r++) {

        for (let c = 1; c <= 6; c++) {

            const cell = document.createElement("div");

            cell.className = "calendar-cell";
            cell.style.gridRow = r;
            cell.style.gridColumn = c;

            parent.appendChild(cell);
        }
    }
}

function createHeaders(parent) {

    WEEKDAYS.forEach((day, i) => {

        const header = document.createElement("div");

        header.className = "weekday-header";
        header.textContent = day;

        header.style.gridRow = 1;
        header.style.gridColumn = i + 2;

        parent.appendChild(header);
    });
}

function createPeriodLabels(parent, maxPeriod) {

    for (let i = 1; i <= maxPeriod; i++) {

        const label = document.createElement("div");

        label.className = "period-label";
        label.textContent = i;

        label.style.gridColumn = 1;
        label.style.gridRow = i + 1;

        parent.appendChild(label);
    }
}

function createEventBlock(parent, event) {

    const block = document.createElement("a");

    block.className = "course-block";
    if (event.url.startsWith(location.origin)) {
        block.href = event.url;
    }
    block.target = "_self";

    block.style.gridColumn = event.day + 2;
    block.style.gridRow = event.period + 1;

    const title = document.createElement("div");
    title.className = "course-title";
    title.textContent = event.title;

    const place = document.createElement("div");
    place.className = "course-place";
    place.textContent = event.place;

    const teacher = document.createElement("div");
    teacher.className = "course-teacher";
    teacher.textContent = event.teacher;

    block.append(title, place, teacher);

    parent.appendChild(block);
}

init();