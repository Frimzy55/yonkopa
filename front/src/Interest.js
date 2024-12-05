import React from 'react'

const Interest=({

}) =>{
  return (
    <div className='container'>
        <div className='row'>
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

        </div>
      
    </div>
  )
}

export default Interest
