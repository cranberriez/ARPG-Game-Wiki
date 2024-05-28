import React from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';
import classData from '@/data/classes.json';

const Classes = () => {
    const { className } = useParams();

    return (
        <main className='main-column-cont'>
            <div className='nav-column'>
                <h2>Classes</h2>
                <ul>
                    {Object.entries(classData).map(([key, cls]) => (
                        <li key={key}>
                            <Link to={`/classes/${key.toLowerCase()}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</Link> - {className ? cls.short_description : cls.description}
                        </li>
                    ))}

                    
                </ul>
            </div>
            <div className='main-column'>
                { className && <li>
                    <Link to="/classes">Back to Classes</Link>
                </li>}
                <Outlet />
            </div>
        </main>
    );
};

export default Classes;
