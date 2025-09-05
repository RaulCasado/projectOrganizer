import { Link } from 'react-router-dom';

function IdeasHeader() {
  return (
    <div>
      <div>
        <h1>🧠 Lluvia de Ideas</h1>
        <p>Captura, organiza y convierte tus ideas en proyectos</p>
      </div>

      <div>
        <Link to="/">← Volver a Proyectos</Link>
        <Link to="/dashboard">📊 Dashboard</Link>
      </div>
    </div>
  );
}

export default IdeasHeader;
