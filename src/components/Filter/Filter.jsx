import { useDispatch } from 'react-redux';
import { ButtonReload, FilterForm } from './Filter.styled';
import { setFilter } from 'redux/filterSlice';
import { AiOutlineReload } from 'react-icons/ai';
import { fetchContacts } from 'redux/api';
import debounce from 'lodash.debounce';

export const Filter = () => {
  const dispatch = useDispatch();
  return (
    <FilterForm>
      <div>
        <label htmlFor="find">Find contacts by name:</label>
        <input
          type="text"
          name="find"
          onChange={debounce(
            e => dispatch(setFilter(e.target.value.toLowerCase())),
            300
          )}
        />
      </div>
      <ButtonReload type="button" onClick={() => dispatch(fetchContacts())}>
        <AiOutlineReload />
      </ButtonReload>
    </FilterForm>
  );
};
