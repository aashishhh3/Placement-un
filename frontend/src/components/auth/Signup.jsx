import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import TextField from '@mui/material/TextField';
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import logo from '../../assets/davv.png';

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        enrollNumber:"",
        branch:"",
        class:"",
        tenth:"",
        twelth:"",
        cgpa:"",
        personalEmail:"",
        file: ""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        formData.append("enrollNumber", input.enrollNumber);
        formData.append("branch", input.branch);
        formData.append("class", input.class);
        formData.append("tenth", input.tenth);
        formData.append("twelth", input.twelth);
        formData.append("cgpa", input.cgpa);
        formData.append("personalEmail", input.personalEmail);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className='w-full overflow-y-auto bg-gradient-to-b from-green-500 to-green-200 text-lg h-screen flex items-start justify-between flex-col p-4 box-border'>
          
        <div className='flex flex-1 items-center justify-center max-w-7xl mx-auto '>
        <form onSubmit={submitHandler} className='flex flex-col gap-y-4 '>
            <img src={logo} alt='logo'  />
            <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    
                    <div className=' border rounded-md p-2 text-sm bg-gray-100 text-gray-700'>
                        <TextField id="standard-basic" label="Full Name" variant="standard"
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            fullWidth
                            
                        />

                    </div>
                    <div className='border rounded-md p-2 text-sm bg-gray-100 text-gray-700'>
                        <TextField id="standard-basic" label="Enroll Number" variant="standard"
                            type="text"
                            value={input.enrollNumber}
                            name="enrollNumber"
                            onChange={changeEventHandler}
                            fullWidth
                        />
                    </div>
                    <div className='border rounded-md p-2 text-sm bg-gray-100 text-gray-700'>
                        <TextField id="standard-basic" label="Phone Number" variant="standard"
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            fullWidth
                        />
                    </div>
                    <div className='border rounded-md p-2 text-sm bg-gray-100 text-gray-700'>
                        <TextField id="standard-basic" label="Personal Email" variant="standard"
                            type="personalEmail"
                            value={input.personalEmail}
                            name="personalEmail"
                            onChange={changeEventHandler}
                            fullWidth
                        />
                    </div>
                    <div className='border rounded-md p-2 text-sm bg-gray-100 text-gray-700'>
                        <TextField id="standard-basic" label="Branch" variant="standard"
                            type="text"
                            value={input.branch}
                            name="branch"
                            onChange={changeEventHandler}
                            fullWidth
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="class"
                                    value="3rdYear"
                                    checked={input.class === '3rdYear'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">3rd_Year</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="class"
                                    value="finalYear"
                                    checked={input.class === 'finalYear'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Final_Year</Label>
                            </div>
                        </RadioGroup>
                         
                        {/* <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div> */}
                    </div>
                    
                    <div className='border rounded-md p-2 text-sm bg-gray-100 text-gray-700'>
                        <TextField id="standard-basic" label="10th Percentage" variant="standard"
                            type="text"
                            value={input.tenth}
                            name="tenth"
                            onChange={changeEventHandler}
                            fullWidth
                        />
                    </div>
        
                    <div className='border rounded-md p-2 text-sm bg-gray-100 text-gray-700'>
                        <TextField id="standard-basic" label="12th Percentage" variant="standard"
                            type="text"
                            value={input.twelth}
                            name="twelth"
                            onChange={changeEventHandler}
                            fullWidth
                        />
                    </div>
                    <div className='border rounded-md p-2 text-sm bg-gray-100 text-gray-700'>
                        <TextField id="standard-basic" label="CGPA" variant="standard"
                            type="text"
                            value={input.cgpa}
                            name="cgpa"
                            onChange={changeEventHandler}
                            fullWidth
                        />
                    </div>
        
                    <div className='border rounded-md p-2 text-sm bg-gray-100 text-gray-700'>
                        <TextField id="standard-basic" label="Email" variant="standard"
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            fullWidth
                        />
                    </div>
                    <div className='border rounded-md p-2 text-sm bg-gray-100 text-gray-700'>
                        <TextField id="standard-basic" label="Password" variant="standard"
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            fullWidth
                        />
                    </div>
                    
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Signup</Button>
                    }
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                </form>
        </div>
    </div>
    )
}

export default Signup