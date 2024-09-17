const App = () => {
  const env = import.meta.env;
  console.log("env", env);

  const api = import.meta.env.VITE_BACKEND_API;
  console.log("api", api);

  return (
    <div>
      <br />
      MODE : {env.MODE}
      <br />
      API: {api}
    </div>
  );
};

export default App;
