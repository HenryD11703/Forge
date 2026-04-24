import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export function CreatorForm({ user }: { user: any }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [htmlTemplate, setHtmlTemplate] = useState('<!-- Escribe aquí tu plantilla base de HTML -->\n');
  const [cssTemplate, setCssTemplate] = useState('/* Escribe aquí tu plantilla inicial de CSS */\n');
  const [instruction, setInstruction] = useState('REGLA ESTRICTA 1: ...');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const generateSlug = (text: string) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const slug = generateSlug(title);
      
      const { error } = await supabase.from('exercises').insert({
        id: uuidv4(),
        slug: slug,
        title: title,
        description: description,
        html_template: htmlTemplate,
        css_template: cssTemplate,
        instruction_for_ai: instruction,
        status: 'pending',
        author_id: user.id
      });

      if (error) throw error;
      
      setMessage('¡Misión enviada al cuartel! Está en espera de aprobación por un Admin.');
      setTitle('');
      setDescription('');
      
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-swiss">
      <h3>Crear Nueva Misión (Borrador)</h3>
      <p>Este borrador será enviado a la cola de revisión. Una vez que el Administrador lo apruebe, todos los estudiantes verán tu ejercicio en su VS Code.</p>
      
      {message && (
        <div style={{ marginBottom: 20, padding: 15, background: message.includes('Error') ? '#FEE' : '#E8F5E9', border: `2px solid ${message.includes('Error') ? 'red' : 'green'}`, fontWeight: 'bold' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid-2">
          <div className="form-group">
            <label>Título de la Misión</label>
            <input 
              required
              type="text" 
              placeholder="Ej: El Alien Flotante" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Descripción Corta</label>
            <input 
              required
              type="text" 
              placeholder="Centra el texto usando grid o flex..." 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
            />
          </div>
        </div>

        <div className="grid-2">
           <div className="form-group">
            <label>Plantilla HTML Inicial</label>
            <textarea 
              required
              value={htmlTemplate}
              onChange={e => setHtmlTemplate(e.target.value)}
            />
          </div>
           <div className="form-group">
            <label>Plantilla CSS Inicial</label>
            <textarea 
              required
              value={cssTemplate}
              onChange={e => setCssTemplate(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Instrucciones Estrictas para la Inteligencia Artificial</label>
          <p style={{ fontSize: '0.9rem', marginBottom: 10 }}>Dile a la IA exactamente qué verificar, con un formato restrictivo.</p>
          <textarea 
            required
            value={instruction}
            onChange={e => setInstruction(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Desplegar Misión al Control Central'}
        </button>
      </form>
    </div>
  );
}
