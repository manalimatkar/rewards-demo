import React, { useState, useEffect } from "react";
import fetch from './api/dataService';
import "./App.css";
import _ from 'lodash';

const Accordion = ({ data, children }) => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <div className="accordion-wrapper">      
      <div
        className={`accordion-title ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
        >
        {data.name} - {data.month} {data.points}
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};


function calculateResults(incomingData) {
  // Calculate points per transaction

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Calculate points per transaction
  const pointsPerTransaction = incomingData.map(transaction=> {
    let points = 0;
    let over100 = transaction.amt - 100;
    
    if (over100 > 0) {
      // A customer receives 2 points for every dollar spent over $100 in each transaction      
      points += (over100 * 2);
    }    
    if (transaction.amt > 50) {
      // plus 1 point for every dollar spent over $50 in each transaction
      points += 50;      
    }

    const month = new Date(transaction.transactionDt).getMonth();
    return {...transaction, points, month};
  });

  console.log("POINTS PER TRANSACTION OBJECT");
  console.log(pointsPerTransaction);

  // Find more solution to group transaction by user for each month

  let byCustomer = {};
  let totalPointsByCustomer = {};
  
  pointsPerTransaction.forEach(pointsPerTransaction => {
    let {custid, name, month, points} = pointsPerTransaction;   
    if (!byCustomer[custid]) {
      byCustomer[custid] = [];      
    }    
    if (!totalPointsByCustomer[custid]) {
      totalPointsByCustomer[name] = 0;
    }
    totalPointsByCustomer[name] += points;
    if (byCustomer[custid][month]) {
      byCustomer[custid][month].points += points;
      byCustomer[custid][month].monthNumber = month;
      byCustomer[custid][month].numTransactions++;    
    }
    else {      
      byCustomer[custid][month] = {
        custid,
        name,
        monthNumber:month,
        month: months[month],
        numTransactions: 1,        
        points
      }
    }    
  });

// Summary By Customer to bind to accordian title
  let tot = [];
  for (var custKey in byCustomer) {    
    byCustomer[custKey].forEach(cRow=> {
      tot.push(cRow);
    });    
  }

  console.log("Summary By Customer");
  console.log(tot);

// Total Points by Customer

  let totByCustomer = [
    ...tot.reduce(
      (map, item) => {
        const { custid: key, points } = item;
        const prev = map.get(key);
        
        if(prev) {
          prev.points += points;
        } else {
          map.set(key, Object.assign({}, item))
        }        
        return map
      },
      new Map()
    ).values()
  ];    
  console.log("Total Points by Customer");
  console.log(totByCustomer);

  return {
    summaryByCustomer: tot,
    pointsPerTransaction,
    totalPointsByCustomer:totByCustomer
  };
}

function App() {
  const [transactionData, setTransactionData] = useState(null);

  function getIndividualTransactions(customer) {
    let byCustMonth = _.filter(transactionData.pointsPerTransaction, (tRow) => {    
      return customer.custid === tRow.custid && customer.monthNumber === tRow.month;
    });
    return byCustMonth;
  }

  useEffect(() => { 
    fetch().then((data)=> {             
      const results = calculateResults(data);      
      setTransactionData(results);
    });
  },[]);

  if (transactionData == null) {
    return <div>Loading...</div>;   
  }

  return transactionData == null ?
    <div>Loading...</div> 
      :    
    <div>          
      <div className="container">
        <div className="row">
          <div className="col-10">
            <h5>Points Rewards System Totals by Customer Months</h5>
            {transactionData.summaryByCustomer.map((customer, index) => <Accordion key={index} data={customer}>
            {getIndividualTransactions(customer).map((tran, i)=>{
                        return <div className="container" key={i}>
                          <div className="row">
                            <div className="col-8">
                              <strong>Transaction Date:</strong> {tran.transactionDt} - <strong>$</strong>{tran.amt} - <strong>Points: </strong>{tran.points}
                            </div>
                          </div>
                        </div>
                      })}   
              
              </Accordion>)}
          </div>
        </div>
      </div>
      <hr/>
      <div className="container">    
          <div className="row">
            <div className="col-10">
              <h5>Points Rewards System Totals By Customer</h5>
              {transactionData.totalPointsByCustomer.map((cust, index) => 
               <div class="card" key={index}>
               <div class="card-body">
                 <h3 class="card-title">{cust.name}</h3>
                 <p class="card-text">{cust.points}</p>
               </div>
             </div>)}
            </div>
          </div>
        </div>      
    </div>
  ;
}

export default App;
