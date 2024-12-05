import React, { useState } from "react";

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [interest, setInterest] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [monthlyInstallment, setMonthlyInstallment] = useState(0);

  const calculateLoanDetails = () => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate) / 100 || 0; // Convert rate to decimal
    const t = parseFloat(loanTerm) || 0;

    const calculatedInterest = p * r * t;
    const calculatedLoanAmount = p + calculatedInterest;
    const calculatedMonthlyInstallment = t > 0 ? calculatedLoanAmount / (t ) : 0;

    setInterest(calculatedInterest.toFixed(2));
    setLoanAmount(calculatedLoanAmount.toFixed(2));
    setMonthlyInstallment(calculatedMonthlyInstallment.toFixed(2));
  };

  return (
    <div className="row">
      {/* Principal */}
      <div className="col-md-6 mb-4">
        <label htmlFor="principal" className="form-label text-primary">Principal</label>
        <div className="input-group">
          <div className="input-group-text bg-light text-muted">GH¢</div>
          <input
            type="number"
            className="form-control form-control-sm"
            id="principal"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
      </div>

      {/* Rate */}
      <div className="col-md-6 mb-4">
        <label htmlFor="rate" className="form-label text-primary">Rate</label>
        <div className="input-group">
          <div className="input-group-text bg-light text-muted">%</div>
          <input
            type="number"
            className="form-control form-control-sm"
            id="rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
      </div>

      {/* Loan Term */}
      <div className="col-md-6 mb-4">
        <label htmlFor="loanTerm" className="form-label text-primary">Loan Term (Years)</label>
        <div className="input-group">
          <input
            type="number"
            className="form-control form-control-sm"
            id="loanTerm"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            placeholder="0"
            required
          />
        </div>
      </div>

      {/* Calculated Interest */}
      <div className="col-md-6 mb-4">
        <label className="form-label text-primary">Interest</label>
        <div className="input-group">
          <div className="input-group-text bg-light text-muted">GH¢</div>
          <input
            type="text"
            className="form-control form-control-sm"
            value={interest}
            readOnly
          />
        </div>
      </div>

      {/* Loan Amount */}
      <div className="col-md-6 mb-4">
        <label className="form-label text-primary">Loan Amount</label>
        <div className="input-group">
          <div className="input-group-text bg-light text-muted">GH¢</div>
          <input
            type="text"
            className="form-control form-control-sm"
            value={loanAmount}
            readOnly
          />
        </div>
      </div>

      {/* Monthly Installment */}
      <div className="col-md-6 mb-4">
        <label className="form-label text-primary">Monthly Installment</label>
        <div className="input-group">
          <div className="input-group-text bg-light text-muted">GH¢</div>
          <input
            type="text"
            className="form-control form-control-sm"
            value={monthlyInstallment}
            readOnly
          />
        </div>
      </div>
      {/* Calculate Button */}
      <div className="col-md-12">
        <button
          type="button"
          className="btn btn-primary"
          onClick={calculateLoanDetails}
        >
          Calculate
        </button>
      </div>

     
    </div>
  );
};

export default LoanCalculator;
