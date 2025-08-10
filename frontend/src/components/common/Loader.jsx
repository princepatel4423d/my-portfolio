import React from "react";
import { Spinner } from '@phosphor-icons/react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
      <Spinner className="animate-spin text-black" size={48} />
    </div>
  );
};

export default Loader; 