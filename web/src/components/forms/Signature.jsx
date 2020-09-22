import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { CanvasTextWrapper, CanvasText, CanvasWrapper } from './SignatureStyles';

export default function Signature({ setSignature }) {
  const signature = useRef(null);

  const handleSignature = () => {
    setSignature(signature.current.toDataURL());
  };

  return (
    <CanvasWrapper>
      <SignatureCanvas
        penColor='green'
        canvasProps={{ width: 318, height: 150 }}
        clearOnResize={false}
        backgroundColor='#e8e8e8'
        ref={signature}
        onEnd={handleSignature}
      />
      <CanvasTextWrapper>
        <CanvasText>
          <span style={{ color: '#4975bc', fontWeight: 'bold' }}>Volunteer Signature:</span> Sign in the rectangular
          canvas above (optional).
        </CanvasText>
      </CanvasTextWrapper>
    </CanvasWrapper>
  );
}
