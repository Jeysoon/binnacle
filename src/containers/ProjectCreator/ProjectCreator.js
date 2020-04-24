import React , { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';
import classes from './ProjectCreator';
const ProjectCreator = props  => {

    const context = useContext(AuthContext);

    return (<div>
        <header>UserName</header>
            <div>        
            <p className={classes.content} >Project Creator</p>
        {context.isAuth ? <p className={classes.content}>isAuth true </p>: <p className={classes.content}> isAuth false</p>}
            
        </div>
    </div>
    
    );
};

export default ProjectCreator;