browser.runtime.onMessage.addListener(async (msg, sender) => {

    if (!sender.url.includes("lms.ritsumei.ac.jp")) {
        return;
    }

    if (msg.type !== "FETCH_COURSES") {
        return;
    }

    const sesskey = msg.sesskey;

    const url =
        "https://lms.ritsumei.ac.jp/lib/ajax/service.php?sesskey=" +
        sesskey +
        "&info=core_course_get_enrolled_courses_by_timeline_classification";

    const body = [
        {
            index: 0,
            methodname: "core_course_get_enrolled_courses_by_timeline_classification",
            args: {
                offset: 0,
                limit: 0,
                classification: "inprogress",
                sort: "fullname",
                customfieldname: "",
                customfieldvalue: "",
                requiredfields: [
                    "id",
                    "fullname",
                    "shortname",
                    "visible",
                    "enddate",
                    "summary"
                ]
            }
        }
    ];

    try {

        const res = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            body: JSON.stringify(body)
        });

        const json = await res.json();

        return json;

    } catch (err) {

        console.error("API error:", err);
        return { error: true };

    }

});