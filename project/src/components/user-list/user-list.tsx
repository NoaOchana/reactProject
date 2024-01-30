import React, { FC, useEffect, useRef, useState, ReactNode } from 'react';
import './user-list.scss';
import apiService from '../../services/api.service';
import Loaded from '../loaded/loaded';
import { isTemplateExpression } from 'typescript';
import UserDetails from '../user-details/user-details';
import userModel from '../../models/userModel';
import MyModal from '../my-modal/my-modal';

interface UserListProps { }

const UserList: FC<UserListProps> = () => {
  const [listUsers, setListUsers] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [listUsersFilter, setListUsersFilter] = useState<any>([]);
  const [isModal, setIsModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<userModel>();
  const [errorMessage, setErrorMessage] = useState('')
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadUsers();
  }, [])
  const loadUsers = () => {
    setIsLoaded(true)
    apiService.getListApi().then((res: any) => {
      setListUsers(res.data)
      setListUsersFilter(res.data)
      setIsLoaded(false)
    }, error => {
      setErrorMessage('error on load users')
      setTimeout(() => {
        setErrorMessage('')
      }, 2000)
    })
  }

  const searchUser = () => {
    let searchValue = nameRef.current?.value;
    setListUsersFilter(listUsers.filter((item) => item.name.includes(searchValue)))
  }

  const toAddUser = (user: userModel) => {
    listUsers.push(user);
    setListUsers([...listUsers])
    setListUsersFilter([...listUsers])
  }

  const confirmOrCancel = (value: any) => {
    if (value) {
      setIsModal(false);
    }
    else {
      apiService.deleteApi(Number(currentUser?.id)).then((res) => {
        let userDelete = listUsers.findIndex((u) => u.id == currentUser?.id)
        listUsers.splice(userDelete, 1)
        setListUsers([...listUsers])
        setListUsersFilter([...listUsers])
        setIsModal(false);
      }, error => {
        setErrorMessage('error on delete user')
        // loadUsers();
        setTimeout(() => {
          setErrorMessage('')
        }, 2000)
        setIsModal(false);
      })


      // let userDelete = listUsers.findIndex((u) => u.id == currentUser?.id)
      // listUsers.splice(userDelete, 1)
      // listUsers.splice(Number(currentUser?.id), 1)
      // setListUsers([...listUsers]);
      // setListUsersFilter([...listUsers]);
      // setIsModal(false);
    }
  }

  return <div className="user-list">
    <div dir='rtl' className='row'>
      <div className='col-sm-6'>
        <label dir='ltr'>Search by name:</label>
        <br />
        <input className='search' ref={nameRef} onChange={searchUser}></input>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>UserName</th>
              <th>Email</th>
              <th>To delete</th>
            </tr>
          </thead>
          <tbody>
            {listUsersFilter.map((u: any, i: number) => {
              return <tr key={i}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td><button onClick={() => { setIsModal(true); setCurrentUser(u) }} className='btn btn-primary'>Delete</button></td>
              </tr>
            })}
          </tbody>
        </table>
        {isLoaded ? <Loaded title='...Loading'  ></Loaded> : ''}
        {errorMessage != "" ? <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div> : ""}

      </div>
      <div className='col-sm-6 mt-4'>
        <h3 className='mb-4'>add user</h3>
        <UserDetails addUserFunction={toAddUser}></UserDetails>
        {isModal ? <MyModal title={`Delete ${currentUser?.name}`} confirmFunction={confirmOrCancel}>
          <h6 dir='ltr'>Are you sure you want to delete the user {currentUser?.name}?</h6>
        </MyModal> : ''}
      </div>

    </div>
  </div>
};

export default UserList;
