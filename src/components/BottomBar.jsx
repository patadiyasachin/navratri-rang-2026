import React from "react";
import { contactNumbers } from "../data/content";

export default function BottomBar() {
  return (
    <div className="bottom-bar">
      <a className="call-button" href={`tel:+91${contactNumbers[0].replace(/\s/g, "")}`}>
        BOOK YOUR PASS
      </a>
      <div className="phone-list">
        {contactNumbers.map((number) => (
          <a key={number} href={`tel:+91${number.replace(/\s/g, "")}`}>
            +91 {number}
          </a>
        ))}
      </div>
    </div>
  );
}