const fs = require('fs');
const path = require('path');

const docsDir = path.join(process.cwd(), 'docs');
if (!fs.existsSync(docsDir)) {
    console.error('docs directory not found');
    process.exit(1);
}

const normalizeMediaUrl = (encodedUrl) => {
    let decoded = encodedUrl;
    try {
        decoded = decodeURIComponent(encodedUrl.replace(/\+/g, '%20'));
    } catch (err) {
        decoded = encodedUrl;
    }

    decoded = decoded.replace(/\\/g, '/');
    decoded = decoded.replace('/rasen-web//_next/', '/rasen-web/_next/');
    if (decoded.startsWith('/_next/')) {
        decoded = `/rasen-web${decoded}`;
    }
    return decoded;
};

const files = fs.readdirSync(docsDir).filter((file) => file.endsWith('.html'));
for (const file of files) {
    const filePath = path.join(docsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    content = content.replace(
        /(?:\/rasen-web)?\/_next\/image\?url=([^&"' ]+?)(?:&amp;w=(\d+))?(?:&amp;q=\d+)?(?:\s+(\d+w))?/g,
        (match, encodedUrl, width, widthLabel) => {
            const mediaPath = normalizeMediaUrl(encodedUrl);
            if (widthLabel) return `${mediaPath} ${widthLabel}`;
            if (width) return `${mediaPath} ${width}w`;
            return mediaPath;
        }
    );

    content = content.replace(
        /src=(['"])(\/rasen-web\/_next\/static\/media\/[^"']+?)\s+\d+w\1/g,
        'src=$1$2$1'
    );
    content = content.replace(/(\d+w)\s+\1/g, '$1');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched', filePath);
}
console.log('Done');
