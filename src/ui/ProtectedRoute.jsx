import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const StyledPage = styled.div`
  height: 100vh;
  background-color: var() (--color-grey-50);
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1 - Load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  // 2 - is there is no authenticated user, redirect to the login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/login');
    },
    [navigate, isAuthenticated, isLoading]
  );

  // 3 - show a spinner
  if (isLoading)
    return (
      <StyledPage>
        <Spinner />
      </StyledPage>
    );

  // 4 - if there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
