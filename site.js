const PUBLICATION_TYPES = ["selected", "poster", "oral", "highlight", "preprint"];

const SITE_PUBLICATIONS = [
    {
        title: "DCS: A Unified Conditional Sensitivity Framework for Cross-Modal Copyright Infringement Detection",
        authors: ["Xiafeng Man"],
        venue: "arxiv",
        year: "2026",
        selected: false,
        types: ["selected", "preprint"],
        keywords: ["safety", "cv", "agent"],
        description: `We extend the post-hoc detection framework <a href="https://ojs.aaai.org/index.php/AAAI/article/view/37735">D-Plus-Minus</a> into Dual-Branch Conditional Sensitivity (DCS), a unified formulation that treats copyright infringement evidence as a counterfactual conditional distribution shift. We instantiate this framework across ridge-regularized linear regression, conditional diffusion models, autoregressive language models, and multimodal architectures. These applications demonstrate how a single underlying principle can be evaluated through distinct mechanisms: prediction gaps, image-embedding divergence, token-distribution or entropy shifts, and cross-modal representation changes.`,
        links: {
            arxiv: "https://arxiv.org/abs/2607.22035"
        }
    },
    {
        title: "ARSM: Auto-Regressive State Machine for Agentic Reasoning Compression",
        image: "pubs/arsm.png",
        imageRatio: "5118 / 1575",
        imageAlt: "Overview of the state transition mechanism. The model’s structured generation space is parsed to yield a discrete routing signal; atomic operators are then dynamically applied to update their respective layers.", 
        authors: ["Xiafeng Man*", "Siyuan Ye*", "Xiaosong Ma†"],
        venue: "arxiv",
        year: "2026",
        selected: true,
        types: ["selected", "preprint"],
        keywords: ["agent"],
        description: "We propose Auto-Regressive State Machine (ARSM), a lightweight training-free framework that enables in-situ reasoning compression through structured state evolution, without relying on external auxiliary models. ARSM reorganizes interaction histories into compact Hypothesis–Action–Result (HAR) micro-chains and utilizes a dynamic state machine to regulate hierarchical memory.",
        links: {
            code: "https://github.com/leo-xfm/ARSM",
            arxiv: "https://arxiv.org/abs/2609.32852"
        }
    },
    {
        title: "Copyright Infringement Detection in Text-to-Image Diffusion Models via Differential Privacy",
        image: "pubs/dpm/images/fig1.png",
        imageRatio: "1189 / 528",
        imageAlt: "Overview of the D-Plus-Minus Method. Given the neighbourhood images of the target image as the training subset, we fine-tune the text-to-image model towards two branch: learning and unlearning branch.",
        authors: ["Xiafeng Man", "Zhipeng Wei", "Jingjing Chen†"],
        venue: "aaai",
        loc: "Singapore",
        year: "2026",
        selected: true,
        types: ["selected", "oral"],
        keywords: ["safety", "cv"],
        description: "We formalize the concept of copyright infringement detection from the perspective of differential privacy, and introduce a novel post-hoc detection framework D-Plus-Minus (DPM), which identifies infringements by first simulating the inclusion or exclusion processes of a specific data and then quantifying their sensitivity metrics.",
        links: {
            paper: "https://ojs.aaai.org/index.php/AAAI/article/view/37735",
            arxiv: "https://arxiv.org/abs/2509.23022",
            code: "https://github.com/leo-xfm/DPM-copyright-infringement-detection",
            dataset: "https://drive.google.com/file/d/15Y7IWIBus6Fxd9jNwVoBUAY3Ob25jgkS/view?usp=sharing",
            project: "pubs/dpm"
        }
    }
];

const TYPE_LABELS = { selected: "Selected", poster: "Poster", highlight: "Highlight", oral: "Oral", preprint: "Preprint" };
const KEYWORD_LABELS = { 
    cv: "Computer Vision",
    agent: "LLM Agent", 
    safety: "AI Safety"
};

const venueTemplates = {
    // general
    arxiv: "arXiv Preprint",
    icml: "The International Conference on Machine Learning (<strong>ICML</strong>)",
    nips: "The Conference on Neural Information Processing Systems (<strong>NeurIPS</strong>)",
    iclr: "The International Conference on Learning Representations (<strong>ICLR</strong>)",
    aaai: "The Association for the Advancement of Artificial Intelligence (<strong>AAAI</strong>)",
    // robotics
    icra: "The International Conference on Robotics and Automation (<strong>ICRA</strong>)",
    rss: "The Robotics: Science and Systems (<strong>RSS</strong>)",
    // vision
    cvpr: "The IEEE/CVF Conference on Computer Vision and Pattern Recognition (<strong>CVPR</strong>)",
    eccv: "The European Conference on Computer Vision (<strong>ECCV</strong>)",
    iccv: "The International Conference on Computer Vision (<strong>ICCV</strong>)",
    // graphics
    siggraph: "The ACM International Conference on Computer Graphics and Interactive Techniques (<strong>ACM SIGGRAPH</strong>)",
    acmmm: "The ACM International Conference on Multimedia (<strong>ACM MM</strong>)",
    // llm
    acl: "The Association for Computational Linguistics (<strong>ACL</strong>)",
    emnlp: "The Conference on Empirical Methods in Natural Language Processing (<strong>EMNLP</strong>)",
};

function filterUrlForType(type) {
    return `publications.html?type=${encodeURIComponent(type)}`;
}

function filterUrlForKeyword(keyword) {
    return `publications.html?keyword=${encodeURIComponent(keyword)}`;
}

function renderPublicationTypes(publication, hiddenTypes = []) {
    const types = publication.types.filter((type) => !hiddenTypes.includes(type));
    return types.length === 0 ? "" : `
        <div class="publication-types" aria-label="Publication type labels">
            ${types.map((type) => `<a class="publication-type type-${type}" href="${filterUrlForType(type)}">${TYPE_LABELS[type] || type}</a>`).join("")}
        </div>
    `;
}

function renderPublicationKeywords(publication) {
    if (publication.keywords.length === 0) {
        return "";
    }

    return `
        <div class="publication-keywords" aria-label="Publication keywords">
            ${publication.keywords.map((keyword) => `<a class="publication-keyword keyword-${keyword}" href="${filterUrlForKeyword(keyword)}">${KEYWORD_LABELS[keyword] || keyword}</a>`).join("")}
        </div>
    `;
}

function renderAuthors(authors, myName) {
    return authors
        .map((author) => author.includes(myName) ? `<strong>${author}</strong>` : author)
        .join(", ");
}

function renderVenue(publication) {
    return [venueTemplates[publication.venue], publication.type, publication.loc, publication.year]
        .filter(Boolean)
        .join(", ");
}

function renderBadge(badge) {
    return badge ? `<span class="publication-badge">(${badge})</span>` : "";
}

function renderDescription(description) {
    return description ? `<div class="publication-summary"><div><p class="description" lang="en">${description}</p></div></div>` : "";
}

function renderLink(url, text) {
    return url ? `<a href="${url}" target="_blank" rel="noopener">[${text}]</a>` : "";
}

function renderLinks(links) {
    return links ? `
        <div class="links">
            ${[
                renderLink(links.paper, "Paper"),
                renderLink(links.arxiv, "arXiv"),
                renderLink(links.code, "Code"),
                renderLink(links.dataset, "Dataset"),
                renderLink(links.project, "Project")
            ].filter(Boolean).join(" ")}
        </div>
    ` : "";
}

function renderPublicationCard(publication, hiddenTypes = []) {
    return `
        <div class="publication" tabindex="0" aria-label="${publication.title}" data-year="${publication.year}" data-types="${publication.types.join(" ")}" data-keywords="${publication.keywords.join(" ")}">
            <div class="publication-layout${publication.image ? " publication-with-image" : ""}">
            <div class="publication-header">
            <div class="publication-badges">
                ${renderPublicationTypes(publication, hiddenTypes)}
                ${renderPublicationKeywords(publication)}
            </div>
            <p class="title">${publication.title}</p>
            </div>
            <div class="publication-details">
            <p class="authors">${renderAuthors(publication.authors, "Xiafeng Man")}</p>
            <p class="venue">${renderVenue(publication)}</p>
                ${renderDescription(publication.description)}
            ${renderLinks(publication.links)}
            </div>
                ${publication.image ? `<figure class="publication-figure"><div class="publication-image-frame" style="--image-ratio: ${publication.imageRatio};"><img class="publication-image" src="${publication.image}" alt="${publication.imageAlt}" loading="lazy"></div><figcaption class="publication-image-caption"><span>${publication.imageAlt}</span></figcaption></figure>` : ""}
            </div>
        </div>
    `;
}

function renderSelectedPublications() {
    const mount = document.querySelector("[data-selected-publications]");
    if (!mount) {
        return;
    }

    mount.innerHTML = `
        <p class="publication-note">( * <i>equal contribution</i>, &dagger; <i>corresponding author</i> )</p>
        ${SITE_PUBLICATIONS.filter((publication) => publication.selected).map((publication) => renderPublicationCard(publication, ["selected"])).join("")}
    `;
}

function getOrderedKeywords() {
    const keywords = new Set();
    SITE_PUBLICATIONS.forEach((publication) => publication.keywords.forEach((keyword) => keywords.add(keyword)));
    return [...keywords].sort();
}

function renderPublicationFilters() {
    const mount = document.querySelector("[data-publication-filters]");
    if (!mount) {
        return;
    }

    const years = [...new Set(SITE_PUBLICATIONS.map((publication) => publication.year))].sort((a, b) => b.localeCompare(a));
    const keywords = getOrderedKeywords();
    mount.innerHTML = `
        <div class="filter-group" data-filter-group="year">
            <span>Year</span>
            <button class="filter-button active" type="button" data-filter-type="year" data-filter-value="all">All</button>
            ${years.map((year) => `<button class="filter-button" type="button" data-filter-type="year" data-filter-value="${year}">${year}</button>`).join("")}
        </div>
        <div class="filter-group" data-filter-group="type">
            <span>Type</span>
            <button class="filter-button active" type="button" data-filter-type="type" data-filter-value="all">All</button>
            ${PUBLICATION_TYPES.map((type) => `<button class="filter-button type-${type}" type="button" data-filter-type="type" data-filter-value="${type}">${TYPE_LABELS[type]}</button>`).join("")}
        </div>
        <div class="filter-group" data-filter-group="keyword">
            <span>Keyword</span>
            <button class="filter-button active" type="button" data-filter-type="keyword" data-filter-value="all">All</button>
            ${keywords.map((keyword) => `<button class="filter-button keyword-${keyword}" type="button" data-filter-type="keyword" data-filter-value="${keyword}">${KEYWORD_LABELS[keyword] || keyword}</button>`).join("")}
        </div>
    `;
}

function getInitialFilterState() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") || params.get("tag");
    const year = params.get("year");
    const keyword = params.get("keyword");
    const validTypes = new Set(PUBLICATION_TYPES);
    const validYears = new Set(SITE_PUBLICATIONS.map((publication) => publication.year));
    const validKeywords = new Set(getOrderedKeywords());

    return {
        year: validYears.has(year) ? year : "all",
        type: type === "all" ? "all" : validTypes.has(type) ? type : "selected",
        keyword: keyword === "all" ? "all" : validKeywords.has(keyword) ? keyword : "all"
    };
}

function applyPublicationFilters(filterState) {
    document.querySelectorAll(".filter-button").forEach((button) => {
        button.classList.toggle("active", filterState[button.dataset.filterType] === button.dataset.filterValue);
    });

    document.querySelectorAll(".publication[data-year]").forEach((publication) => {
        const yearMatches = filterState.year === "all" || publication.dataset.year === filterState.year;
        const typeMatches = filterState.type === "all" || publication.dataset.types.split(" ").includes(filterState.type);
        const keywordMatches = filterState.keyword === "all" || publication.dataset.keywords.split(" ").includes(filterState.keyword);
        publication.hidden = !(yearMatches && typeMatches && keywordMatches);
    });
}

function initPublicationPage() {
    const mount = document.querySelector("[data-publications-list]");
    if (!mount) {
        return;
    }

    renderPublicationFilters();
    mount.innerHTML = `
        <p class="publication-note">( * <i>equal contribution</i>, &dagger; <i>corresponding author</i> )</p>
        ${SITE_PUBLICATIONS.map((publication) => renderPublicationCard(publication)).join("")}
    `;

    const filterState = getInitialFilterState();
    applyPublicationFilters(filterState);
    document.querySelectorAll(".filter-button").forEach((button) => {
        button.addEventListener("click", () => {
            filterState[button.dataset.filterType] = button.dataset.filterValue;
            applyPublicationFilters(filterState);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderSelectedPublications();
    initPublicationPage();
});
