export const renderHtmlContent = (name: string) => {
  const upperCaseName = name.toUpperCase();
  return ` <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 40px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333;
        font-size: 24px;
        margin-bottom: 20px;
      }
      p {
        color: #666;
        font-size: 16px;
        line-height: 1.6;
      }
      .cta-button {
        display: inline-block;
        background-color: #222025;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 6px;
        color: aliceblue;
        font-size: 18px;
        font-weight: 400;
        margin-top: 24px;
      }
       </style>
  </head>
  <body>
    <div class="container">
      <h1>¡Gracias por tu compra! ${upperCaseName}</h1>
      <p>¡Tu pago ha sido procesado exitosamente en Artes Pizarro!</p>
      <p>Fecha de compra: ${new Date().toLocaleDateString()}</p>
      <p>Visita nuestra página web para más detalles:</p>
      <a href="https://artespizarro.com/" class="cta-button" >Artes Pizarro</a>
    </div>
  </body>
</html>`;
};
