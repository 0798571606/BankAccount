import './index.css';
import { useReducer } from 'react';

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  if (!state.isActive && action.type !== 'openAccount') return state;

  switch (action.type) {
    case 'openAccount':
      return { ...state, balance: 500, isActive: true };
    case 'deposit':
      return { ...state, balance: state.balance + action.payLoad };
    case 'withDraw':
      return { ...state, balance: state.balance - action.payLoad };
    case 'requestLoan':
      if (state.loan > 0) return state;
      return { ...state, balance: state.balance + action.payLoad, loan: action.payLoad };
    case 'payLoan':
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan,
      };
    case 'closeAccount':
      if (state.loan > 0 || state.balance !== 0) return state;
      return initialState;
    default:
      throw new Error('Unknown action');
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='App'>
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button onClick={() => dispatch({ type: 'openAccount' })} disabled={isActive}>
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: 'deposit', payLoad: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: 'withDraw', payLoad: 50 })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: 'requestLoan', payLoad: 5000 })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: 'payLoan' })} disabled={!isActive}>
          Pay loan
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: 'closeAccount' })} disabled={!isActive}>
          Close account
        </button>
      </p>
    </div>
  );
}
