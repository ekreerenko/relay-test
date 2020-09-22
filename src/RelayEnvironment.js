import { Environment, Network, RecordSource, Store } from 'relay-runtime';

async function fetchRelay(params, variables) {
  const authToken = localStorage.getItem('authToken');
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  }
  if (authToken) {
      options.headers['Authorization'] = `bearer ${authToken}`;
  }

  const response = await fetch('http://api.collegeofrhubarb.org:8080/graphql', options);

  const json = await response.json();

  if (Array.isArray(json.errors)) {
    console.log(json.errors);
    throw new Error(
      `Error fetching GraphQL query '${
        params.name
      }' with variables '${JSON.stringify(variables)}': ${JSON.stringify(
        json.errors,
      )}`,
    );
  }
  return json;
}

export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
