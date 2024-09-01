import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteElement } from '../../api/deleteElement';
import { updateElement } from '../../api/updateElement';
import { AppDispatch } from '../../store/store';
import { Element } from '../../types/types';

const Cart: React.FC<Element> = ({ id, title, body, userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formToggle, setFormToggle] = useState(true);
  const [elementTitle, setElementTitle] = useState(title);
  const [elementBody, setElementBody] = useState(body);

  const handleUpdate = () => {
    const updatedElement: Element = {
      id,
      title: elementTitle,
      body: elementBody,
      userId,
    };

    // Отправляем асинхронное действие на обновление элемента
    dispatch(updateElement(updatedElement));
    setFormToggle(false); // Закрываем форму после обновления
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setElementTitle(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setElementBody(e.target.value);
  };

  return (
    <li>
      <h3>{title}</h3>
      <p>{body}</p>
      <button type="button" className="delete" onClick={() => dispatch(deleteElement(id))}>
        Удалить
      </button>
      <button type="button" onClick={() => setFormToggle(!formToggle)}>
        Изменить
      </button>
      {formToggle && (
        <div>
          <input
            type="text"
            placeholder="title"
            value={elementTitle}
            onChange={handleTitleChange}
          />
          <input
            type="text"
            placeholder="body"
            value={elementBody}
            onChange={handleBodyChange}
          />
          <button type="button" onClick={handleUpdate}>
            Обновить
          </button>
        </div>
      )}
    </li>
  );
};

export default Cart;
