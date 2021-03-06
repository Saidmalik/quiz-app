import React from 'react';
import { NavLink } from 'react-router-dom';
import { Backdrop } from '../../UI/Backdrop/Backdrop';

import classes from './Drawer.module.css';

export const Drawer = ({ isOpen, onClose, isAuthenticated }) => {
  const cls = [classes.Drawer];
  if (!isOpen) {
    cls.push(classes.close);
  }
  const renderLinks = (links) => {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            activeClassName={classes.active}
            onClick={onClose}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  };

  const links = [
    { to: '/', label: 'Tests' },
    { to: '/quiz-creator', label: 'Create test' },
    { to: '/logout', label: 'Logout' },
    { to: '/auth', label: 'Auth' },
  ];

  // if (isAuthenticated) {
  //   links.push({ to: '/quiz-creator', label: 'Создать тест' });
  //   links.push({ to: '/logout', label: 'Выйти' });
  // } else {
  //   links.push({ to: '/auth', label: 'Авторизация' });
  // }
  // console.log('auth', props.isAuthenticated);

  return (
    <>
      <nav className={cls.join(' ')}>
        <ul>{renderLinks(links)}</ul>
      </nav>
      {isOpen ? <Backdrop onClick={onClose} /> : null}
      {/* <nav className={cls.join(' ')}>
        <ul>{renderLinks(links)}</ul>
      </nav> */}
    </>
  );
};

// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { Backdrop } from '../../UI/Backdrop/Backdrop';
// import classes from './Drawer.module.css';

// export const Drawer = (props) => {
//   // const links = [];
//   const cls = [classes.Drawer];
//   if (!props.isOpen) {
//     cls.push(classes.close);
//   }
//   const renderLinks = (links) => {
//     return links.map((link, index) => {
//       return (
//         <li key={index}>
//           <NavLink
//             to={link.to}
//             exact={link.exact}
//             activeClassName={classes.active}
//             onClick={props.onClose}
//           >
//             {link.label}
//           </NavLink>
//         </li>
//       );
//     });
//   };

//   const links = [{ to: '/', label: 'Тесты', exact: true }];
//   if (props.isAuthenticated) {
//     links.push({ to: '/quiz-creator', label: 'Создать тест', exact: false });
//     links.push({ to: '/logout', label: 'Выйти', exact: false });
//   } else {
//     links.push({ to: '/auth', label: 'Авторизация', exact: false });
//   }
//   // console.log('auth', props.isAuthenticated);

//   return (
//     <>
//       {props.isOpen ? <Backdrop onClick={props.onClose} /> : null}
//       <nav className={cls.join(' ')}>
//         <ul>{renderLinks(links)}</ul>
//       </nav>
//     </>
//   );
// };
