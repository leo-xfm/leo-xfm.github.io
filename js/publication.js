
const publications = [
    {
        title: "ARSM: Auto-Regressive State Machine for Agentic Reasoning Compression",
        authors: ["Xiafeng Man*", "Xiaosong Ma*†", "Siyuan Ye*"],
        // venue: "arxiv",
        // year: "2026",
        description: "We propose Auto-Regressive State Machine (ARSM), a lightweight framework that enables in-situ reasoning compression through structured state evolution, without relying on external auxiliary models. ARSM reorganizes interaction histories into compact Hypothesis–Action–Result (HAR) micro-chains and utilizes a dynamic state machine to regulate hierarchical memory."
    },
    {
        title: "Copyright Infringement Detection in Text-to-Image Diffusion Models via Differential Privacy",
        authors: ["Xiafeng Man", "Zhipeng Wei", "Jingjing Chen†"],
        venue: "aaai",
        loc: "Singapore",
        year: "2026",
        badge: "Oral",
        description: "We formalize the concept of copyright infringement detection from the perspective of differential privacy, and introduce a novel post-hoc detection framework D-Plus-Minus (DPM), which identifies infringements by first simulating the inclusion or exclusion processes of a specific data and then quantifying their sensitivity metrics.",
        links: { 
            paper: "https://ojs.aaai.org/index.php/AAAI/article/view/37735", 
            arxiv: "https://arxiv.org/abs/2509.23022", 
            code: "https://github.com/leo-xfm/DPM-copyright-infringement-detection", 
            dataset: "https://drive.google.com/file/d/15Y7IWIBus6Fxd9jNwVoBUAY3Ob25jgkS/view?usp=sharing",
            project: "./pubs/dpm" 
        }
    }
];

const venueTemplates = {
    icml: "The International Conference on Machine Learning (<strong>ICML</strong>)",
    nips: "The Conference on Neural Information Processing Systems (<strong>NeurIPS</strong>)",
    iclr: "The International Conference on Learning Representations (<strong>ICLR</strong>)",
    cvpr: "The IEEE/CVF Conference on Computer Vision and Pattern Recognition (<strong>CVPR</strong>)",
    eccv: "The European Conference on Computer Vision (<strong>ECCV</strong>)",
    iccv: "The International Conference on Computer Vision (<strong>ICCV</strong>)",
    acmmm: "The ACM International Conference on Multimedia (<strong>ACM MM</strong>)",
    acl: "The Association for Computational Linguistics (<strong>ACL</strong>)",
    emnlp: "The Conference on Empirical Methods in Natural Language Processing (<strong>EMNLP</strong>)",
    aaai: "The Association for the Advancement of Artificial Intelligence (<strong>AAAI</strong>)",
    arxiv: "arXiv Preprint"
};


function renderPublications() {
    const myName = "Xiafeng Man";
    const container = document.getElementById('pub-container');
    
    container.innerHTML = publications.map(pub => `
        <div class="publication">
            <p class="title">${pub.title}</p>
            <p class="authors">
                ${renderAuthors(pub.authors, myName)}
            </p>
            <p class="venue">
                ${renderVenue(pub)} ${renderBadge(pub.badge)}
            </p>
            ${renderDescription(pub.description)}
            ${renderLinks(pub.links)}
        </div>
    `).join('');
}

function renderAuthors(authors, myName) {
    return authors
        .map(author => author.includes(myName) ? `<strong>${author}</strong>` : author)
        .join(', ');
}

function renderVenue(pub) {
    return [venueTemplates[pub.venue], pub.type, pub.loc, pub.year]
        .filter(item => item)
        .join(', ');
}

function renderBadge(badge) {
    return badge ? `<span style="font-size: inherit; color: #8b0000; font-weight: 700;">(${badge})</span>` : '';
}

function renderDescription(description) {
    return description ? `<p class="description">${description}</p>` : '';
}

function renderLink(url, text) {
    return url ? `<a href="${url}" target="_blank">[${text}]</a>` : '';
}

function renderLinks(links) {
    return links ? `
        <div class="links">
            ${renderLink(links.paper, "Paper")}
            ${renderLink(links.arxiv, "arXiv")}
            ${renderLink(links.code, "Code")}
            ${renderLink(links.dataset, "Dataset")}
            ${renderLink(links.project, "Project")}
        </div>
    ` : '';
}

renderPublications();
