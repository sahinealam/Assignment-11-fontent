import React, { use } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../provider/AuthProvider';

const MyProfile = () => {
    const { user, setUser, updateUser } = use(AuthContext)
    const { photoURL, displayName, email } = user || {}

    const hendleUpdate = (e) => {
        e.preventDefault();

        const photo = e.target.photo.value;
        const name = e.target.name.value;
        // console.log(photo, name);
        if (!user) return toast.error("Plase Login your account")
        updateUser({
            displayName: name,
            photoURL: photo
        })
            .then(() => {
                toast.success("Update the profile successfully")
                const update = { ...user, displayName: name, photoURL: photo };
                setUser(update)
                console.log(update)
                e.target.reset()
            })
            .catch(error => {
                console.log(error)
            })
    }
    // console.log(user)

    return (
        <form onSubmit={hendleUpdate}>
            <div className='flex flex-col justify-center items-center shadow-2xl gap-5 mt-10'>
                <div className='text-center p-5 text-gray-600 dark:text-gray-200 rounded-lg'>
                    <img className='w-[100px] h-[100px] rounded-full mx-auto ' src={photoURL} alt="" />
                    <h2 className='text-2xl font-bold mt-5 '>{displayName}</h2>
                    <h2 className='text-xl font-semibold'>{email}</h2>

                </div>
                <div className='flex justify-center items-center'>
                    <div className='text-center p-5 rounded-lg'>
                        <div className='flex flex-col space-y-5'>
                            <input name='name' type="text" placeholder="Your Name" className="input input-success text-center" required />
                            <input name='photo' type="text" placeholder="Photo Url" className="input input-success text-center" required />
                        </div>


                        <button type='submit' className='btn mt-5 w-full rounded-xl bg-green-400 text-white'>Update Profile</button>


                    </div>
                </div>
            </div>
        </form>
    );
};

export default MyProfile;