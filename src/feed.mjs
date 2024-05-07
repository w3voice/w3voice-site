import {Feed} from "feed";
import {readFileSync, writeFileSync} from 'fs';
import {join} from "path";

const webSite = "https://w3voice.net"
const author = {
    name: "Glazlk",
    link: "https://t.me/glazlk"
}
const feed = new Feed({
    title: "Web3 Voice",
    description: "We are the Web3 Voice community, uniting enthusiasts and professionals interested in Web3 technologies.",
    id: webSite,
    link: `${webSite}/`,
    language: "ru", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: `${webSite}/poster.png`,
    copyright: "All rights reserved 2021, Web3 Voice community",
    generator: "https://github.com/jpmonette/feed",
    feedLinks: {
        json: `${webSite}/feed.json`,
        atom: `${webSite}/atom.json`,
    },
    author,
});

const data = readFileSync(join('public', 'data.json'), 'utf8');
const posts = JSON.parse(data);
posts.forEach(post => {
    const date = new Date(post.date || post.published)
    const guid = `${date.getFullYear().toString().slice(2)}${date.getMonth()}${date.getDay()}${date.getHours()}`
    feed.addItem({
        title: post.title,
        guid,
        link: `${webSite}/${guid}`,
        description: post.description,
        content: post.content || "",
        author: post.author || [author],
        contributor: post.contributor,
        date,
        published: new Date(post.published || post.date),
        image: post.image,
        audio: post.audio,
    });
});

feed.addCategory("technologies");
feed.addCategory("web3");
feed.addCategory("blockchain");

feed.addContributor({
    name: "Ilyar",
    link: "https://t.me/ilyarsoftware"
});

writeFileSync(join('public', 'feed.xml'), feed.rss2());
// Output: Atom 1.0
writeFileSync(join('public', 'atom.xml'), feed.atom1());
// Output: JSON Feed 1.0
writeFileSync(join('public', 'feed.json'), feed.json1());
