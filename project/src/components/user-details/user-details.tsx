import React, { FC } from 'react';
import { useFormik } from 'formik';
import './user-details.scss';
import * as MyYup from 'yup'
import userModel from '../../models/userModel'

interface UserDetailsProps {
  addUserFunction: (user: userModel) => void
}

const UserDetails: FC<UserDetailsProps> = (props: UserDetailsProps) => {
  const myForm = useFormik({
    initialValues: new userModel(null, "", "", ""),

    onSubmit: () => {
      props.addUserFunction(
        {
          id: myForm.values.id,
          name: myForm.values.name,
          username: myForm.values.username,
          email: myForm.values.email
        }
      )  
      
    },

    validationSchema: MyYup.object().shape({
      id: MyYup.number().required(),
      name: MyYup.string().min(2, 'The name is too short').required(),
      username: MyYup.string().min(2, 'The username is too short').required(),
      email: MyYup.string().email().required()
    })
  })

  return <div className="user-details">
    <form onSubmit={myForm.handleSubmit}>
      <div>
        <label>ID</label>
        <input name='id' onChange={myForm.handleChange} className={myForm.errors.id ? 'form-control is-invalid' : 'form-control'}></input>
        {myForm.errors.id ? <small className='text-danger'>{myForm.errors.id}</small> : ''}
      </div>
      <div>
        <label>Name</label>
        <input name='name' onChange={myForm.handleChange} className={myForm.errors.name ? 'form-control is-invalid' : 'form-control'}></input>
        {myForm.errors.name ? <small className='text-danger'>{myForm.errors.name}</small> : ''}
      </div>
      <div>
        <label>UserName</label>
        <input name='username' onChange={myForm.handleChange} className={myForm.errors.username ? 'form-control is-invalid' : 'form-control'}></input>
        {myForm.errors.username ? <small className='text-danger'>{myForm.errors.username}</small> : ''}
      </div>
      <div>
        <label>Email</label>
        <input name='email' onChange={myForm.handleChange} className={myForm.errors.email ? 'form-control is-invalid' : 'form-control'}></input>
        {myForm.errors.email ? <small className='text-danger'>{myForm.errors.email}</small> : ''}
      </div>
      <button type='submit' className='btn btn-primary mt-3'>add user</button>
    </form>
  </div>
};

export default UserDetails;
