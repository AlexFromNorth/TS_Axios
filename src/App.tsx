import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import './App.css';
import { fetchElements } from './api/fetchElements';
import Cart from './components/cart/Cart';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const elements = useSelector((state: RootState) => state.elements.elements);
  const loading = useSelector((state: RootState) => state.elements.loading);
  const error = useSelector((state: RootState) => state.elements.error);

  // Запускаем fetchElements при монтировании компонента
  useEffect(() => {
    dispatch(fetchElements());
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    
    <ul>
      {elements.map((el) => (
        <Cart key={el.id} {...el}/>
      ))}
    </ul>
  );
};

export default App;
