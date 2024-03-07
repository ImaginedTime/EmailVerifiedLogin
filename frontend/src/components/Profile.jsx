import React, { useEffect } from 'react';
import axios from 'axios';

export default function Profile({ changePage }) {
    const userData = JSON.parse(localStorage.getItem('userData'));

    const [users, setUsers] = React.useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://emailverifiedlogin.onrender.com/api/users/getAllUsers');
            const data = await response.data;
            setUsers(data);
            console.log(data);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    if(!userData) {
        changePage('login');
        return null;
    }

    return (
        <div>
            <div className='text-center bg-green-400 rounded-md p-4'>
                <div className='text-xl mb-2'>
                    Welcome {userData.userName}
                </div>
                <div className='mb-2'>
                    Your Email: {userData.email}
                </div>
                <div className='mb-2'>
                    Your User ID: {userData.id}
                </div>
                <div className='mb-2'>
                    Your Verification Status: {userData.isVerified ? 'Verified' : 'Not Verified'}
                </div>
                <div className='flex items-center justify-center mt-4'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all'
                        type='button'
                        onClick={() => {
                            localStorage.removeItem('userData');
                            changePage('login');
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div>
                <div className='text-center mt-6 mb-2 bg-red-500 rounded-full border-black border-2'>List Of Users: </div>

                <div>
                    <table className='bg-red-400 w-full'>
                        <thead className='bg-red-600'>
                            <tr>
                                <th className='border-2 border-black text-center'>User Name</th>
                                <th className='border-2 border-black text-center'>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users && users.length > 0 ?
                                    users.map((user, index) => (
                                        <tr key={index} className=''>
                                            {/* <td>{user.id}</td> */}
                                            <td className='border-2 border-black text-center'>{user.userName}</td>
                                            <td className='border-2 border-black text-center'>{user.email}</td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan='2' className='border-2 border-black text-center'>No Users Found</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
