// Import Styles
import "./styles/reset.css"
import "./styles/viables.css"
import "./styles/basic.css"
import "./styles/pages/help.css"
import "./styles/components/link.css"

// Start Section Script

function openSection() {
    const sectionId = window.location.hash.substring(1)

    if (!sectionId) return

    const section = document.getElementById(sectionId)

    if (section instanceof HTMLDetailsElement) {
        document.querySelectorAll("details").forEach((details) => {
            details.open = false
        })

        section.open = true
        section.scrollIntoView({ behavior: "smooth" })
    }
}

document.addEventListener("DOMContentLoaded", openSection)

window.addEventListener("hashchange", openSection)