import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const Home = () => {

    const [id, setId] = useState(null)
    const [student, setStudent] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [course, setCourse] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/').then((res) => {
            // console.log('length',res.data.payload.length)
            setStudent(res.data.payload);
        }).catch((error) => {
            console.log(error);
        })
    },[])

    const deletehandler = (id) => {
        axios.delete(`http://127.0.0.1:8000/student_delete/${id}`).then((res) => {
            getstudent();
        }).catch((error) => {
            console.log(error);
        })
    }

    const getstudent = () => {
        axios.get('http://127.0.0.1:8000/').then((res) => {
            console.log(res.data.payload)
            setStudent(res.data.payload);
        }).catch((error) => {
            console.log(error);
        })
    }

    const submitHandler = (e) => {
        console.log("Ye submit handler h")
        e.preventDefault();
        const data = {
            name,
            email,
            age,
            gender,
            course,
            phone,
            address,
            is_active:isActive
        }
        if(id){
            axios.put(`http://127.0.0.1:8000/student_update/${id}`, data).then((res) => {
                console.log('Data Updated', res.data);
                getstudent();
            }).catch((err) =>{
                console.log(err);
            })
        }
        else{
            axios.post('http://127.0.0.1:8000/student_post',data).then((res) => {
                console.log("Data Posted", res)
                getstudent();
            }).catch((error) => {
                console.log(error)
            })
        }

        setName('')
        setEmail('')
        setAge('')
        setGender('')
        setCourse('')
        setPhone('')
        setAddress('')
        setId(null)

    }

    const updatehandler = (item) => {
        setId(item.id);
        setName(item.name)
        setEmail(item.email)
        setAge(item.age)
        setGender(item.gender)
        setCourse(item.course)
        setPhone(item.phone)
        setAddress(item.address)
        setIsActive(item.is_active);
    }

  return (
    <>
        <div className="container my-4">
            <h1 className='alert alert-info text-center'>Students Records</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Course</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Adress</th>
                    <th scope="col">IsActive</th>
                    <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {student.length > 0 && (student.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.age}</td>
                            <td>{item.gender}</td>
                            <td>{item.course}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>{item.is_active ? 'Active' : 'Inactive'}</td>
                            <td>{item.created_at}</td>
                            <td className='d-flex gap-2'>
                                <p className='btn btn-danger' onClick={() => deletehandler(item.id)}>Delete</p>
                                <p className='btn btn-success ' onClick={() => updatehandler(item)} >Update</p>
                            </td>
                        </tr>
                    )))}
                </tbody>
            </table>
            {student.length === 0 &&  <h1 className='alert alert-danger text-center'>Database are Empty</h1>}
        </div>


        <div className="container">
            <h3 className='alert alert-info text-center'>Student Form</h3>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} id="age" aria-describedby="emailHelp" />
                </div>
                <div className='mb-3'>
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select className='form-select' aria-label="Default select example" value={gender} onChange={(e) => setGender(e.target.value)} name="gender">
                        <option value="">Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Others</option>
                    </select>
                </div>
                <div className='mb-3'>
                    <label htmlFor="course" className="form-label">Course</label>
                    <select className='form-select' aria-label="Default select example" value={course} onChange={(e) => setCourse(e.target.value)} name="course">
                        <option value="">Select Course</option>
                        <option value="BTECH">BTech</option>
                        <option value="BCA">BCA</option>
                        <option value="MCA">MCA</option>
                        <option value="MBA">MBA</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="number" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <input type="checkbox" name="is_active" id='status' checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </>
  )
}

export default Home