import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );

  function UpdatedAt() {
    const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
      refreshInterval: 2000,
    });

    let updatedAtText = "Carregando...";

    if (!isLoading && data) {
      updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    }

    return <p>♻️ Last update: {updatedAtText}</p>;
  }

  function DatabaseStatus() {
    const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
      refreshInterval: 2000,
    });

    let databaseStatus = "Loading...";
    if (!isLoading && data) {
      databaseStatus = (
        <div>
          <p>🗃️ Version: {data.dependencies.database.version}</p>
          <p>
            📈 Opened Connections:{" "}
            {data.dependencies.database.current_connections}
          </p>
          <p>
            🔒 Max Connections: {data.dependencies.database.max_connections}
          </p>
        </div>
      );
    }
    return (
      <>
        <h2>Database</h2>
        {databaseStatus}
      </>
    );
  }
}
