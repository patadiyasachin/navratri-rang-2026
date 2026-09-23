import React from "react";
import { contactNumbers } from "../data/content";

export default function BottomBar() {
  const officeAddress = "૧-પારસમણી કોમ્પ્લેક્ષ, રાજમંદિર કૉલ્ડ્રીંક્સની બાજુમાં, પેલેસ રોડ, રાજકોટ.";

  return (
    <div className="bottom-bar">
      <div className="bottom-bar-row top-row">
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

      <div className="bottom-bar-row address-row">
        <span className="address-line">{officeAddress}</span>
      </div>
    </div>
  );
}