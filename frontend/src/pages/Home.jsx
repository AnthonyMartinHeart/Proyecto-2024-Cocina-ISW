const Home = () => {
  return (
    <>
      <div style={{ textAlign: 'center', padding: '0', margin: '0', position: 'relative', height: '100vh' }}>
        {/* Imagen de fondo */}
        <img 
          src="/image.png" // Ruta a la imagen de fondo en la carpeta public
          alt="Cocina" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', // Asegura que la imagen cubra todo el espacio
            position: 'absolute', 
            top: '0', 
            left: '0' 
          }} 
        />
        
        {/* Logo centrado */}
        <img 
          src="/1729831877440.png" // Ruta al logo en la carpeta public
          alt="Logo" 
          style={{ 
            width: 'auto', // Ajusta el ancho automáticamente
            height: '450px', // Aumenté la altura para hacerlo más grande
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', // Centra la imagen
            zIndex: 2 // Asegura que el logo esté por encima de la imagen de fondo
          }} 
        />
        
        <h1 style={{ position: 'relative', zIndex: 1, color: 'white', marginTop: '20px' }}>

        </h1>
      </div>
    </>
  );
};

export default Home;
