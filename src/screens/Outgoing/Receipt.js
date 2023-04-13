import React from "react";

function Receipt({ innerRef, cart }) {
  //   console.log("insiede receipt", cart);
  return (
    <div className="cst-print-only" ref={innerRef}>
      Receipt
      <div>
        {cart.map((i, index) => (
          <h5 key={index}>{i.itemName}</h5>
        ))}
      </div>
    </div>
  );
}

export default Receipt;
