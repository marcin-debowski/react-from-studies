const fs = require('node:fs/promises');

async function getStoredPosts() {
  const rawFileContent = await fs.readFile('./storage/posts.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedPosts = data.posts ?? [];
  const storedIndex = data.index ?? 0;
  return {storedIndex, storedPosts};
}

function storePosts(newIndex, posts) {
  return fs.writeFile('./storage/posts.json', JSON.stringify({index: newIndex || 0, posts: posts || [] }));
}

exports.getStoredPosts = getStoredPosts;
exports.storePosts = storePosts;