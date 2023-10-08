import styled from '@emotion/styled';

export const FilterForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 21px;

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

export const ButtonReload = styled.button`
  width: 25px;
  height: 25px;
  padding: 0;

  svg {
    height: 100%;
    width: 100%;
  }
`;
