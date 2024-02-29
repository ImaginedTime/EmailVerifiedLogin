import React from 'react'

export default function Profile({ changePage }) {
    const userData = JSON.parse(localStorage.getItem('userData'));

    return (
        <div>
            <div className='text-center'>
                <div className='text-xl mb-4'>
                    Welcome {userData.userName}
                </div>
                <div className='mb-4'>
                    Your Email: {userData.email}
                </div>
                <div className='mb-4'>
                    Your User ID: {userData.id}
                </div>
                <div className='mb-4'>
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
        </div>
    )
}
