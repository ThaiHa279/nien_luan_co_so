import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';


export const Example = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef}>print content</div> 
    </div>
  );
};