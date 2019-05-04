import React, {Component} from 'react'
import regeneratorRuntime, { async } from "regenerator-runtime";
import {connect} from 'react-redux'
import {getAllUsers, deleteSingleUser, updateUserPermissions} from '../redux/thunks/admin'
import '../public/styles/manageusers.css'

class ManageUsers extends Component {
  async componentDidMount(){
    try{
      await this.props.getAllUsers()
    }catch(err){
      console.log(err)
    }
  }

  render(){
    return !this.props.admin ? <div>UNAUTHORIZED</div> : (
        <table className="ui celled table" id="table-container">
          <thead>
            <tr>
              <th>Email</th>
              <th>Admin</th>
              <th>Remove User</th>
            </tr>
          </thead>
          <tbody>
        {this.props.users.map(el => {
          const disableBtn = el.id === this.props.id ? 'disabled' : ''
          return (
            <tr key={el.id}>
              <td data-label="Email">{el.email}</td>
              <td data-label="Admin">
                <div className="ui checkbox">
                  <input type="checkbox"
                      disabled={disableBtn} 
                      onClick={() => this.props.updateUserPerm(el.id, !el.isAdmin)} 
                      defaultChecked={el.isAdmin}
                  />
                  <label></label>
                </div>
               </td>
              <td data-label="Remove">
                <button disabled={disableBtn} 
                        className="negative ui button" 
                        id="delete-Btn" 
                        onClick={() => this.props.deleteUser(el.id)}>
                  Delete
                </button>
              </td> 
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.admins,
    loggedIn: state.applicationLevel.loggedIn,
    admin: state.user.user.isAdmin,
    id: state.user.user.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    deleteUser: (id) => dispatch(deleteSingleUser(id)),
    updateUserPerm: (id, bool) => dispatch(updateUserPermissions(id, bool)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers)