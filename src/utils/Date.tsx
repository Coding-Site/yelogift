import React, { useState } from 'react'

function DateFormat({date}: any) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.toLocaleString("en-US", { month: "long" });
    const day = dateObj.toLocaleString("en-US", { day: "2-digit" });
    
  
    return (
      <div>
        <span>{day} </span>
        <span>{month} </span>
        <span>{year}</span>
      </div>
    );
  
}

export default DateFormat