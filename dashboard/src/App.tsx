import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { CreatorForm } from './components/CreatorForm';
import { AdminPanel } from './components/AdminPanel';
import './index.css';

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escuchar el estado de autenticación
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const loginWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
    if (error) console.error("Error al loguear: ", error.message);
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: 100 }}><h1>CARGANDO SISTEMAS...</h1></div>;

  return (
    <>
      <div className="header">
        <div className="brand">Launchpad // Creator Hub</div>
        <div>
          {session ? (
            <button className="btn-outline" onClick={logout}>Desconectar</button>
          ) : (
            <div style={{ fontWeight: 800 }}>V.1.0</div>
          )}
        </div>
      </div>

      <div className="container">
        {!session ? (
          <div className="card-swiss" style={{ textAlign: 'center', padding: '60px 20px', marginTop: 40 }}>
            <h1>FORJA EL FUTURO</h1>
            <h2>DE LA PROGRAMACIÓN</h2>
            <p style={{ margin: '0 auto 40px auto' }}>Únete al Creator Hub para diseñar misiones interactivas y retar a miles de estudiantes en su propio editor de código base cero.</p>
            <button onClick={loginWithGithub}>INICIAR SESIÓN CON GITHUB</button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ textTransform: 'none', letterSpacing: '-0.04em' }}>Hola, <span className="text-accent">{session.user.user_metadata?.preferred_username || session.user.email}</span>.</h2>
              <p>El hub está activo. Diseña misiones impecables y no olvides probarlas antes de enviar a los administradores.</p>
            </div>
            
            <CreatorForm user={session.user} />
            <AdminPanel />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
