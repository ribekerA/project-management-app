import { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import dict from '../../data/dict';
import './NotFoundPage.scss';

function NotFoundPage() {
  const { lang, isAuth } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && !localStorage.getItem('pmapp34-token')) {
      navigate('/welcome');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <div className="narrow-container">
      <h1 className="title">404</h1>
      <p className="not-found-text">{dict[lang].notFoundPage.notFoundMessage}</p>
      <NavLink to="/" className="main-nav-btn">
        To Main Page
      </NavLink>
    </div>
  );
}

export default NotFoundPage;
