import React from 'react';

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="rounded flex bg-white shadow p-4 items-center gap-4">
      <div className={`text-3xl flex justify-center items-center ${color} text-white px-4 py-3 rounded`}>
        {icon}
      </div>
      <div>
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-2xl font-bold">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
