import { useDispatch } from 'react-redux';
import { FilterForm } from './Filter.styled';
import { setFilter } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  return (
    <FilterForm>
      <label htmlFor="find">Find contacts by name:</label>
      <input
        type="text"
        name="find"
        onChange={e => dispatch(setFilter(e.target.value.toLowerCase()))}
      />
    </FilterForm>
  );
};
