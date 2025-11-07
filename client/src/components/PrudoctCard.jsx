import React from "react";

const PrudoctCard = (props) => {
  return (
    <a href={props.prudoct.id}>
      <div className="card flex justify-center items-center">
        <div>
          <img src={props.prudoct.img} alt="" />
        </div>
        <h3>{props.prudoct.name}</h3>
        <p>{props.prudoct.description}</p>
        <button className="bg-blue-500 p-2 m-2 w-50">add to card</button>
      </div>
    </a>
  );
};

export default PrudoctCard;
