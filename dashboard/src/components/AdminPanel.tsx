import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function AdminPanel() {
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminAndFetch();
  }, []);

  const checkAdminAndFetch = async () => {
    // Verificar rol (Esto se hace mejor via RLS, pero para interfaz consultamos el profile)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role === 'admin') {
      setIsAdmin(true);
      fetchPending();
    } else {
      setLoading(false);
    }
  };

  const fetchPending = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('exercises')
      .select('*, author:users(github_username)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    
    if (data) setExercises(data);
    setLoading(false);
  };

  const approveExercise = async (id: string) => {
    await supabase.from('exercises').update({ status: 'approved' }).eq('id', id);
    fetchPending();
  };

  if (loading) return <p>Cargando panel de administrador...</p>;
  if (!isAdmin) return null; // No molestar a los mortales con UI que no pueden usar

  return (
    <div className="card-swiss" style={{ marginTop: 40, border: '2px solid var(--sw-accent)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="text-accent">Panel de Seguridad Administrativa</h3>
        <span style={{ background: 'var(--sw-accent)', color: '#fff', padding: '4px 8px', fontWeight: 'bold' }}>ADMIN</span>
      </div>
      <p>Revisa qué misiones fueron hechas por la comunidad y presiona "Aprobar" para que se refleje inmediatamente en el plugin de VS Code.</p>

      {exercises.length === 0 ? (
        <div style={{ padding: 20, background: 'var(--sw-muted)', fontWeight: 'bold' }}>No hay misiones pendientes de revisión. ¡Buen trabajo!</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {exercises.map(ex => (
            <div key={ex.id} style={{ border: '2px solid var(--sw-border)', padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4 style={{ margin: 0, fontWeight: 900 }}>{ex.title}</h4>
                <div style={{ fontWeight: 'bold', color: 'var(--sw-gray)' }}>
                  Por: @{ex.author?.github_username || 'Desconocido'}
                </div>
              </div>
              <p style={{ marginTop: 10 }}>{ex.description}</p>
              <div style={{ background: 'var(--sw-muted)', padding: 10, fontSize: '0.9rem', marginBottom: 15, fontFamily: 'monospace' }}>
                <strong>Prompt IA:</strong> <br/>
                {ex.instruction_for_ai}
              </div>
              <button onClick={() => approveExercise(ex.id)}>✅ Aprobar Públicamente</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
