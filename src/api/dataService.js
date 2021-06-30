

export default function() {
  // simulates data coming from a database.
  return Promise.resolve(
    [
      {
        custid: 1,
        name: "James",
        amt: 120,
        transactionDt: "05-01-2019"
      },
      {
        custid: 1,
        name: "James",
        amt: 50,
        transactionDt: "05-21-2019"
      },
      {
        custid: 1,
        name: "James",
        amt: 50,
        transactionDt: "05-21-2019"
      },
      {
        custid: 1,
        name: "James",
        amt: 10,
        transactionDt: "06-01-2019"
      },
      {
        custid: 1,
        name: "James",
        amt: 75,
        transactionDt: "06-21-2019"
      },
      {
        custid: 1,
        name: "James",
        amt: 200,
        transactionDt: "07-01-2019"
      },
      {
        custid: 1,
        name: "James",
        amt: 1,
        transactionDt: "07-04-2019"
      },
      {
        custid: 1,
        name: "James",
        amt: 80,
        transactionDt: "07-03-2019"
      },
      {
        custid: 1,
        name: "James",
        amt: 224,
        transactionDt: "07-21-2019"
      },
      {
        custid: 2,
        name: "Alice",
        amt: 125,
        transactionDt: "05-01-2019"
      },
      {
        custid: 2,
        name: "Alice",
        amt: 75,
        transactionDt: "05-21-2019"
      },
      {
        custid: 2,
        name: "Alice",
        amt: 10,
        transactionDt: "06-01-2019"
      },
      {
        custid: 2,
        name: "Alice",
        amt: 75,
        transactionDt: "06-21-2019"
      },
      {
        custid: 2,
        name: "Alice",
        amt: 200,
        transactionDt: "07-01-2019"
      },
      {
        custid: 2,
        name: "Alice",
        amt: 224,
        transactionDt: "07-21-2019"
      },
      {
        custid: 3,
        name: "Manali",
        amt: 120,
        transactionDt: "06-21-2019"
      }
  ]
  );
};