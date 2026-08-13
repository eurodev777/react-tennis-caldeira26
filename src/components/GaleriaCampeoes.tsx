import React from 'react';
import feminino from '../assets/1.jpeg'
import masculino from '../assets/2.jpeg'

export default function GaleriaCampeoes({ onCheckResults }) {
  const data = [
    {
      id: 1,
      titulo: "Campeões Ouro Masculino",
      time: "Cooper",
      imgUrl: masculino,
      hasHighlightBorder: true
    },
    {
      id: 2,
      titulo: "Campeãs Ouro Feminino",
      time: "Cooper Longway",
      imgUrl: feminino,
      hasHighlightBorder: false
    }
  ];

  return (
    <div style={{
      fontFamily: 'Segoe UI, Roboto, sans-serif',
      backgroundColor: '#f6f1eb', // Cor de fundo bege idêntica à imagem
      minHeight: '100vh',
      padding: '30px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '0 auto',
      boxSizing: 'border-box'
    }}>
      
      {/* Lista de Blocos de Campeões */}
      {data.map((item) => (
        <div key={item.id} className="" style={{ marginBottom: '35px', textAlign: 'center' }}>
          
          {/* Títulos */}
          <h2 style={{ 
            color: '#c49a6c', 
            margin: '0 0 2px 0', 
            fontWeight: '400', 
            fontSize: '1.25rem',
            letterSpacing: '0.5px'
          }}>
            {item.titulo}
          </h2>
          <h3 style={{ 
            color: '#8b683e', 
            margin: '0 0 15px 0', 
            fontWeight: 'bold', 
            fontSize: '1.4rem' 
          }}>
            {item.time}
          </h3>

          {/* Container da Imagem */}
          <div style={{
            width: '100%',
            borderRadius: '4px',
            overflow: 'hidden',
            boxSizing: 'border-box',
            border: item.hasHighlightBorder ? '6px solid #8b5cf6' : 'none', // Borda roxa de destaque na primeira imagem
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}>
            <img 
              src={item.imgUrl} 
              alt={`${item.titulo} - ${item.time}`} 
              style={{
                width: '100%',
                display: 'block',
                objectFit: 'cover',
                aspectRatio: '4 / 3'
              }}
            />
          </div>

        </div>
      ))}

      {/* Botão de Ação Inferior */}
      <button 
        onClick={onCheckResults}
        style={{
          width: '100%',
          backgroundColor: '#b89460', // Tom dourado/marrom do botão original
          color: '#ffffff',
          border: 'none',
          borderRadius: '12px',
          padding: '16px 20px',
          fontSize: '1.15rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginTop: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'background-color 0.2s ease',
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#a38152'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#b89460'}
      >
        Clique aqui e confira todos os resultados
      </button>

    </div>
  );
}