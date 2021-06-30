import React from "react";
import './App.css';

const Accordion = ({ title, children }) => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <div className="accordion-wrapper">
      
      <div
        className={`accordion-title ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
        >
        {title}
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};

function App() {
  const data = [{
    name: 'Tanner',
    age: 26,
    friend: {
      name: 'Jason',
      age: 23,
    }
  }, { name: 'Linsley',
  age: 26,
  friend: {
    name: 'Maurer',
    age: 23,
  } }, { name: 'Tanner Linsley',
  age: 26,
  friend: {
    name: 'Jason Maurer',
    age: 23,
  }}]

  return (
    <div className="App">
     <div className="jumbotron">
       <h1>Rewards Point Demo</h1>
     </div>
     <div className="row">
       <div className="col-4">
        <div className="wrapper">
          {data.map((user) => <Accordion title={user.name}>{user.age}</Accordion>)}
        </div>
       </div>
     </div>
    </div>
  );
}

export default App;
