const fs = require("fs");
const path = require("path");

const root = __dirname;
const navTemplate = fs.readFileSync(path.join(root, "templates", "nav.html"), "utf8").trim();
const footerTemplate = fs.readFileSync(path.join(root, "templates", "footer.html"), "utf8").trim();

const pages = [
    { file: "index.html", homeUrl: "#top" },
    { file: "publications.html", homeUrl: "index.html" }
];

for (const page of pages) {
    const filePath = path.join(root, page.file);
    const source = fs.readFileSync(filePath, "utf8");
    const nav = navTemplate.replaceAll("{{HOME_URL}}", page.homeUrl);
    const output = source
        .replace(/<!-- SITE_NAV_START -->[\s\S]*?<!-- SITE_NAV_END -->/, `<!-- SITE_NAV_START -->\n${nav}\n<!-- SITE_NAV_END -->`)
        .replace(/<!-- SITE_FOOTER_START -->[\s\S]*?<!-- SITE_FOOTER_END -->/, `<!-- SITE_FOOTER_START -->\n${footerTemplate}\n<!-- SITE_FOOTER_END -->`)
        .replace(/<div data-site-nav><\/div>/, `<!-- SITE_NAV_START -->\n${nav}\n<!-- SITE_NAV_END -->`)
        .replace(/<footer data-site-footer><\/footer>/, `<!-- SITE_FOOTER_START -->\n${footerTemplate}\n<!-- SITE_FOOTER_END -->`);
    fs.writeFileSync(filePath, output);
}

console.log("Built shared navigation and footer into index.html and publications.html");
