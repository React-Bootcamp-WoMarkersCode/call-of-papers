import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const rodapeStyle = {
    background: '#1A5A79CC 0% 0% no-repeat padding-box',
    left: '0px',
    width: '100%',
    height: '107px',
    lineHeight: '107px',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }
  const conteudo = {
    font: 'Regular 40px/30px Roboto',
    color: '#F3F3F3',
    textDecorationColor: 'none', 
    padding: '0 120px'
  }

  return (
    <>
      <div style={rodapeStyle}>
      <div style={conteudo}>
         <Link to="/about" style={conteudo}>About</Link>
        </div>
        <div style={conteudo}>
          © Copyright Call For Papers 2020
        </div>
      </div>
    </>
  );
}

export default Footer;
