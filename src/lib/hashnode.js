export async function fetchHashnodePosts(options) {
  const { host, username, token, limit = 6 } = options || {};
  const endpoint = "https://gql.hashnode.com";

  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  // 1) Try by publication host (preferred for custom/sub domains)
  if (host) {
    const queryByHost = `
      query Publication($host: String!, $first: Int!, $after: String) {
        publication(host: $host) {
          posts(first: $first, after: $after) {
            edges { cursor node { id title brief slug url coverImage { url } publishedAt } }
            pageInfo { hasNextPage endCursor }
          }
        }
      }
    `;

    let collected = [];
    let after = null;
    while (collected.length < limit) {
      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          query: queryByHost,
          variables: {
            host,
            first: Math.min(10, limit - collected.length),
            after,
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`Hashnode request failed: ${res.status}`);
      }

      const json = await res.json();
      console.log("json:", json);

      if (json?.errors?.length) {
        throw new Error(json.errors.map((e) => e.message).join("; "));
      }
      const data = json?.data?.publication?.posts;
      const edges = data?.edges || [];
      collected = collected.concat(edges.map((e) => e.node));
      if (!data?.pageInfo?.hasNextPage) break;
      after = data.pageInfo.endCursor;
    }

    if (collected.length > 0) return collected.slice(0, limit);
  }

  // 2) Fallback: by username → user's publication posts
  if (username) {
    const queryByUser = `
      query UserPublication($username: String!, $first: Int!, $after: String) {
        user(username: $username) {
          publication {
            posts(first: $first, after: $after) {
              edges { cursor node { id title brief slug url coverImage { url } publishedAt } }
              pageInfo { hasNextPage endCursor }
            }
          }
        }
      }
    `;

    let collected2 = [];
    let after2 = null;
    while (collected2.length < limit) {
      const res2 = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          query: queryByUser,
          variables: {
            username,
            first: Math.min(10, limit - collected2.length),
            after: after2,
          },
        }),
      });

      if (!res2.ok) {
        throw new Error(`Hashnode request failed: ${res2.status}`);
      }

      const json2 = await res2.json();
      if (json2?.errors?.length) {
        throw new Error(json2.errors.map((e) => e.message).join("; "));
      }
      const data2 = json2?.data?.user?.publication?.posts;
      const edges2 = data2?.edges || [];
      collected2 = collected2.concat(edges2.map((e) => e.node));
      if (!data2?.pageInfo?.hasNextPage) break;
      after2 = data2.pageInfo.endCursor;
    }

    if (collected2.length > 0) return collected2.slice(0, limit);
  }

  return [];
}
