import React from 'react'
import './Campus.css'
import python from '../../assets/logos/python.png';
import java from '../../assets/logos/java.png';
import chash from '../../assets/logos/chash.png';
import delphi from '../../assets/logos/delphi.png';
import cobol from '../../assets/logos/cobol.png';
import vb from '../../assets/logos/vb.png';


 



const Campus = () => {
  const images = [
    python,chash ,delphi, java,cobol,vb, 
 ];
  return (
    <div className='skill-container'>
      <div className='skill-slider'>
        {images.concat(images).map((image, index) => (
          <img key={index} src={image} alt={`Skill ${index + 1}`} />
        ))}
      </div>
    </div>
    
  );
}

export default Campus
