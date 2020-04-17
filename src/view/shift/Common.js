import React from "react";
import 'moment/locale/ja';

export function WorkTime({from, to, fixed}) {

  const style = fixed ? {
    whiteSpace: 'nowrap',
    border: '2px solid #2196f3',
    backgroundColor: '#2196f3',
    color: 'white',
    padding: '0 2px',
    borderRadius: 4,
    fontSize: 'small',
    textAlign: 'center',
    fontWeight: 'bold',
  } : {
    whiteSpace: 'nowrap',
    border: '2px solid #2196f3',
    color: '#2196f3',
    padding: '0 2px',
    borderRadius: 4,
    fontSize: 'small',
    textAlign: 'center',
    fontWeight: 'bold',
  };

  return (
    <div style={style}>{from.substring(0, 5) + '~' + to.substring(0, 5)}</div>
  );
}


export function BreakTime({from, to, fixed}) {

  const style = fixed ? {
    whiteSpace: 'nowrap',
    border: '2px solid orange',
    backgroundColor: 'orange',
    color: 'white',
    padding: '0 2px',
    borderRadius: 4,
    fontSize: 'small',
    textAlign: 'center',
    fontWeight: 'bold',
  } : {
    whiteSpace: 'nowrap',
    border: '2px solid orange',
    color: 'orange',
    padding: '0 2px',
    borderRadius: 4,
    fontSize: 'small',
    textAlign: 'center',
    fontWeight: 'bold',
  };

  return (
    <div style={style}>{from.substring(0, 5) + '~' + to.substring(0, 5)}</div>
  );
}

export function Break({fixed}) {

  const style = fixed ? {
    whiteSpace: 'nowrap',
    border: '2px solid crimson',
    backgroundColor: 'crimson',
    color: 'white',
    padding: '0 2px',
    borderRadius: 4,
    fontSize: 'small',
    textAlign: 'center',
    fontWeight: 'bold',
  } : {
    whiteSpace: 'nowrap',
    border: '2px solid crimson',
    color: 'crimson',
    padding: '0 2px',
    borderRadius: 4,
    fontSize: 'small',
    textAlign: 'center',
    fontWeight: 'bold',
  };

  return (
    <div style={style}>休み</div>
  );
}
