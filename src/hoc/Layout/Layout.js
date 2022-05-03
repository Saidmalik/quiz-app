// import { useState } from 'react';
// import { connect } from 'react-redux';
// import { Drawer } from '../../components/Navigation/MenuToggle/Drawer/Drawer';
// import { MenuToggle } from '../../components/Navigation/MenuToggle/MenuToggle';
// import classes from './Layout.module.css';

const Layout = (props) => {
  // const [menu, setMenu] = useState(false);

  // const toggleHanlder = () => {
  //   setMenu(!menu);
  // };
  // const menuCloseHandler = () => {
  //   setMenu(false);
  // };
  return (
    <main>{props.children}</main>
    // <div className={classes.Layout}>
    //   <Drawer
    //     isOpen={menu}
    //     onClose={menuCloseHandler}
    //     isAuthenticated={props.isAuthenticated}
    //   />
    //   <MenuToggle onToggle={toggleHanlder} isOpen={menu} />
    //   <main>{props.children}</main>
    // </div>
  );
};

//to link with redux state
// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: !!state.auth.token,
//   };
// };
// export default connect(mapStateToProps)(Layout);
export default Layout;

// =================================================== previous code
// const Layout = (props) => {
//   const [menu, setMenu] = useState(false);

//   const toggleHanlder = () => {
//     setMenu(!menu);
//   };
//   const menuCloseHandler = () => {
//     setMenu(false);
//   };
//   return (
//     <div className={classes.Layout}>
//       <Drawer
//         isOpen={menu}
//         onClose={menuCloseHandler}
//         isAuthenticated={props.isAuthenticated}
//       />
//       <MenuToggle onToggle={toggleHanlder} isOpen={menu} />
//       <main>{props.children}</main>
//     </div>
//   );
// };

// //to link with redux state
// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: !!state.auth.token,
//   };
// };
// export default connect(mapStateToProps)(Layout);
