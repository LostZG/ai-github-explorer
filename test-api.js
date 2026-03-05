async function test() {
  const query = 'ai OR llm OR "machine learning" OR "computer vision" stars:>5000';
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=30`;
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Test' }
  });
  console.log('Status:', response.status);
  const data = await response.json();
  if (data.items) {
    console.log('Success, found', data.items.length, 'items');
  } else {
    console.log('Error:', data);
  }
}
test();
