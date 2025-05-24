const Connexion = () => {
  const clientId = import.meta.env.VITE_STRAVA_CLIENT_ID as string;
  const webAppURL = import.meta.env.VITE_WEB_APP_URL as string;

  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center mt-10 mb-5">
        My Personnal Strava App
      </h1>
      <a
        className="text-blue-500 hover:text-blue-700 text-center block"
        href={`http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${webAppURL}/home&approval_prompt=force&scope=read,read_all,profile:read_all,profile:write,activity:read,activity:read_all,activity:write`}
      >
        Connexion / Authorisation
      </a>
    </div>
  );
};

export default Connexion;
